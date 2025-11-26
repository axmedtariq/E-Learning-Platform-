import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./bud.scss";

export default function Bud() {
  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,       // show fewer for bigger cards
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    centerMode: true,       // center current slide
    centerPadding: "0px",   // remove side padding
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  const topCourses = ["React for Beginners", "JavaScript Essentials", "CSS Masterclass"];
  const allCourses = [
    "React Advanced",
    "Node.js Basics",
    "Python for Data Science",
    "CSS Animations",
    "Vue.js Essentials",
    "Angular Mastery",
    "TypeScript Fundamentals",
    "Fullstack Project",
  ];

  return (
    <div className="Navbar">
      {/* Navbar */}
      <nav className="navbar-container">
        <div className="nav-logo">E-Learn</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/instructors">Instructors</Link></li>
          <li><Link to="/login" className="login-btn">Login</Link></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="hero">
        <h1>Learn Skills, Boost Your Career</h1>
        <p>Join thousands of students learning from top instructors online.</p>
        <button>Get Started</button>
      </section>

      {/* Top Rated Courses */}
      <section className="courses-section">
        <h2>Top Rated Courses</h2>
        <div className="courses-grid">
          {topCourses.map((course, i) => (
            <div className="course-card professional-card" key={i}>
              <div className="thumbnail"></div>
              <h3>{course}</h3>
              <div className="rating-row">
                {[...Array(5)].map((_, idx) => (
                  <StarIcon key={idx} className="star-icon" />
                ))}
                <span className="numeric-rating">4.{i + 5}</span>
              </div>
              <p className="course-price">$19.99</p>
            </div>
          ))}
        </div>
      </section>

      {/* All Courses */}
      <section className="courses-section">
        <h2>All Courses</h2>
        <div className="courses-grid">
          {allCourses.map((course, i) => (
            <div className="course-card professional-card" key={i}>
              <div className="thumbnail"></div>
              <h3>{course}</h3>
              <div className="rating-row">
                {[...Array(5)].map((_, idx) => (
                  <StarIcon key={idx} className="star-icon" />
                ))}
                <span className="numeric-rating">4.{i}</span>
              </div>
              <p className="course-price">$19.99</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section className="testimonial-section">
        <h2>What Students Say</h2>
        <Slider {...testimonialSettings}>
          {[
            { text: "This course helped me land my first developer job!", name: "Sarah K." },
            { text: "Highly recommend these courses, very practical.", name: "Ahmed T." },
            { text: "Instructors are amazing and very clear.", name: "Maria L." },
            { text: "Very well structured and easy to understand.", name: "John M." },
          ].map((testimonial, i) => (
            <div className="testimonial-card-modern" key={i}>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <p className="student-name">— {testimonial.name}</p>
            </div>
          ))}
        </Slider>
      </section>

      {/* Footer */}
      <footer className="footer-modern">
        <div className="footer-container">
          <div className="footer-brand">
            <h2>E-Learn</h2>
            <p>Your trusted platform to learn modern skills.</p>
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
              <a href="#">Instagram</a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Company</h3>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/careers">Careers</Link>
          </div>

          <div className="footer-links">
            <h3>Support</h3>
            <Link to="/faq">FAQ</Link>
            <Link to="/help">Help Center</Link>
            <Link to="/community">Community</Link>
          </div>

          <div className="footer-links">
            <h3>Legal</h3>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/refund">Refund Policy</Link>
          </div>
        </div>

        <div className="footer-bottom">
          © 2025 E-Learn. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
