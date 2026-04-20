import React from "react";
import { FaGlobe, FaCertificate, FaLaptopCode, FaHandsHelping } from "react-icons/fa";
import aboutImg from "../assets/images/about.avif";

const About = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* header */}
      <div className="bg-blue-900 py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          About EduConnect
        </h1>
        <p className="text-blue-100 max-w-2xl mx-auto text-lg leading-relaxed">
          Empowering the next generation of professionals with world-class education accessible from anywhere, at any time.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {/* mission & vision */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-24">
          
          {/* image */}
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-blue-200 rounded-3xl transform -rotate-3 scale-105 opacity-50 z-0"></div>
            <img
              src={aboutImg}
              alt="Students learning"
              className="relative z-10 rounded-3xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>

          {/* content */}
          <div className="lg:w-1/2 space-y-10">

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-semibold text-sm mb-4">
                <FaGlobe /> Our Mission
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                Making Education Accessible
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Our mission is to make education accessible to everyone by offering affordable, flexible, and high-quality online courses. We aim to empower learners with practical knowledge and real-world skills that help them succeed in their careers and reach their full potential.
              </p>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 font-semibold text-sm mb-4">
                <FaCertificate /> Our Vision
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                A World Without Limits
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                We envision a world where learning has no limits. By combining advanced technology and world-class education, we strive to create a vibrant global learning community where students can continuously upgrade their knowledge and achieve their goals seamlessly.
              </p>
            </div>

          </div>
        </div>

        {/* why choose us */}
        <div className="mt-24 text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-slate-600 text-lg">
            We provide a premium learning environment designed for your success.
          </p>
        </div>

        {/* features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <FaLaptopCode />,
              title: "Industry-Relevant",
              desc: "Courses designed by professionals to teach you exactly what employers are looking for."
            },
            {
              icon: <FaHandsHelping />,
              title: "Interactive Learning",
              desc: "Engage with practical projects and hands-on assignments that build real skills."
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Flexible Schedule",
              desc: "Learn at your own pace. Access course materials 24/7 from any device."
            },
            {
              icon: <FaCertificate />,
              title: "Verified Output",
              desc: "Earn certificates upon completion to showcase your newly acquired skills."
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-6">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default About;