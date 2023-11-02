import React, { useState } from 'react';

// Custom components
import QuizEditor from './components/QuizEditor';
import QuizList from './components/QuizList';

// Static quiz data imported from a JSON file
import quizData from './db.json';

function App() {
  // State to hold the list of quizzes
  const [quizzes, setQuizzes] = useState(quizData);
  // State to hold the currently selected quiz for editing or a new quiz
  const [currentQuiz, setCurrentQuiz] = useState(null);

  // Handler to set the quiz to be edited. If no quiz is passed, a new empty quiz is set up.
  function handleEdit(quiz) {
    if (quiz) {
      setCurrentQuiz(quiz);
  } else {
      setCurrentQuiz({
          title: '',
          description: '',
          url: '',
          questions_answers: []
      });
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
  }

  // Handler to cancel editing or creating a new quiz
  function handleCancel() {
    setCurrentQuiz(null);
  }

  return (
    <div>
      {/* Render the list of quizzes */}
      <QuizList quizzes={quizzes} onEdit={handleEdit} />

      {/* Conditionally render the QuizEditor if there's a currentQuiz set */}
      {currentQuiz && <QuizEditor quiz={currentQuiz} onSave={handleSave} onCancel={handleCancel} />}
    </div>
  );
}

export default App;
