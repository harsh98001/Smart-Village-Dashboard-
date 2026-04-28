import { useEffect } from "react";

const PARALLAX_SELECTOR = [
  ".smart-navbar",
  ".notification-ribbon-inner",
  ".section-title",
  ".hero-slide",
  ".stat-card",
  ".image-banner-card",
  ".page-banner-inner",
  ".chart-card",
  ".section-table-card",
  ".weather-card-live",
  ".banner-card",
  ".village-card",
  ".upcoming-projects-shell",
  ".upcoming-project-card",
  ".footer-card",
  ".profile-card",
  ".settings-card",
  ".report-summary-card",
  ".contact-info-card",
  ".grievance-form-card",
  ".admin-profile-card",
  ".admin-surface-card",
  ".admin-preview-module-card",
  ".search-detail-hero",
  ".search-panel-card",
  ".search-status-strip",
  ".search-summary-strip"
].join(", ");

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const clearNodeVars = (node) => {
  node.style.removeProperty("--parallax-x");
  node.style.removeProperty("--parallax-y");
};

const readDepth = (node) => {
  const inlineDepth = Number.parseFloat(node.dataset.parallaxDepth || "");
  if (Number.isFinite(inlineDepth)) {
    return inlineDepth;
  }

  const cssDepth = Number.parseFloat(
    window.getComputedStyle(node).getPropertyValue("--parallax-depth")
  );

  return Number.isFinite(cssDepth) ? cssDepth : 0.5;
};

const useGlobalParallax = () => {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return undefined;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotionQuery.matches) {
      return undefined;
    }

    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    const root = document.documentElement;
    let frameId = null;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let targets = [];

    const refreshTargets = () => {
      targets = Array.from(document.querySelectorAll(PARALLAX_SELECTOR));
    };

    const renderParallax = () => {
      frameId = null;

      const viewportHeight = window.innerHeight || 1;
      const viewportWidth = window.innerWidth || 1;
      const scrollY = window.scrollY || 0;
      const ambientX = clamp((pointerX - 0.5) * 54, -30, 30);
      const ambientY = clamp(scrollY * -0.055 + (pointerY - 0.5) * 22, -160, 160);

      root.style.setProperty("--parallax-ambient-x", `${ambientX.toFixed(2)}px`);
      root.style.setProperty("--parallax-ambient-y", `${ambientY.toFixed(2)}px`);
      root.style.setProperty("--parallax-mouse-x", `${((pointerX - 0.5) * 16).toFixed(2)}px`);
      root.style.setProperty("--parallax-mouse-y", `${((pointerY - 0.5) * 12).toFixed(2)}px`);

      targets.forEach((node) => {
        if (!node.isConnected) {
          return;
        }

        const rect = node.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > viewportHeight + 100) {
          clearNodeVars(node);
          return;
        }

        const depth = readDepth(node);
        const centerY = rect.top + rect.height / 2;
        const centerX = rect.left + rect.width / 2;
        const offsetY = clamp((viewportHeight / 2 - centerY) / viewportHeight, -1, 1);
        const offsetX = clamp((viewportWidth / 2 - centerX) / viewportWidth, -1, 1);
        const mouseShiftX = coarsePointerQuery.matches ? 0 : (pointerX - 0.5) * 18 * depth;
        const mouseShiftY = coarsePointerQuery.matches ? 0 : (pointerY - 0.5) * 12 * depth;
        const shiftX = clamp(offsetX * 20 * depth + mouseShiftX, -26, 26);
        const shiftY = clamp(offsetY * 28 * depth + mouseShiftY, -30, 30);

        node.style.setProperty("--parallax-x", `${shiftX.toFixed(2)}px`);
        node.style.setProperty("--parallax-y", `${shiftY.toFixed(2)}px`);
      });
    };

    const queueFrame = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(renderParallax);
      }
    };

    const onPointerMove = (event) => {
      pointerX = clamp(event.clientX / (window.innerWidth || 1), 0, 1);
      pointerY = clamp(event.clientY / (window.innerHeight || 1), 0, 1);
      queueFrame();
    };

    const onReducedMotionChange = () => {
      if (reducedMotionQuery.matches) {
        targets.forEach(clearNodeVars);
        root.style.removeProperty("--parallax-ambient-x");
        root.style.removeProperty("--parallax-ambient-y");
        root.style.removeProperty("--parallax-mouse-x");
        root.style.removeProperty("--parallax-mouse-y");
      } else {
        refreshTargets();
        queueFrame();
      }
    };

    const mutationObserver = new MutationObserver(() => {
      refreshTargets();
      queueFrame();
    });

    refreshTargets();
    queueFrame();

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    window.addEventListener("scroll", queueFrame, { passive: true });
    window.addEventListener("resize", queueFrame);
    if (!coarsePointerQuery.matches) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }
    reducedMotionQuery.addEventListener("change", onReducedMotionChange);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      mutationObserver.disconnect();
      window.removeEventListener("scroll", queueFrame);
      window.removeEventListener("resize", queueFrame);
      window.removeEventListener("pointermove", onPointerMove);
      reducedMotionQuery.removeEventListener("change", onReducedMotionChange);

      targets.forEach(clearNodeVars);
      root.style.removeProperty("--parallax-ambient-x");
      root.style.removeProperty("--parallax-ambient-y");
      root.style.removeProperty("--parallax-mouse-x");
      root.style.removeProperty("--parallax-mouse-y");
    };
  }, []);
};

export default useGlobalParallax;
