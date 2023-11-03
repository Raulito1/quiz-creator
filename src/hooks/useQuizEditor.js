// useQuizEditor.js
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Function to create a new blank quiz
const getNewQuiz = () => {
    return {
        title: '',
        description: '',
        score: '',
        url: '',
        questions_answers: [{
            text: '',
            answers: [{ text: '', is_true: false }],
            feedback_false: '',
            feedback_true: ''
        }]
    };
};

export const useQuizEditor = (initialQuiz, onSave) => {
    const [localQuiz, setLocalQuiz] = useState(initialQuiz || getNewQuiz());
    const navigate = useNavigate();

    const handleSave = useCallback(() => {
        if (!localQuiz.title.trim() || !localQuiz.description.trim() || !localQuiz.url.trim()) {
            alert('Please fill out all required fields.');
            return;
        }
        onSave(localQuiz);
        navigate('/');
    }, [localQuiz, onSave, navigate]);

    const handleQuestionChange = useCallback((qIndex, text) => {
        const newQuestions = [...localQuiz.questions_answers];
        newQuestions[qIndex].text = text;
        setLocalQuiz({ ...localQuiz, questions_answers: newQuestions });
    }, [localQuiz]);

    const handleAnswerChange = useCallback((qIndex, aIndex, text) => {
        const newQuestions = [...localQuiz.questions_answers];
        newQuestions[qIndex].answers[aIndex].text = text;
        setLocalQuiz({ ...localQuiz, questions_answers: newQuestions });
    }, [localQuiz]);

    const addQuestion = useCallback(() => {
        const newQuestion = {
            text: '',
            answers: [{ text: '', is_true: false }],
            feedback_false: '',
            feedback_true: ''
        };
        setLocalQuiz({ ...localQuiz, questions_answers: [...localQuiz.questions_answers, newQuestion] });
    }, [localQuiz]);

    const addAnswer = useCallback((qIndex) => {
        const newQuestions = [...localQuiz.questions_answers];
        newQuestions[qIndex].answers.push({ text: '', is_true: false });
        setLocalQuiz({ ...localQuiz, questions_answers: newQuestions });
    }, [localQuiz]);

    return {
        localQuiz,
        handleSave,
        handleQuestionChange,
        handleAnswerChange,
        addQuestion,
        addAnswer,
        setLocalQuiz,
        navigate,
    };
};
