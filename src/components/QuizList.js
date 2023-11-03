import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

export default function QuizList({ quizzes, onEdit }) {
    const navigate = useNavigate();
    
    return (
        <div>
            <h2 className="mb-4">Quizzes</h2>

            <ListGroup variant="flush">
                {quizzes.map(quiz => (
                    <ListGroup.Item key={quiz.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{quiz.title}</Card.Title>
                                <Card.Text>{quiz.description}</Card.Text>
                                <Card.Text>Score: {quiz.score}</Card.Text>
                                <Card.Text>URL: <a href={quiz.url} target="_blank" rel="noreferrer">{quiz.url}</a></Card.Text>
                                <Button variant="primary" onClick={() => {
                                    onEdit(quiz);
                                    navigate('/edit-quiz');
                                }}>Edit</Button>
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            
            <Button className="mt-4" variant="success" onClick={() => {
                onEdit(null);
                navigate('/edit-quiz');
            }}>Create New Quiz</Button>
        </div>
    );
}
