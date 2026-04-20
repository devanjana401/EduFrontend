import React from "react";
import ContactForm from "../components/ContactForm";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* header */}
      <div className="bg-blue-900 py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Contact Us
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto text-lg">
          We're here to help. Reach out to us for any questions, support, or partnership inquiries.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* left-ontact info */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 h-full">
              
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Contact Information
              </h3>

              <p className="text-slate-600 mb-8">
                Fill out the form and our team will get back to you within 24 hours.
              </p>

              <div className="space-y-6">

                {/* phone */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Phone</h4>
                    <p className="text-slate-600">+91 7034165867</p>
                  </div>
                </div>

                {/* email */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Email</h4>
                    <p className="text-slate-600">educonnect@gmail.com</p>
                  </div>
                </div>

                {/* location */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Office</h4>
                    <p className="text-slate-600">
                      Cyber Park <br /> Kozhikode, Kerala, India
                    </p>
                  </div>
                </div>
              </div>

              {/* map */}
              <div className="mt-10 rounded-xl overflow-hidden border h-64">
                <iframe
                  title="map"
                  src="https://www.google.com/maps?q=11.2587,75.7788&z=15&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                ></iframe>
              </div>

            </div>
          </div>

          {/* right- contact form */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-lg rounded-2xl p-8 md:p-12 border border-slate-100">
              <ContactForm />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;