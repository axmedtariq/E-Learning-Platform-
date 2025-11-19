import React, { useState } from 'react';
import "./CoursePreviewPage.scss";

export default function CoursePreviewPage() {
  const [activeModule, setActiveModule] = useState(null);

  const course = {
    title: 'Mastering React: From Zero to Production',
    subtitle: 'Build real-world apps and ship them to users',
    description:
      'A hands-on course that teaches you React fundamentals, hooks, routing, state management, testing, and deployment. Includes real projects and downloadable resources.',
    price: 79,
    rating: 4.8,
    students: 12450,
    previewVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    modules: [
      {
        id: 1,
        title: 'Introduction & Setup',
        duration: '18m',
        lessons: [
          { id: '1-1', title: 'Welcome', length: '2:30' },
          { id: '1-2', title: 'Tooling & VSCode Tips', length: '8:00' },
          { id: '1-3', title: 'Project Setup', length: '7:30' },
        ],
      },
      {
        id: 2,
        title: 'React Basics',
        duration: '1h 12m',
        lessons: [
          { id: '2-1', title: 'JSX & Rendering', length: '10:00' },
          { id: '2-2', title: 'Components & Props', length: '18:00' },
          { id: '2-3', title: 'State & Events', length: '20:00' },
          { id: '2-4', title: 'Lifecycle & Effects', length: '24:00' },
        ],
      },
      {
        id: 3,
        title: 'Advanced Patterns',
        duration: '2h 05m',
        lessons: [
          { id: '3-1', title: 'Context & Reducers', length: '28:00' },
          { id: '3-2', title: 'Custom Hooks', length: '22:00' },
          { id: '3-3', title: 'Performance Optimization', length: '35:00' },
        ],
      },
    ],
  };

  return (
    <div className="course-container">
      <div className="course-grid">
        
        {/* Main Section */}
        <main className="main-content">
          <div className="content-card">
            <h1 className="title">{course.title}</h1>
            <p className="subtitle">{course.subtitle}</p>

            <div className="top-grid">
              <div className="video-section">
                <div className="video-wrapper">
                  <video
                    className="video"
                    controls
                    src={course.previewVideo}
                  />
                </div>
              </div>

              <div className="stats-box">
                <div className="stats-row">
                  <div>
                    <p className="label">Rating</p>
                    <p className="value">{course.rating} ★</p>
                  </div>
                  <div className="text-right">
                    <p className="label">Students</p>
                    <p className="value">{course.students.toLocaleString()}</p>
                  </div>
                </div>

                <div className="price-box">
                  <p className="label">Price</p>
                  <p className="price">${course.price}</p>
                </div>
              </div>
            </div>

            <section className="section">
              <h2 className="section-title">About this course</h2>
              <p className="description">{course.description}</p>
            </section>

            <section className="section">
              <h2 className="section-title">Modules</h2>

              <div className="modules">
                {course.modules.map((mod) => (
                  <div key={mod.id} className="module-card">
                    <button
                      onClick={() => setActiveModule(activeModule === mod.id ? null : mod.id)}
                      className="module-header"
                    >
                      <div>
                        <div className="module-title">{mod.title}</div>
                        <div className="module-info">
                          {mod.duration} • {mod.lessons.length} lessons
                        </div>
                      </div>
                      <div className="module-toggle">
                        {activeModule === mod.id ? "Collapse" : "View"}
                      </div>
                    </button>

                    {activeModule === mod.id && (
                      <div className="lessons-box">
                        <ul className="lessons-list">
                          {mod.lessons.map((lesson) => (
                            <li key={lesson.id} className="lesson-item">
                              <div>
                                <div className="lesson-title">{lesson.title}</div>
                                <div className="lesson-length">{lesson.length}</div>
                              </div>

                              <button className="lesson-btn">Preview</button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-sticky">
            
            <div className="sidebar-card">
              <p className="label">Course</p>
              <h3 className="sidebar-title">{course.title}</h3>

              <div className="price-box">
                <p className="label">Price</p>
                <p className="price">${course.price}</p>
              </div>

              <button className="checkout-btn">Checkout</button>

              <div className="guarantee">
                <a href="#">30-day money-back guarantee</a>
              </div>
            </div>

            <div className="instructor-card">
              <p className="label">Instructor</p>
              <div className="instructor-info">
                <div className="avatar" />
                <div>
                  <div className="instructor-name">Jane Doe</div>
                  <div className="instructor-role">Senior Engineer & Instructor</div>
                </div>
              </div>
            </div>

            <div className="details-card">
              <p className="label">Course Details</p>
              <ul className="details-list">
                <li>• {course.modules.length} modules</li>
                <li>• {course.students.toLocaleString()} students</li>
                <li>• {course.rating} average rating</li>
              </ul>
            </div>

          </div>
        </aside>
      </div>
    </div>
  );
}
