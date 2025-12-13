import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CoursePreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};

  if (!course) return <p>Course not found</p>;

  const handleCheckout = () => {
    alert("Redirecting to checkout...");
    // You can navigate to checkout page if needed
  };

  return (
    <div className="course-preview-container">
      <div className="course-player">
        <video width="100%" controls>
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="course-info">
        <h1>{course.name}</h1>
        <p>{course.description}</p>
        <p>Instructor: {course.instructor}</p>
        <p>Rating: {course.rating} ⭐</p>
        <p>Price: {course.price}</p>
        <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
      </div>

      <div className="course-modules">
        <h2>Modules & Lessons</h2>
        {course.modules.map((module, index) => (
          <div key={index} className="module">
            <h3>{module.name}</h3>
            <ul>
              {module.lessons.map((lesson, i) => (
                <li key={i}>{lesson}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
