import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    const namePattern = /^[a-zA-Z\s'-]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;

    if (!formData.name.trim() || !namePattern.test(formData.name))
      newErrors.name = "Enter a valid name";

    if (!formData.email.trim() || !emailPattern.test(formData.email))
      newErrors.email = "Enter a valid email";

    if (!phonePattern.test(formData.phone))
      newErrors.phone = "Phone must be 10 digits";

    if (!formData.message.trim())
      newErrors.message = "Message is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    emailjs
      .send(
        "service_uye8cf2",
        "template_79h7trl",
        formData,
        "rfuFFYZhu0_J3KVCq"
      )
      .then(() => {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      })
      .catch((error) => {
        alert("Failed to send message");
        console.log(error);
      });
  };

  return (
    <div>

      <h2 className="text-2xl font-bold text-blue-700 mb-2">
        Get In Touch
      </h2>

      <p className="text-gray-600 mb-6">
        Contact us via{" "}
        <a
          href="https://wa.me/917034165867"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 font-semibold"
        >
          WhatsApp
        </a>{" "}
        or{" "}
        <a
          href="mailto:elearninginfo@gmail.com"
          className="text-blue-600 font-semibold"
        >
          educonnectinfo@gmail.com
        </a>
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* name */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* email */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* phone */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full border border-gray-300 rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* message */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Message
          </label>

          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            className="w-full border border-gray-300 rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />

          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-3 rounded-lg
                     hover:bg-blue-600 transition"
        >
          Send Message
        </button>

      </form>
    </div>
  );
};

export default ContactForm;