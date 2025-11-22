import React, { useState } from "react";
import "./CourseUpload.scss";

export default function CourseUpload() {
  const [modules, setModules] = useState([
    {
      title: "",
      lessons: [{ title: "", video: null }],
      quiz: {
        title: "",
        questions: [
          { question: "", option1: "", option2: "", option3: "", option4: "", correct: "" }
        ],
      },
      assignment: {
        title: "",
        description: "",
        file: null,
      }
    },
  ]);

  const addModule = () => {
    setModules([
      ...modules,
      {
        title: "",
        lessons: [{ title: "", video: null }],
        quiz: {
          title: "",
          questions: [
            { question: "", option1: "", option2: "", option3: "", option4: "", correct: "" }
          ],
        },
        assignment: {
          title: "",
          description: "",
          file: null,
        }
      }
    ]);
  };

  const addLesson = (mIndex) => {
    const updated = [...modules];
    updated[mIndex].lessons.push({ title: "", video: null });
    setModules(updated);
  };

  const addQuestion = (mIndex) => {
    const updated = [...modules];
    updated[mIndex].quiz.questions.push({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correct: "",
    });
    setModules(updated);
  };

  const handleModuleChange = (mIndex, value) => {
    const updated = [...modules];
    updated[mIndex].title = value;
    setModules(updated);
  };

  const handleLessonChange = (mIndex, lIndex, key, value) => {
    const updated = [...modules];
    updated[mIndex].lessons[lIndex][key] = value;
    setModules(updated);
  };

  const handleQuizChange = (mIndex, key, value) => {
    const updated = [...modules];
    updated[mIndex].quiz[key] = value;
    setModules(updated);
  };

  const handleQuestionChange = (mIndex, qIndex, key, value) => {
    const updated = [...modules];
    updated[mIndex].quiz.questions[qIndex][key] = value;
    setModules(updated);
  };

  const handleAssignmentChange = (mIndex, key, value) => {
    const updated = [...modules];
    updated[mIndex].assignment[key] = value;
    setModules(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Course Submitted:", modules);
  };

  return (
    <div className="course-upload-container">
      <div className="upload-card">
        <h2>Upload New Course</h2>

        <form onSubmit={handleSubmit}>
          {/* Course Title */}
          <label>Course Title</label>
          <input type="text" placeholder="Enter course title" required />

          {/* Course Description */}
          <label>Course Description</label>
          <textarea placeholder="Write about the course..." required />

          <h3 className="section-title">Modules & Lessons</h3>

          {modules.map((module, mIndex) => (
            <div key={mIndex} className="module-box">
              
              {/* Module Title */}
              <input
                type="text"
                className="module-input"
                placeholder="Module Title"
                value={module.title}
                onChange={(e) => handleModuleChange(mIndex, e.target.value)}
                required
              />

              {/* Lessons Section */}
              {module.lessons.map((lesson, lIndex) => (
                <div key={lIndex} className="lesson-box">
                  <input
                    type="text"
                    placeholder="Lesson Title"
                    value={lesson.title}
                    onChange={(e) =>
                      handleLessonChange(mIndex, lIndex, "title", e.target.value)
                    }
                    required
                  />

                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                      handleLessonChange(mIndex, lIndex, "video", e.target.files[0])
                    }
                    required
                  />
                </div>
              ))}

              <button
                type="button"
                className="add-lesson-btn"
                onClick={() => addLesson(mIndex)}
              >
                + Add Lesson
              </button>

              {/* QUIZ SECTION */}
              <h4 className="quiz-title">Module Quiz</h4>
              <input
                type="text"
                placeholder="Quiz Title"
                value={module.quiz.title}
                onChange={(e) => handleQuizChange(mIndex, "title", e.target.value)}
                className="quiz-input"
              />

              {module.quiz.questions.map((q, qIndex) => (
                <div key={qIndex} className="quiz-question-box">
                  <input
                    type="text"
                    placeholder="Question"
                    value={q.question}
                    onChange={(e) =>
                      handleQuestionChange(mIndex, qIndex, "question", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Option 1"
                    value={q.option1}
                    onChange={(e) =>
                      handleQuestionChange(mIndex, qIndex, "option1", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Option 2"
                    value={q.option2}
                    onChange={(e) =>
                      handleQuestionChange(mIndex, qIndex, "option2", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Option 3"
                    value={q.option3}
                    onChange={(e) =>
                      handleQuestionChange(mIndex, qIndex, "option3", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Option 4"
                    value={q.option4}
                    onChange={(e) =>
                      handleQuestionChange(mIndex, qIndex, "option4", e.target.value)
                    }
                  />

                  <input
                    type="text"
                    placeholder="Correct Answer"
                    value={q.correct}
                    onChange={(e) =>
                      handleQuestionChange(mIndex, qIndex, "correct", e.target.value)
                    }
                  />
                </div>
              ))}

              <button
                type="button"
                className="add-lesson-btn"
                onClick={() => addQuestion(mIndex)}
              >
                + Add Quiz Question
              </button>

              {/* ASSIGNMENT SECTION */}
              <h4 className="assignment-title">Module Assignment</h4>

              <input
                type="text"
                placeholder="Assignment Title"
                value={module.assignment.title}
                onChange={(e) =>
                  handleAssignmentChange(mIndex, "title", e.target.value)
                }
              />

              <textarea
                placeholder="Assignment Description"
                value={module.assignment.description}
                onChange={(e) =>
                  handleAssignmentChange(mIndex, "description", e.target.value)
                }
              />

              <input
                type="file"
                accept=".pdf,.doc,.docx,.zip"
                onChange={(e) =>
                  handleAssignmentChange(mIndex, "file", e.target.files[0])
                }
              />
            </div>
          ))}

          <button type="button" className="add-module-btn" onClick={addModule}>
            + Add Module
          </button>

          <button type="submit" className="publish-btn">
            Publish Course
          </button>

        </form>

      </div>
    </div>
  );
}
