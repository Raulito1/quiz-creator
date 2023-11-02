import React, { useState } from 'react';

export default function QuizEditor({ quiz, onSave, onCancel }) {
    // localQuiz keeps track of the quiz data being edited/created in this component.
    const [localQuiz, setQuiz] = useState(quiz || getNewQuiz());

    // Returns a new blank quiz object.
    function getNewQuiz() {
        return {
            title: '',
            description: '',
            url: '',
            questions_answers: [{
                text: '',
                answers: [{ text: '', is_true: false }],
                feedback_false: '',
                feedback_true: ''
            }]
        };
    }

    // Calls the passed onSave callback with the current state of localQuiz.
    function handleSave() {
        onSave(localQuiz);
    }

    // Updates the text of a question in localQuiz.
    const handleQuestionChange = (qIndex, e) => {
        const newQuestions = [...localQuiz.questions_answers];
        newQuestions[qIndex].text = e.target.value;
        setQuiz({ ...localQuiz, questions_answers: newQuestions });
    };

    // Updates the text of an answer in localQuiz.
    const handleAnswerChange = (qIndex, aIndex, e) => {
        const newQuestions = [...localQuiz.questions_answers];
        newQuestions[qIndex].answers[aIndex].text = e.target.value;
        setQuiz({ ...localQuiz, questions_answers: newQuestions });
    };

    // Adds a blank question to localQuiz.
    function addQuestion() {
        const newQuestion = {
            text: '',
            answers: [{ text: '', is_true: false }],
            feedback_false: '',
            feedback_true: ''
        };
        setQuiz({ ...localQuiz, questions_answers: [...localQuiz.questions_answers, newQuestion] });
    }

    // Adds a blank answer to a specific question in localQuiz.
    function addAnswer(qIndex) {
        const newQuestions = [...localQuiz.questions_answers];
        newQuestions[qIndex].answers.push({ text: '', is_true: false });
        setQuiz({ ...localQuiz, questions_answers: newQuestions });
    }

    return (
        <div>
            {/* Conditionally display header based on whether editing or creating a quiz */}
            <h2>{quiz ? 'Edit Quiz' : 'Add New Quiz'}</h2>

            {/* Input field for quiz title */}
            <div>
                <label>Title: </label>
                <input
                    value={localQuiz.title}
                    onChange={e => setQuiz({ ...localQuiz, title: e.target.value })}
                />
            </div>

            {/* Input field for quiz description */}
            <div>
                <label>Description: </label>
                <input
                    value={localQuiz.description}
                    onChange={e => setQuiz({ ...localQuiz, description: e.target.value })}
                />
            </div>

            {/* Input field for quiz video URL */}
            <div>
                <label>Video URL: </label>
                <input
                    value={localQuiz.url}
                    onChange={e => setQuiz({ ...localQuiz, url: e.target.value })}
                />
            </div>

                {/* Display fields for editing/adding questions and their answers */}            {localQuiz.questions_answers && localQuiz.questions_answers.map((qa, qIndex) => (
                <div key={qIndex}>
                    <h4>Question {qIndex + 1}</h4>
                    <label>Question Text: </label>
                    <input
                        value={qa.text}
                        onChange={e => handleQuestionChange(qIndex, e)}
                    />
                    {qa.answers.map((answer, aIndex) => (
                        <div key={aIndex}>
                            <label>Answer {aIndex + 1}: </label>
                            <input
                                value={answer.text}
                                onChange={e => handleAnswerChange(qIndex, aIndex, e)}
                            />
                            <label>
                                <input
                                    type="radio"
                                    checked={answer.is_true}
                                    onChange={() => {
                                        const newQuestions = [...localQuiz.questions_answers];
                                        newQuestions[qIndex].answers.forEach(ans => ans.is_true = false); // reset all answers to false
                                        newQuestions[qIndex].answers[aIndex].is_true = true; // set current answer to true
                                        setQuiz({ ...localQuiz, questions_answers: newQuestions });
                                    }}
                                />
                                Correct
                            </label>
                        </div>
                    ))}
                    <button onClick={() => addAnswer(qIndex)}>Add Answer</button>
                    {/* Input fields for feedback on correct and incorrect answers */}

                    <div>
                        <label>Feedback (True): </label>
                        <input
                            value={qa.feedback_true}
                            onChange={e => {
                                const newQuestions = [...localQuiz.questions_answers];
                                newQuestions[qIndex].feedback_true = e.target.value;
                                setQuiz({ ...localQuiz, questions_answers: newQuestions });
                            }}
                        />
                    </div>
                    <div>
                        <label>Feedback (False): </label>
                        <input
                            value={qa.feedback_false}
                            onChange={e => {
                                const newQuestions = [...localQuiz.questions_answers];
                                newQuestions[qIndex].feedback_false = e.target.value;
                                setQuiz({ ...localQuiz, questions_answers: newQuestions });
                            }}
                        />
                    </div>
                </div>
            ))}
            <button onClick={addQuestion}>Add Question</button>
            <button onClick={handleSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}
