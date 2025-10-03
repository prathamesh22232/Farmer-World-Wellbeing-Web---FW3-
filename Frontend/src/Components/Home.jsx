// Home.jsx

<style>{`
    /* Custom CSS to apply the blurred logo background */
    .bg-logo-blur {
        position: relative; 
        background-color: #f0fdf4; 
    }

    .bg-logo-blur::before {
        content: '';
        position: fixed; 
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        
        /* The image path must match Step 1 */
        background-image: url('/background-logo.png'); 
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 150%; 
        opacity: 0.3; /* <-- This controls the low brightness/dimming */

        /* Apply the Blur Filter */
        filter: blur(8px) grayscale(50%); /* <-- This controls the blur */
        z-index: 10; 
    }
    // ... rest of the CSS/keyframes ...
`}</style>

import React from "react";
import "../App.css"; 
import logo from "../assets/Images/logo.png"
import About from "./About";
import SoilTesting from "./SoilTesting";
// ASSUMPTION: 'Inter' font is imported in your main CSS or index.html
// Example: <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">


// --- Data ---
const SERVICE_CARDS_DATA = [
  {
    title: "Soil Testing",
    link: "/soil-testing",
    imgUrl:
      "https://thumbs.dreamstime.com/b/farmer-s-hands-testing-soil-quality-test-tube-agriculture-soil-analysis-farming-grow-farmer-s-hands-testing-soil-quality-331251482.jpg",
  },
  {
    title: "Government Assistance",
    link: "/gov-assistance",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbu38TYyyMyjZz_r4mL_WUSf1BfgvwjEuWFQ&s",
  },
  {
    title: "Market Committee",
    link: "/market-commitee",
    imgUrl:
      "https://img.freepik.com/premium-photo/fresh-fruits-vegetables-sale-market-stall-generated-by-ai_762026-121215.jpg",
  },
  {
    title: "Deal Committee",
    link: "/deal-commitee",
    imgUrl:
      "https://geopard.tech/wp-content/uploads/2022/05/48-min.jpg"
  },
  {
    title: "Tech Support",
    link: "/tech-support",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPYQXKC0zMu-yjp4j9rqiafhEzfPsYHtq_oQ&s"
  },
];

// ---------------- Header Component ----------------
function Header() {
  return (
    <header className="bg-green-100 shadow-md sticky top-0 z-50">
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
                className="transition duration-300 hover:text-yellow-600 hover:scale-105"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

// ---------------- ServiceCard Component ----------------
function ServiceCard({ title, link, imgUrl }) {
  // Added a subtle entrance animation class: animate-fadeInUp
  return (
    <div
      className="group flex cursor-pointer flex-col items-center 
                 rounded-2xl bg-gradient-to-br from-green-900 via-indigo-900 to-green-700 
                 p-8 shadow-xl text-white **font-inter**
                 transition-all duration-500 
                 hover:-translate-y-3 hover:shadow-2xl 
                 **opacity-0 animate-fadeInUp**"
      style={{ animationDelay: '200ms' }} // You'd adjust this for different cards
    >
      {/* Title */}
      <h3
        className="mb-4 text-2xl font-bold tracking-wide transition 
                   group-hover:text-yellow-300 duration-300"
      >
        {title}
      </h3>

      {/* Image or Placeholder */}
      {imgUrl ? (
        <img
          src={imgUrl}
          alt={title}
          className="mb-4 h-40 w-64 transform rounded-lg object-cover 
                     transition-transform duration-500 group-hover:scale-110 group-hover:shadow-lg"
        />
      ) : (
        <div className="mb-4 flex h-40 w-64 items-center justify-center rounded-lg bg-gray-200">
          <span className="text-gray-500">[Image Here]</span>
        </div>
      )}

      {/* Button with animated pulse on hover */}
      <a
        href={link}
        className="mt-3 rounded-full bg-green-600 px-6 py-3 text-base font-semibold text-white 
                   transition-all duration-300 shadow-md 
                   hover:scale-105 hover:bg-green-700 active:scale-95 
                   **group-hover:animate-pulse**"
      >
        CLICK HERE !
      </a>
    </div>
  );
}

// ---------------- Footer Component ----------------
function Footer() {
  return (
    <footer className="mt-16 bg-green-800 p-6 text-center text-white shadow-inner **font-inter**">
      <p className="text-sm font-medium">
        &copy; {new Date().getFullYear()} Farmer World Wellbeing Web (FW3). All
        rights reserved.
      </p>
    </footer>
  );
}

// ---------------- Main Home Component ----------------
function Home() {
  return (
    <div className="flex min-h-screen flex-col **font-inter**">
      <Header />

      {/* --- Hero Section --- */}
      <section className="bg-green-100 py-16 text-center **animate-fade-in**">
        <h2 className="mb-5 text-4xl font-extrabold text-green-800 tracking-tight">
          Empowering Farmers, Enriching Lives 👨‍🌾
        </h2>
        <p className="mx-auto max-w-3xl text-xl text-gray-700">
          Welcome to FW3, your digital companion for comprehensive farming solutions — providing insights from
          soil analysis to government assistance and efficient market access.
        </p>
      </section>

      {/* --- Services Cards Section --- */}
      <main className="container mx-auto flex-1 px-5 py-12">
        <h2 className="mb-10 text-center text-3xl font-bold text-green-900 **animate-slideInDown**">
          Our Core Services
        </h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CARDS_DATA.map((card, index) => (
            <ServiceCard key={index} {...card} />
          ))}
        </div>
      </main>
        
      <Footer />
    </div>
  );
}

export default Home;