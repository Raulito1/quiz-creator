// useQuizManager.js
import { useState } from 'react';

function useQuizManager(initialQuizzes) {
    const [quizzes, setQuizzes] = useState(initialQuizzes);
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const deleteQuiz = (quizId) => {
        setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
    };

    const saveQuiz = (quiz) => {
        if (quiz.id) {
            setQuizzes(quizzes.map(q => q.id === quiz.id ? quiz : q));
        } else {
            setQuizzes([...quizzes, { ...quiz, id: Date.now() }]);
        }
        setCurrentQuiz(null);
        setIsEditing(false);
    };

    const handleEdit = (quiz) => {
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
    };

    return { quizzes, currentQuiz, isEditing, deleteQuiz, saveQuiz, handleEdit };
}

export default useQuizManager;
