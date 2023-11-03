import React from 'react';

// Custom hook for managing quiz editor state
import { useQuizEditor } from '../hooks/useQuizEditor';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function QuizEditor({ quiz, onSave, onCancel, isEditing }) {
    const {
        localQuiz,
        handleSave,
        setLocalQuiz,
        handleQuestionChange,
        handleAnswerChange,
        addQuestion,
        addAnswer,
        navigate
    } = useQuizEditor(quiz, onSave, onCancel);

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
                        value={localQuiz.title || ''}
                        onChange={e => setLocalQuiz({ ...localQuiz, title: e.target.value })}
                    />
                </Form.Group>

                {/* Input field for quiz description */}
                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                        type="text"
                        value={localQuiz.description || ''}
                        onChange={e => setLocalQuiz({ ...localQuiz, description: e.target.value })}
                    />
                </Form.Group>

                 {/* Input field for quiz score */}
                <Form.Group>
                    <Form.Label>Score:</Form.Label>
                    <Form.Control
                        type="text"
                        value={localQuiz.score || ''}
                        onChange={e => setLocalQuiz({ ...localQuiz, score: e.target.value })}
                    />
                </Form.Group>

                {/* Input field for quiz video URL */}
                <Form.Group>
                    <Form.Label>Video URL:</Form.Label>
                    <Form.Control
                        type="text"
                        value={localQuiz.url || ''}
                        onChange={e => setLocalQuiz({ ...localQuiz, url: e.target.value })}
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
                                onChange={e => handleQuestionChange(qIndex, e.target.value)}
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
                                            value={answer.text || ''}
                                            onChange={e => handleAnswerChange(qIndex, aIndex, e.target.value)}
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
                                    setLocalQuiz({ ...localQuiz, questions_answers: newQuestions });
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
                                    setLocalQuiz({ ...localQuiz, questions_answers: newQuestions });
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
