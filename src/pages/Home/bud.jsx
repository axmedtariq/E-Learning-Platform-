import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./bud.scss";

export default function Bud() {
  // Slider settings for testimonials
  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">E-Learn</div>
        <div>
          <button>Home</button>
          <button>Courses</button>
          <button>Instructors</button>
          <button>Login</button>
        </div>
      </nav>

      {/* Hero Section */}
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
              <div
                className="thumbnail"
                style={{ height: "10rem", background: "#e5e7eb" }}
              ></div>
              <h3>{course}</h3>
              <p>
                Rating: <StarIcon className="star-icon" style={{ width: "1rem", display: "inline-block", color: "#fbbf24" }} /> 4.{i + 5}
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
              <div
                className="thumbnail"
                style={{ height: "10rem", background: "#e5e7eb" }}
              ></div>
              <h3>Course {i + 1}</h3>
              <p>Teacher: John Doe</p>
              <p>
                Rating: <StarIcon className="star-icon" style={{ width: "1rem", display: "inline-block", color: "#fbbf24" }} /> 4.{i}
              </p>
              <p>$19.99</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="testimonial-section">
        <h2>What Students Say</h2>
        <Slider {...testimonialSettings}>
          {[
            { text: "This course helped me land my first developer job!", name: "Sarah K." },
            { text: "Highly recommend these courses, very practical.", name: "Ahmed T." },
            { text: "Instructors are amazing and very clear.", name: "Maria L." },
          ].map((testimonial, i) => (
            <div className="testimonial-card" key={i}>
              <p>"{testimonial.text}"</p>
              <p className="student-name">– {testimonial.name}</p>
            </div>
          ))}
        </Slider>
      </section>

      {/* Footer */}
      <footer className="footer">
        © 2025 E-Learn. All rights reserved.
      </footer>
    </div>
  );
}
