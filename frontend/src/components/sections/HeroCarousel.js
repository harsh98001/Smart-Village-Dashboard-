import React, { useEffect, useState } from "react";
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
    imageNote: "Water and soil intelligence visual"
  },
  {
    eyebrow: "Inclusive Development",
    title: "Bring education, health, energy, and infrastructure into one narrative",
    text: "Present a government-grade digital platform that feels credible, responsive, and ready for real decision-making.",
    action: { label: "View Reports", to: "/reports" },
    imageSrc: "/images/article2.png",
    imageNote: "Inclusive rural development visual"
  }
];

const HeroCarousel = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlideIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, []);

  return <section className="hero-carousel-section">
  <div key="container" className="container">
    <div key="carousel" className="hero-carousel">
      {slides.map((slide, index) =>
                <div key={slide.title} className={`hero-slide${index === activeSlideIndex ? " active" : ""}`} aria-hidden={index !== activeSlideIndex}>
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
    <div key="dots" className="hero-carousel-dots" aria-label="Hero slides">
      {slides.map((slide, index) =>
              <button key={slide.title} type="button" className={`hero-carousel-dot${index === activeSlideIndex ? " active" : ""}`} aria-label={`Show slide ${index + 1}: ${slide.eyebrow}`} onClick={() => setActiveSlideIndex(index)} />
            )}
    </div>
  </div>
</section>;
};

export default HeroCarousel;
