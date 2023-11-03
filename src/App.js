import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Custom components
import QuizEditor from './components/QuizEditor';
import QuizList from './components/QuizList';

// Static quiz data imported from a JSON file
import quizData from './db.json';

// Bootstrap components
import Container from 'react-bootstrap/Container';
// Import Bootstrap CSS and optional theme
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // State to hold the list of quizzes
  const [quizzes, setQuizzes] = useState(quizData);
  // State to hold the currently selected quiz for editing or a new quiz
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [redirectToEdit, setRedirectToEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Handler to set the quiz to be edited. If no quiz is passed, a new empty quiz is set up.
  function handleEdit(quiz) {
    if (quiz) {
      setCurrentQuiz(quiz);
      setIsEditing(true);
    } else {
        setCurrentQuiz({
            title: '',
            description: '',
            score: '',
            url: '',
            questions_answers: []
        });
        setIsEditing(false);
    }
  }

  // Handler to save the quiz changes
  function handleSave(quiz) {
    if (quiz.id) {
      // If the quiz has an ID, update the existing quiz in the quizzes array
      setQuizzes(quizzes.map(q => q.id === quiz.id ? quiz : q));
    } else {
      // If the quiz doesn't have an ID, it's a new quiz. Add it to the quizzes array with a new ID.
      setQuizzes([...quizzes, { ...quiz, id: Date.now() }]);
    }
    // Reset the currentQuiz to null after saving
    setCurrentQuiz(null);
    setIsEditing(false);
  }

  // Handler to cancel editing or creating a new quiz
  function handleCancel() {
    setCurrentQuiz(null);
    setIsEditing(false);
  }

  return (
    <Router>
      <Container className="App mt-5">
        <h1 className="text-center mb-4">Quiz Manager</h1>
        
        <Routes>
          <Route path="/edit-quiz" element={<QuizEditor quiz={currentQuiz} onSave={handleSave} onCancel={handleCancel} isEditing={isEditing} />} />
          <Route path="/" element={<QuizList quizzes={quizzes} onEdit={handleEdit} redirectToEdit={redirectToEdit} setRedirectToEdit={setRedirectToEdit} />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
