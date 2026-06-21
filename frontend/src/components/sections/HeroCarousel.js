import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
const slides = [
  {
    eyebrow: "Agriculture Growth",
    title: "Accelerating rural prosperity through data-led farming systems",
    text: "Track crops, irrigation, renewable energy, and village service performance from a single premium command center.",
    action: { label: "Open Dashboard", to: "/dashboard" },
    imageSrc: "/images/article.png",
    imageNote: ""
  },
  {
    eyebrow: "Water & Soil Intelligence",
    title: "Watch natural resources with a modern governance lens",
    text: "Use the landing experience to compare villages, identify strengths, and understand where focused interventions matter most.",
    action: { label: "Explore Villages", to: "/search" },
    imageSrc: "/images/water.png",
    imageNote: "Add /images/landing/water-soil.jpg"
  },
  {
    eyebrow: "Inclusive Development",
    title: "Bring education, health, energy, and infrastructure into one narrative",
    text: "Present a government-grade digital platform that feels credible, responsive, and ready for real decision-making.",
    action: { label: "View Reports", to: "/reports" },
    imageSrc: "/images/article2.png",
    imageNote: "Add /images/landing/inclusive-development.jpg"
  }
];

const HeroCarousel = () => {
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let node = null;
    let disposed = false;

    const initCarousel = async () => {
      if (!window.jQuery?.fn?.owlCarousel) {
        await import("owl.carousel");
      }

      if (disposed || !carouselRef.current || !window.jQuery?.fn?.owlCarousel) {
        return;
      }

      node = window.$(carouselRef.current);

      if (!node.data("owl.carousel")) {
        node.owlCarousel({
          items: 1,
          loop: true,
          nav: false,
          dots: true,
          autoplay: true,
          autoplayTimeout: 4200,
          smartSpeed: 950
        });
      }
    };

    initCarousel();

    return () => {
      disposed = true;

      if (node && node.data("owl.carousel")) {
        node.trigger("destroy.owl.carousel");
      }
    };
  }, []);

  return <section className="hero-carousel-section">
  <div key="container" className="container">
    <div key="carousel" className="owl-carousel hero-carousel" ref={carouselRef}>
      {slides.map((slide) =>
                <div key={slide.title} className="hero-slide">
        <div key="content" className="hero-slide-copy">
          <span key="eyebrow" className="section-eyebrow">
            {slide.eyebrow}
          </span>
          <h1 key="title" className="hero-title">
            {slide.title}
          </h1>
          <p key="text" className="hero-text">
            {slide.text}
          </p>
          <button key="button" type="button" className="btn btn-smart-primary hero-button" onClick={() => navigate(slide.action.to)}>
            {slide.action.label}
          </button>
        </div>
        <div key="visual" className="hero-slide-visual">
          <div key="glowOne" className="hero-orb orb-one" />
          <div key="glowTwo" className="hero-orb orb-two" />
          <div key="placeholder" className="hero-image-placeholder hero-image-slot public-image-frame">
            <img key="image" src={slide.imageSrc} alt={slide.title} className="hero-image-slot-image public-image" onError={(event) => {
                                event.currentTarget.parentElement?.classList.add("is-missing");
                              }} />
            <span key="note" className="media-fallback">
              {slide.imageNote}
            </span>
          </div>
        </div>
      </div>
              )}
    </div>
  </div>
</section>;
};

export default HeroCarousel;
