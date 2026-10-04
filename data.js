/* ============================================================
   EDIT THIS FILE ONLY. Upload your files into the matching
   folder (uploads/quiz, uploads/midterms, ...) then add a line
   for each one below. Save, then re-upload the code to your host.
   ============================================================ */

const PROFILE = {
  name: "Your Name",
  tagline: "Student portfolio of quizzes, exams, activities and projects.",
  course: "Your Course / Year Level",
  school: "Your School",
  photo: "",            // e.g. "uploads/me.jpg"  (leave "" for initials)
  about: [
    "Write a short introduction about yourself here.",
    "Add a second paragraph about your goals, interests, or what you are learning."
  ],
  skills: ["HTML", "CSS", "JavaScript"],
  email: "you@example.com"
};

/* Each item: { title, file, note }
   - file: path to an image (jpg, png, gif, webp) or document (pdf, docx, pptx, zip...)
   - note: optional short description (leave "" if none)       */
const WORK = {
  "quiz": {
    label: "Quiz",
    items: [
      // { title: "Quiz 1 – HTML Basics", file: "uploads/quiz/quiz1.jpg", note: "Score: 20/20" },
    ]
  },
  "long-quiz": {
    label: "Long Quiz",
    items: [
      // { title: "Long Quiz 1", file: "uploads/long-quiz/lq1.pdf", note: "" },
    ]
  },
  "midterms": {
    label: "Midterms",
    items: [
      // { title: "Midterm Exam", file: "uploads/midterms/midterm.pdf", note: "" },
    ]
  },
  "finals": {
    label: "Finals",
    items: [
      // { title: "Final Exam", file: "uploads/finals/final.pdf", note: "" },
    ]
  },
  "activity": {
    label: "Activity",
    items: [
      // { title: "Activity 1", file: "uploads/activity/act1.png", note: "" },
    ]
  },
  "project": {
    label: "Project",
    items: [
      // { title: "Final Project", file: "uploads/project/project.png", note: "Built with HTML, CSS, JS" },
    ]
  }
};
