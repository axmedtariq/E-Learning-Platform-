<div className="student-profile-page">

  <div className="header">
    <h1>Student Profile</h1>
    <button className="logout-btn">Logout</button>
  </div>

  <div className="profile-card">
    <img src="https://via.placeholder.com/120" alt="avatar" />

    <div className="info">
      <h2>John Doe</h2>
      <p>johndoe@gmail.com</p>
      <button className="upload-btn">Upload New Picture</button>
    </div>
  </div>

  <div className="settings-card">
    <h3>Settings</h3>

    <div className="form-grid">
      <input type="text" placeholder="Full Name" />
      <input type="email" placeholder="Email Address" />
      <input type="password" placeholder="New Password" />
      <input type="password" placeholder="Confirm Password" />
    </div>

    <button className="save-btn">Save Changes</button>
  </div>

  <div className="courses-card">
    <h3>My Courses</h3>

    <div className="course-space">
      {[1, 2, 3].map((course) => (
        <div className="course-item" key={course}>
          <img src="https://via.placeholder.com/120" alt="thumb" />

          <div className="course-info">
            <h4>Course Title {course}</h4>

            <div className="progress-bar">
              <div className="progress"></div>
            </div>

            <p>60% Completed</p>
          </div>

          <button className="continue-btn">Continue</button>
        </div>
      ))}
    </div>
  </div>

</div>
