import React from "react";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      {/* Heading Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-700">
          About Our E-Learning Platform
        </h2>

        <p className="text-gray-500 max-w-2xl mx-auto mt-3 leading-relaxed">
          Our platform provides high-quality online courses designed to help
          students and professionals enhance their skills anytime, anywhere.
          We focus on practical learning, expert instructors, and a modern
          learning experience to support career growth.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="flex flex-col md:flex-row gap-6 justify-center">

        {/* Mission */}
        <div className="bg-white shadow-md rounded-xl p-6 md:w-1/2">
          <h3 className="font-semibold text-lg mb-2">Our Mission</h3>

          <p className="text-gray-600 leading-relaxed">
            Our mission is to make education accessible to everyone by
            offering affordable, flexible, and high-quality online courses.
            We aim to empower learners with practical knowledge and
            real-world skills that help them succeed in their careers.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white shadow-md rounded-xl p-6 md:w-1/2">
          <h3 className="font-semibold text-lg mb-2">Our Vision</h3>

          <p className="text-gray-600 leading-relaxed">
            We envision a world where learning has no limits. By combining
            technology and education, we strive to create a global learning
            community where students can continuously upgrade their
            knowledge and achieve their goals.
          </p>
        </div>

      </div>

      {/* Why Choose Us */}
      <div className="mt-16 flex justify-center">
        <div className="border-2 border-dashed border-teal-300 rounded-[50px_60px_55px_65px] bg-teal-50 shadow-md max-w-3xl w-full p-8 text-center">

          <h4 className="font-semibold text-xl text-slate-700 mb-4">
            Why Choose Our Platform
          </h4>

          <p className="text-gray-600 leading-relaxed">
            Our platform offers industry-relevant courses, experienced
            instructors, and a flexible learning environment. With interactive
            lessons, practical projects, and a user-friendly interface, we
            make online learning engaging, effective, and accessible for
            everyone.
          </p>

        </div>
      </div>

    </div>
  );
};

export default About;