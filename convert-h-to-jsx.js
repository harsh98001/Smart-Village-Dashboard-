const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const srcRoot = path.join(projectRoot, 'frontend', 'src');
const viteConfigPath = path.join(projectRoot, 'frontend', 'vite.config.js');

function skipComment(src, i) {
  if (src[i + 1] === '/') {
    i += 2;
    while (i < src.length && src[i] !== '\n') i++;
    return i;
  }
  if (src[i + 1] === '*') {
    i += 2;
    while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) i++;
    return i + 2;
  }
  return i;
}

function skipBalanced(src, i, open, close) {
  let depth = 0;
  while (i < src.length) {
    const ch = src[i];
    if (ch === '"' || ch === "'" || ch === '`') {
      i = skipString(src, i);
      continue;
    }
    if (ch === '/' && (src[i + 1] === '/' || src[i + 1] === '*')) {
      i = skipComment(src, i);
      continue;
    }
    if (ch === open) depth++;
    else if (ch === close) {
      depth--;
      if (depth === 0) return i + 1;
    }
    i++;
  }
  return i;
}

function skipString(src, i) {
  const quote = src[i++];
  while (i < src.length) {
    const ch = src[i];
    if (ch === '\\') {
      i += 2;
      continue;
    }
    if (quote === '`' && ch === '$' && src[i + 1] === '{') {
      i = skipBalanced(src, i + 1, '{', '}');
      continue;
    }
    if (ch === quote) return i + 1;
    i++;
  }
  return i;
}

function splitTopLevel(src, delimiter = ',') {
  const parts = [];
  const stack = [];
  let start = 0;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (ch === '"' || ch === "'" || ch === '`') {
      i = skipString(src, i) - 1;
      continue;
    }
    if (ch === '/' && (src[i + 1] === '/' || src[i + 1] === '*')) {
      i = skipComment(src, i) - 1;
      continue;
    }
    if ('([{'.includes(ch)) stack.push(ch);
    else if (')]}'.includes(ch)) stack.pop();
    else if (ch === delimiter && stack.length === 0) {
      parts.push(src.slice(start, i).trim());
      start = i + 1;
    }
  }
  const tail = src.slice(start).trim();
  if (tail) parts.push(tail);
  return parts;
}

function isStringLiteral(src) {
  const s = src.trim();
  return (s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"));
}

function unquote(src) {
  const s = src.trim();
  return s.slice(1, -1).replace(/\\'/g, "'").replace(/\\"/g, '"');
}

function normalizeAttrName(key) {
  const trimmed = key.trim();
  if (isStringLiteral(trimmed)) return unquote(trimmed);
  return trimmed;
}

function findTopLevelColon(src) {
  const stack = [];
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (ch === '"' || ch === "'" || ch === '`') {
      i = skipString(src, i) - 1;
      continue;
    }
    if (ch === '/' && (src[i + 1] === '/' || src[i + 1] === '*')) {
      i = skipComment(src, i) - 1;
      continue;
    }
    if ('([{'.includes(ch)) stack.push(ch);
    else if (')]}'.includes(ch)) stack.pop();
    else if (ch === ':' && stack.length === 0) return i;
  }
  return -1;
}

function isObjectLiteral(src) {
  const s = src.trim();
  return s.startsWith('{') && s.endsWith('}');
}

function isArrayLiteral(src) {
  const s = src.trim();
  return s.startsWith('[') && s.endsWith(']');
}

function looksLikeJsx(src) {
  return src.trim().startsWith('<');
}

function indentBlock(src, level) {
  const pad = '  '.repeat(level);
  return src
    .split('\n')
    .map((line) => (line ? pad + line : line))
    .join('\n');
}

function transformCode(src) {
  let out = '';
  for (let i = 0; i < src.length;) {
    const ch = src[i];
    if (ch === '"' || ch === "'" || ch === '`') {
      const end = skipString(src, i);
      out += src.slice(i, end);
      i = end;
      continue;
    }
    if (ch === '/' && (src[i + 1] === '/' || src[i + 1] === '*')) {
      const end = skipComment(src, i);
      out += src.slice(i, end);
      i = end;
      continue;
    }
    if (src[i] === 'h' && src[i + 1] === '(' && !/[\w$.]/.test(src[i - 1] || '')) {
      const converted = convertHCall(src, i, 0);
      out += converted.jsx;
      i = converted.end;
      continue;
    }
    out += ch;
    i++;
  }
  return out;
}

