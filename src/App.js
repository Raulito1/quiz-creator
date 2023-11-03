// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

import QuizEditor from './components/QuizEditor';
import QuizList from './components/QuizList';
import quizData from './db.json';
import useQuizManager from './hooks/useQuizManager'; // Custom hook

function App() {
    const { quizzes, currentQuiz, isEditing, deleteQuiz, saveQuiz, handleEdit } = useQuizManager(quizData);

    return (
        <Router>
            <Container className="App mt-5">
                <h1 className="text-center mb-4">Quiz Manager</h1>
                
                <Routes>
                    <Route path="/edit-quiz" element={<QuizEditor quiz={currentQuiz} onSave={saveQuiz} onCancel={() => handleEdit(null)} isEditing={isEditing} />} />
                    <Route path="/" element={<QuizList quizzes={quizzes} onEdit={handleEdit} onDelete={deleteQuiz} />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
