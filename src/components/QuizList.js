import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function QuizList({ quizzes, onEdit }) {
    return (
        <div>
            {/* Display a title for the list of quizzes */}
            <h2 className="mb-4">Quizzes</h2>

            <ListGroup variant="flush">
                {/* Map through each quiz in the quizzes array */}
                {quizzes.map(quiz => (
                    <ListGroup.Item key={quiz.id}>
                        <Card>
                            <Card.Body>
                                {/* Display the title of the quiz in bold */}
                                <Card.Title>{quiz.title}</Card.Title>
                                {/* Display the description of the quiz */}
                                <Card.Text>{quiz.description}</Card.Text>
                                {/* Display the score of the quiz (assuming quizzes have a score property) */}
                                <Card.Text>Score: {quiz.score}</Card.Text>
                                {/* Display the URL of the quiz */}
                                <Card.Text>URL: <a href={quiz.url} target="_blank" rel="noreferrer">{quiz.url}</a></Card.Text>
                                {/* When clicked, the onEdit callback is invoked with the current quiz as argument */}
                                <Button variant="primary" onClick={() => onEdit(quiz)}>Edit</Button>
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            
            {/* Provide a "Create New Quiz" button.
            When clicked, the onEdit callback is invoked with a null argument
            indicating that a new quiz should be created
             */}
            <Button className="mt-4" variant="success" onClick={() => onEdit(null)}>Create New Quiz</Button>
        </div>
    );
}