function buildAttributes(propsExpr) {
  if (!propsExpr) return '';
  const trimmed = propsExpr.trim();
  if (!trimmed || trimmed === 'null' || trimmed === 'undefined') return '';
  if (!isObjectLiteral(trimmed)) return ` {...${transformCode(trimmed)}}`;

  const inner = trimmed.slice(1, -1).trim();
  if (!inner) return '';

  const props = splitTopLevel(inner);
  const attrs = [];

  for (const prop of props) {
    if (!prop) continue;
    if (prop.startsWith('...')) {
      attrs.push(`{...${transformCode(prop.slice(3).trim())}}`);
      continue;
    }

    const colon = findTopLevelColon(prop);
    if (colon === -1) {
      const name = normalizeAttrName(prop);
      attrs.push(`${name}={${transformCode(prop.trim())}}`);
      continue;
    }

    const name = normalizeAttrName(prop.slice(0, colon));
    const value = prop.slice(colon + 1).trim();

    if (!/^[:A-Za-z_][-:A-Za-z0-9_:.]*$/.test(name)) {
      attrs.push(`{...{ ${transformCode(prop)} }}`);
      continue;
    }

    if (value === 'true') attrs.push(name);
    else attrs.push(`${name}={${transformCode(value)}}`);
  }

  return attrs.length ? ' ' + attrs.join(' ') : '';
}

function buildChild(expr, level) {
  const trimmed = expr.trim();
  if (!trimmed) return '';
  if (isStringLiteral(trimmed)) return indentBlock(unquote(trimmed), level);

  const transformed = transformCode(trimmed);
  if (looksLikeJsx(transformed)) return indentBlock(transformed, level);
  return indentBlock(`{${transformed}}`, level);
}

function buildJsx(tagExpr, propsExpr, childExprs, level = 0) {
  const tagName = isStringLiteral(tagExpr.trim()) ? unquote(tagExpr.trim()) : tagExpr.trim();
  const attrs = buildAttributes(propsExpr);
  const children = [];

  for (const expr of childExprs) {
    const trimmed = expr.trim();
    if (!trimmed) continue;
    if (isArrayLiteral(trimmed)) {
      const inner = trimmed.slice(1, -1).trim();
      if (!inner) continue;
      for (const item of splitTopLevel(inner)) children.push(item);
    } else {
      children.push(trimmed);
    }
  }

  const pad = '  '.repeat(level);
  if (!children.length) return `${pad}<${tagName}${attrs} />`;

  if (children.length === 1 && isStringLiteral(children[0])) {
    return `${pad}<${tagName}${attrs}>${unquote(children[0])}</${tagName}>`;
  }

  const renderedChildren = children
    .map((child) => buildChild(child, level + 1))
    .filter(Boolean)
    .join('\n');

  return `${pad}<${tagName}${attrs}>\n${renderedChildren}\n${pad}</${tagName}>`;
}

function convertHCall(src, start, level) {
  const end = skipBalanced(src, start + 1, '(', ')');
  const args = splitTopLevel(src.slice(start + 2, end - 1));
  const [tagExpr, propsExpr, ...rest] = args;
  return {
    jsx: buildJsx(tagExpr, propsExpr, rest, level),
    end
  };
}

function convertFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  if (!original.includes('h(') && !original.includes('utils/h')) return false;

  let next = transformCode(original);
  next = next.replace(/^\s*import\s*\{\s*h\s*\}\s*from\s*["'][^"']*utils\/h["'];?\s*\n/gm, '');
  next = next.replace(/\n{3,}/g, '\n\n');

  if (next !== original) {
    fs.writeFileSync(filePath, next, 'utf8');
    return true;
  }
  return false;
}

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.isFile() && full.endsWith('.js')) files.push(full);
  }
  return files;
}

function updateViteConfig() {
  let viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
  if (!viteConfig.includes('loader: "jsx"')) {
    viteConfig = viteConfig.replace(
      /module\.exports = defineConfig\(\{/, 
      `module.exports = defineConfig({\n  esbuild: {\n    loader: "jsx",\n    include: /src\\/.*\\.js$/,\n    exclude: [],\n    jsx: "automatic"\n  },\n  optimizeDeps: {\n    esbuildOptions: {\n      loader: {\n        ".js": "jsx"\n      }\n    }\n  },`
    );
    fs.writeFileSync(viteConfigPath, viteConfig, 'utf8');
  }
}

updateViteConfig();
const files = walk(srcRoot);
let changed = 0;
for (const file of files) {
  if (convertFile(file)) changed++;
}
console.log(`Converted ${changed} frontend files to JSX-style syntax.`);
