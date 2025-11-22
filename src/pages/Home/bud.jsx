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
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="Navbar">
      {/* Navbar */}
      <nav className="navbar-container">
        <div className="nav-logo">E-Learn</div>

        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Courses</a></li>
          <li><a href="#">Instructors</a></li>
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
          {["React for Beginners", "JavaScript Essentials", "CSS Masterclass"].map((course, i) => (
            <div className="course-card" key={i}>
              <div className="thumbnail"></div>
              <h3>{course}</h3>
              <p>
                Rating: <StarIcon className="star-icon" /> 4.{i + 5}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* All Courses */}
      <section className="courses-section">
        <h2>All Courses</h2>
        <div className="courses-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="course-card" key={i}>
              <div className="thumbnail"></div>
              <h3>Course {i + 1}</h3>
              <p>Teacher: John Doe</p>
              <p>
                Rating: <StarIcon className="star-icon" /> 4.{i}
              </p>
              <p>$19.99</p>
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
            <a href="#">About Us</a>
            <a href="#">Contact</a>
            <a href="#">Careers</a>
          </div>

          <div className="footer-links">
            <h3>Support</h3>
            <a href="#">FAQ</a>
            <a href="#">Help Center</a>
            <a href="#">Community</a>
          </div>

          <div className="footer-links">
            <h3>Legal</h3>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Refund Policy</a>
          </div>
        </div>

        <div className="footer-bottom">
          © 2025 E-Learn. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
