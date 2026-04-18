import React, { useEffect, useRef, useState } from "react";
import "../css/Home.css";

import carousel from "../assets/images/carousel.avif";
import about from "../assets/images/about.avif";
import website from "../assets/images/website.webp";
import uiux from "../assets/images/ui-ux.webp";
import mobile from "../assets/images/mobile.webp";
import datascience from "../assets/images/datascience.avif";
import student1 from "../assets/images/student1.avif";

const Home = () => {
  const metricsRef = useRef(null);
  const started = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);

  const reviews = [
    { img: student1, text: "This platform helped me learn React and get my first developer job!", name: "Student 1" },
    { img: student1, text: "Courses are very clear and practical. Highly recommended!", name: "Student 2" },
    { img: student1, text: "Best place to upgrade your programming skills online.", name: "Student 3" },
    { img: student1, text: "The instructors explain concepts very clearly.", name: "Student 4" },
    { img: student1, text: "I improved my coding skills with real projects.", name: "Student 5" },
  ];

  // update visible slides based on window width
  const updateVisibleSlides = () => {
    if (window.innerWidth <= 600) setVisibleSlides(1);
    else if (window.innerWidth <= 900) setVisibleSlides(2);
    else setVisibleSlides(3);
  };

  useEffect(() => {
    updateVisibleSlides();
    window.addEventListener("resize", updateVisibleSlides);
    return () => window.removeEventListener("resize", updateVisibleSlides);
  }, []);

  const totalSlides = Math.ceil(reviews.length / visibleSlides);

  useEffect(() => {
    const counters = metricsRef.current.querySelectorAll(".count");

    const startCounting = () => {
      counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const step = target / 50;

        const interval = setInterval(() => {
          count += step;
          if (count >= target) {
            count = target;
            clearInterval(interval);
          }
          counter.textContent =
            (target === 4.8 ? count.toFixed(1) : Math.floor(count)) + "+";
        }, 30);
      });
    };

    const handleScroll = () => {
      const sectionTop = metricsRef.current.getBoundingClientRect().top;
      if (sectionTop < window.innerHeight - 100 && !started.current) {
        startCounting();
        started.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home">

      {/* hero */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${carousel})` }}></div>
        <div className="hero-text">
          <h1>Learn Anytime, Anywhere</h1>
          <p>Upgrade your skills with expert-led online courses.</p>
          <button>Explore Courses</button>
        </div>
      </section>

      {/* about */}
      <section className="about">
        <img src={about} alt="about" />
        <div className="about-text">
          <h2>Why Choose Our Platform...?</h2>
          <p>
            Our online learning platform helps students and professionals
            upgrade their knowledge with high-quality courses,
            real-world projects, and expert instructors.
          </p>
          <ul>
            <li>Learn from industry experts</li>
            <li>Flexible online learning</li>
            <li>Hands-on practical projects</li>
            <li>Certificates after completion</li>
            <li>Lifetime course access</li>
          </ul>
        </div>
      </section>

      {/* courses */}
      <section className="courses">
        <h2>Popular Courses</h2>
        <div className="course-container">
          <div className="course-card">
            <img src={website} alt="website" />
            <h3>Web Development</h3>
            <p>Build modern websites and web applications.</p>
          </div>
          <div className="course-card">
            <img src={uiux} alt="uiux" />
            <h3>UI / UX Design</h3>
            <p>Learn how to design beautiful interfaces.</p>
          </div>
          <div className="course-card">
            <img src={mobile} alt="mobile" />
            <h3>Mobile App Development</h3>
            <p>Build apps for Android and iOS.</p>
          </div>
          <div className="course-card">
            <img src={datascience} alt="datascience" />
            <h3>Data Science</h3>
            <p>Analyze large datasets and build intelligent models.</p>
          </div>
        </div>
      </section>

      {/* metrics */}
      <section className="metrics" ref={metricsRef}>
        <h2>Our Learning Impact</h2>
        <div className="metric-container">
          <div className="metric-box">
            <h3 className="count" data-target="6">0</h3>
            <p>Courses</p>
          </div>
          <div className="metric-box">
            <h3 className="count" data-target="400">0</h3>
            <p>Students</p>
          </div>
          <div className="metric-box">
            <h3 className="count" data-target="15">0</h3>
            <p>Instructors</p>
          </div>
          <div className="metric-box">
            <h3 className="count" data-target="4">0</h3>
            <p>Rating</p>
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section className="testimonials">
        <h2>Student Success Stories</h2>
        <div className="testimonial-slider">
          <div
            className="testimonial-track"
            style={{ transform: `translateX(-${currentIndex * (100)}%)` }}
          >
            {reviews.map((review, index) => (
              <div className="testimonial" key={index}>
                <img src={review.img} alt="student" />
                <p>"{review.text}"</p>
                <h4>{review.name}</h4>
              </div>
            ))}
          </div>
        </div>

        <div className="dots">
          {[...Array(totalSlides)].map((_, dot) => (
            <span
              key={dot}
              className={`dot ${currentIndex === dot ? "active" : ""}`}
              onClick={() => setCurrentIndex(dot)}
            ></span>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;