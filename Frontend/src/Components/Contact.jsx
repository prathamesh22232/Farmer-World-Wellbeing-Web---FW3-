import React from "react";
import logo from '../assets/Images/logo.png'

// Base64 logo placeholder

// Header component
const Header = () => {
  return (
    <header className="bg-green-100/95 shadow-md sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between py-4 px-8">
        {/* Logo + Brand Name */}
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="FW3 Logo"
            className="
              h-[70px] w-[70px] rounded-full
              border-2 border-green-500 hover:border-yellow-400
              transition-transform duration-300 ease-in-out
              hover:scale-110 hover:rotate-6
              cursor-pointer shadow-md hover:shadow-xl
              ring-2 ring-green-200 hover:ring-yellow-300
            "
          />
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-inter">
            <span className="text-green-900">Farmer World Wellbeing Web - </span>{" "}
            <span className="text-yellow-600">FW3</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav aria-label="Main navigation">
          <ul className="flex gap-10 text-lg font-semibold text-green-900">
            <li>
              <a
                href="/"
                className="transition duration-300 hover:text-yellow-600 hover:scale-105"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="transition duration-300 hover:text-yellow-600 hover:scale-105"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="transition duration-300 text-yellow-600 font-bold border-b-2 border-yellow-600"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

// Footer component
const Footer = () => {
  return (
    <footer className="mt-16 bg-green-800 p-6 text-center text-white shadow-inner font-inter relative z-30">
      <p className="text-sm font-medium">
        &copy; {new Date().getFullYear()} Farmer World Wellbeing Web (FW3). All
        rights reserved.
      </p>
    </footer>
  );
};

// Contact data
const CONTACTS = [
  {
    name: "Ministry of Agriculture & Farmers Welfare",
    website: "https://agricoop.nic.in/",
  },
  {
    name: "National Bank for Agriculture and Rural Development (NABARD)",
    website: "https://www.nabard.org/",
  },
  {
    name: "State Agriculture Department",
    website: "https://www.mahaagri.gov.in/", // example Maharashtra
  },
  {
    name: "Krishi Vigyan Kendra (KVK)",
    website: "https://www.kvk.icar.gov.in/",
  },
  {
    name: "PM-Kisan Scheme Portal",
    website: "https://www.pmkisan.gov.in/",
  },
];

// Contact page
const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen font-inter bg-green-100">
      <Header />

      {/* Hero Section */}
      <section className="bg-green-100/90 py-16 text-center shadow-md">
        <h2 className="text-5xl font-extrabold text-green-900 mb-6">
          Important Government Contacts for Farmers
        </h2>
        <p className="mx-auto max-w-3xl text-lg text-gray-700 px-4">
          These official websites provide information, assistance, and schemes to help farmers manage their farms, access financial support, and get expert guidance.
        </p>
      </section>

      {/* Contact Cards */}
      <main className="container mx-auto flex-1 px-5 py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {CONTACTS.map((contact, index) => (
            <div
              key={index}
              className="bg-green-700/90 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-105"
            >
              <h3 className="text-xl font-bold mb-2">{contact.name}</h3>
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-300 hover:text-yellow-500 underline break-words"
              >
                {contact.website}
              </a>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
