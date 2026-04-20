import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaGraduationCap, FaChalkboardTeacher, FaUsers, FaStar, FaChevronRight, FaChevronLeft } from "react-icons/fa";

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
    { img: student1, text: "This platform helped me learn React and get my first developer job!", name: "Sarah J." },
    { img: student1, text: "Courses are very clear and practical. Highly recommended!", name: "Michael T." },
    { img: student1, text: "Best place to upgrade your programming skills online.", name: "David L." },
    { img: student1, text: "The instructors explain concepts very clearly.", name: "Emily R." },
    { img: student1, text: "I improved my coding skills with real projects.", name: "James K." },
  ];

  const updateVisibleSlides = () => {
    if (window.innerWidth <= 640) setVisibleSlides(1);
    else if (window.innerWidth <= 1024) setVisibleSlides(2);
    else setVisibleSlides(3);
  };

  useEffect(() => {
    updateVisibleSlides();
    window.addEventListener("resize", updateVisibleSlides);
    return () => window.removeEventListener("resize", updateVisibleSlides);
  }, []);

  const totalSlides = Math.ceil(reviews.length / visibleSlides);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  useEffect(() => {
    const counters = metricsRef.current?.querySelectorAll(".count");
    if(!counters) return;

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
      if(!metricsRef.current) return;
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
    <div className="bg-slate-50 min-h-screen">

      {/* hero section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={carousel} alt="Hero Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <span className="inline-block py-1 px-3 rounded-full bg-primary-500/20 text-primary-200 border border-primary-500/30 text-sm font-semibold mb-6 backdrop-blur-sm">
            ✨ Limitless Learning Awaits
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Elevate Your Skills <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Anywhere</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of learners achieving their goals with expert-led online courses, real-world projects, and recognized certifications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:shadow-primary-500/30 transition-all duration-300 hover:-translate-y-1">
              Explore Courses
            </Link>
            <Link to="/signup" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 hover:-translate-y-1">
              Join for Free
            </Link>
          </div>
        </div>
      </section>

      {/* metrics section */}
      <section className="relative -mt-16 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={metricsRef}>
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            <div className="text-center px-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-50 text-primary-600 mb-4">
                <FaGraduationCap size={24} />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-1 count" data-target="60">0</h3>
              <p className="text-slate-500 font-medium">Active Courses</p>
            </div>
            <div className="text-center px-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-50 text-green-600 mb-4">
                <FaUsers size={24} />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-1 count" data-target="4000">0</h3>
              <p className="text-slate-500 font-medium">Happy Students</p>
            </div>
            <div className="text-center px-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-50 text-purple-600 mb-4">
                <FaChalkboardTeacher size={24} />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-1 count" data-target="150">0</h3>
              <p className="text-slate-500 font-medium">Expert Instructors</p>
            </div>
            <div className="text-center px-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-50 text-yellow-600 mb-4">
                <FaStar size={24} />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-1 count" data-target="4.8">0</h3>
              <p className="text-slate-500 font-medium">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* about section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-400 to-indigo-400 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
            <img src={about} alt="Learning Environment" className="relative rounded-3xl shadow-2xl object-cover h-[500px] w-full" />
            
            {/* floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce">
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <FaStar size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Trusted by</p>
                <p className="text-xl font-bold text-slate-900">Top Companies</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 space-y-8">
            <div>
              <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm">About EduConnect</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-6 tracking-tight">Why Choose Our Platform?</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                We empower individuals and organizations to advance their horizons through high-quality, flexible, and affordable online education led by world-class industry experts.
              </p>
            </div>

            <ul className="space-y-5">
              {[
                "Learn from industry-leading experts",
                "Flexible learning schedule that fits your life",
                "Hands-on practical projects and assignments",
                "Earn verifiable certificates upon completion",
                "Get lifetime access to course materials"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 bg-primary-100 text-primary-600 rounded-full p-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
            
            <Link to="/about" className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors">
              Learn more about us <FaChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* popular courses */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm">Top Categories</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4 tracking-tight">Explore Popular Courses</h2>
            <p className="text-lg text-slate-600">Discover the right course to boost your career and develop new skills.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { img: website, title: "Web Development", desc: "Build modern websites and robust web applications from scratch.", tag: "Tech" },
              { img: uiux, title: "UI / UX Design", desc: "Learn how to design beautiful, user-centric interfaces and experiences.", tag: "Design" },
              { img: mobile, title: "App Development", desc: "Build cross-platform applications for Android and iOS devices.", tag: "Tech" },
              { img: datascience, title: "Data Science", desc: "Analyze large datasets and build intelligent machine learning models.", tag: "Data" }
            ].map((course, idx) => (
              <div key={idx} className="group bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                    {course.tag}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">{course.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{course.desc}</p>
                  <Link to="/courses" className="text-primary-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Courses <FaChevronRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/courses" className="inline-block px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1">
              Browse All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary-600/20 blur-3xl mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl mix-blend-screen"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-primary-400 font-semibold tracking-wider uppercase text-sm">Success Stories</span>
              <h2 className="text-4xl font-bold mt-2 tracking-tight mb-4">What Our Students Say</h2>
              <p className="text-slate-400 text-lg">Don't just take our word for it. Hear from those who have transformed their careers with us.</p>
            </div>
            
            <div className="flex gap-4">
              <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-colors focus:outline-none">
                <FaChevronLeft />
              </button>
              <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-colors focus:outline-none">
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div className="overflow-hidden pb-10">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)` }}
            >
              {reviews.map((review, index) => (
                <div 
                  className="px-4" 
                  style={{ minWidth: `${100 / visibleSlides}%` }} 
                  key={index}
                >
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 h-full relative">
                    <FaStar className="text-yellow-400 mb-6 text-2xl absolute top-8 right-8 alpha-20" />
                    <p className="text-slate-300 text-lg leading-relaxed italic mb-8 relative z-10">"{review.text}"</p>
                    <div className="flex items-center gap-4 mt-auto relative z-10">
                      <img src={review.img} alt={review.name} className="w-14 h-14 rounded-full border-2 border-primary-500 object-cover" />
                      <div>
                        <h4 className="font-bold text-white">{review.name}</h4>
                        <p className="text-slate-400 text-sm">Alumni</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(totalSlides)].map((_, dot) => (
              <button
                key={dot}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === dot ? "bg-primary-500 w-8" : "bg-white/20 hover:bg-white/40"}`}
                onClick={() => setCurrentIndex(dot)}
                aria-label={`Go to slide ${dot + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;