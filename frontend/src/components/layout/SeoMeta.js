import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import usePageMeta from "../../hooks/usePageMeta";

const siteName = "Smart Village Dashboard";
const defaultOrigin = "https://smart-village-dashboard.onrender.com";
const previewImage = "/images/article.png";

const upsertMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const upsertLink = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const SeoMeta = () => {
  const location = useLocation();
  const pageMeta = usePageMeta();

  useEffect(() => {
    const title = `${pageMeta.title} | ${siteName}`;
    const description = pageMeta.seoDescription || pageMeta.description;
    const origin = window.location.origin || defaultOrigin;
    const canonicalUrl = `${origin}${location.pathname}`;
    const imageUrl = `${origin}${previewImage}`;

    document.title = title;
    upsertMeta('meta[name="description"]', {
      name: "description",
      content: description
    });
    upsertMeta('meta[name="keywords"]', {
      name: "keywords",
      content: pageMeta.keywords.join(", ")
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: title
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website"
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: imageUrl
    });
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image"
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: title
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description
    });
    upsertLink('link[rel="canonical"]', {
      rel: "canonical",
      href: canonicalUrl
    });
  }, [location.pathname, pageMeta]);

  return null;
};

export default SeoMeta;
