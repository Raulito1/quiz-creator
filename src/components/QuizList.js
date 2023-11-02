import React from 'react';

export default function QuizList({ quizzes, onEdit }) {
    return (
        <div>
            {/* Display a title for the list of quizzes */}
            <h1>Quizzes</h1>
            <ul>
                {/* Map through each quiz in the quizzes array */}
                {quizzes.map(quiz => (
                    <li key={quiz.id}>
                        {/* Display the title of the quiz in bold */}
                        <strong>{quiz.title}</strong>
                        {/* Display the description of the quiz */}
                        <p>{quiz.description}</p>
                        {/* Display the score of the quiz (assuming quizzes have a score property) */}
                        <p>{quiz.score}</p>
                        {/* Display the URL of the quiz */}
                        <p>{quiz.url}</p>
                        {/* When clicked, the onEdit callback is invoked with the current quiz as argument */}
                        <button onClick={() => onEdit(quiz)}>Edit</button>
                    </li>
                ))}
            </ul>
            {/* Provide a "Create New Quiz" button.
            When clicked, the onEdit callback is invoked with a null argument
            indicating that a new quiz should be created
             */}
            <button onClick={() => onEdit(null)}>Create New Quiz</button>
        </div>
    )
}
