import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function QuizEditor({ quiz, onSave, onCancel, isEditing }) {
    // localQuiz keeps track of the quiz data being edited/created in this component.
    const [localQuiz, setQuiz] = useState(quiz || getNewQuiz());

    // useNavigate hook from react-router-dom to redirect the user after saving/canceling.
    const navigate = useNavigate();

    // console log quiz
    console.log(quiz);

    // Returns a new blank quiz object.
    function getNewQuiz() {
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
    }

    // Calls the passed onSave callback with the current state of localQuiz.
    function handleSave() {
        // Check if title, description, or url are empty
        if (!localQuiz.title.trim() || !localQuiz.description.trim() || !localQuiz.url.trim()) {
            alert('Please fill out all required fields.'); // You can replace this with a more sophisticated validation message or UI indication.
            return; // Prevent the save operation
        }
        onSave(localQuiz);
        navigate('/'); // Trigger the redirection after saving
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
            <h2 className="mb-4">{isEditing ? 'Edit Quiz' : 'Add New Quiz'}</h2>
            <h6>{!isEditing ? 'Title, Description & URL are Required *' : ''}</h6>

            <Form>
                {/* Input field for quiz title */}
                <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        type="text"
                        value={localQuiz.title}
                        onChange={e => setQuiz({ ...localQuiz, title: e.target.value })}
                    />
                </Form.Group>

                {/* Input field for quiz description */}
                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                        type="text"
                        value={localQuiz.description}
                        onChange={e => setQuiz({ ...localQuiz, description: e.target.value })}
                    />
                </Form.Group>

                 {/* Input field for quiz score */}
                <Form.Group>
                    <Form.Label>Score:</Form.Label>
                    <Form.Control
                        type="text"
                        value={localQuiz.score}
                        onChange={e => setQuiz({ ...localQuiz, score: e.target.value })}
                    />
                </Form.Group>

                {/* Input field for quiz video URL */}
                <Form.Group>
                    <Form.Label>Video URL:</Form.Label>
                    <Form.Control
                        type="text"
                        value={localQuiz.url}
                        onChange={e => setQuiz({ ...localQuiz, url: e.target.value })}
                        className="mb-3" // Adds margin-bottom with a value of 3
                    />
                </Form.Group>
                {/* Display fields for editing/adding questions and their answers */}            
                {localQuiz.questions_answers && localQuiz.questions_answers.map((qa, qIndex) => (
                    <Card className="mb-4" key={qIndex}>
                    <Card.Header>Question {qIndex + 1}</Card.Header>
                    <Card.Body>
                        <Form.Group>
                            <Form.Label>Question Text:</Form.Label>
                            <Form.Control
                                type="text"
                                value={qa.text}
                                onChange={e => handleQuestionChange(qIndex, e)}
                                className="mb-3"
                            />
                        </Form.Group>

                        <ListGroup>
                            {qa.answers.map((answer, aIndex) => (
                                <ListGroup.Item key={aIndex}>
                                    <Form.Group>
                                        <Form.Label>Answer {aIndex + 1}:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={answer.text}
                                            onChange={e => handleAnswerChange(qIndex, aIndex, e)}
                                        />
                                    </Form.Group>
                                    <Form.Check 
                                        type="radio"
                                        label="Correct"
                                        checked={answer.is_true}
                                        onChange={() => {
                                            // ... [rest of the onChange function remains unchanged]
                                        }}
                                    />
                                </ListGroup.Item>
                            ))}
                        </ListGroup>

                        <Button className="mt-2" variant="outline-primary" onClick={() => addAnswer(qIndex)}>Add Answer</Button>

                        <Form.Group className="mt-2">
                            <Form.Label>Feedback (True):</Form.Label>
                            <Form.Control
                                type="text"
                                value={qa.feedback_true}
                                onChange={e => {
                                    const newQuestions = [...localQuiz.questions_answers];
                                    newQuestions[qIndex].feedback_true = e.target.value;
                                    setQuiz({ ...localQuiz, questions_answers: newQuestions });
                                }}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Feedback (False):</Form.Label>
                            <Form.Control
                                type="text"
                                value={qa.feedback_false}
                                onChange={e => {
                                    const newQuestions = [...localQuiz.questions_answers];
                                    newQuestions[qIndex].feedback_false = e.target.value;
                                    setQuiz({ ...localQuiz, questions_answers: newQuestions });
                                }}
                            />
                        </Form.Group>
                    </Card.Body>
                    </Card>
                ))}
                <div className="pt-3"> {/* pt-3 stands for padding-top with a value of 3 */}
                    <Button variant="primary" className="me-3" onClick={addQuestion}>Add Question</Button>
                    <Button variant="success" className="me-3" onClick={handleSave} disabled={!localQuiz.title.trim() || !localQuiz.description.trim() || !localQuiz.url.trim()}>Save</Button>
                    <Button variant="danger" onClick={() => {onCancel(); navigate('/')}}>Cancel</Button>
                </div>
            </Form>
        </div>
    );
}
