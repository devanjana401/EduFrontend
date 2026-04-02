import React from "react";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  return (
    <div className="w-full">

      {/* Page Title */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-light underline underline-offset-8">
          Contact Us
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 pb-16">

        {/* Google Map */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="map"
            src="https://www.google.com/maps?q=11.2587,75.7788&z=15&output=embed"
            className="w-full h-[400px] lg:h-full"
            loading="lazy"
          ></iframe>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-xl p-6 md:p-8">
          <ContactForm />
        </div>

      </div>
    </div>
  );
};

export default Contact;