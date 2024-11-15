import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import '../styles/Board.css';

const BOARD_LAYOUT = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    36, -1, -1, -1, -1, -1, -1, -1, -1, 11,
    35, -1, -1, -1, -1, -1, -1, -1, -1, 12,
    34, -1, -1, -1, -1, -1, -1, -1, -1, 13,
    33, -1, -1, -1, -1, -1, -1, -1, -1, 14,
    32, -1, -1, -1, -1, -1, -1, -1, -1, 15,
    31, -1, -1, -1, -1, -1, -1, -1, -1, 16,
    30, -1, -1, -1, -1, -1, -1, -1, -1, 17,
    29, -1, -1, -1, -1, -1, -1, -1, -1, 18,
    28, 27, 26, 25, 24, 23, 22, 21, 20, 19,
];
const BOARD_SIZE = 10;
const END_VALUE = 36;
const CODES = {
    '🥴': 'You laughed at a funny joke, but the emotional response caused cataplexy! Your muscles go limp, and you collapse briefly. Miss your next turn to recover.',
    '🎵': '(2 Hz LC stimulation) Your LC received has been optogenetically stimulated, boosting norepinephrine release! You feel more alert—go one down on the sleepy scale.',
    '⚡': 'Oops! Consecutive LC stimulations overwhelmed your system, causing behavioral arrest. This mimics cataplexy-like symptoms—skip your next turn.',
    '💉': "(Orexin injection) With an orexin boost stabilizing your arousal system, you're more awake, but orexin-deficient brains often crave food for energy. No sleepy scale movement this turn, but you need to sit out the next turn to rest.",
    '💤': 'You miss 2 turns when the sleepy scale is full. Your narcolepsy increases the sleepy scale every turns unless you experience a special effect.',
};
const WIN_MSG = "Congratulations! You've reached the final step and undergone an LC transplant. This restores norepinephrine release and balances your arousal system. Your sleepy scale resets to zero, and cataplexy is no longer an obstacle. With proper LC function, you're finally able to maintain wakefulness and muscle tone. You win the game—narcolepsy is cured!";

const Board = () => {
    const [playerPosition, setPlayerPosition] = useState(1);
    const [diceRoll, setDiceRoll] = useState(null);
    const [isWon, setIsWon] = useState(false);

    const rollDice = () => {
        const roll = Math.floor(Math.random() * 6) + 1;
        setDiceRoll(roll);
        let newPosition = playerPosition + roll;
        if (newPosition <= END_VALUE && !isWon) {
            setPlayerPosition(newPosition);
        } else if (newPosition >= END_VALUE) {
            setPlayerPosition(END_VALUE);
            setIsWon(true);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === ' ' && !isWon) {
                e.preventDefault();
                rollDice();
            } else if (isWon && e.key.toUpperCase() === 'P') {
                setPlayerPosition(1);
                setDiceRoll(null);
                setIsWon(false);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    return (
        <Container fluid className="mt-4">
            <Row>
                {/* Left Panel */}
                {/* <Col md={2} className="info-panel bg-light border p-3">
                    <h4>Game Info</h4>
                    <p>Player Position: {playerPosition}</p>
                    <p>Dice Roll: {diceRoll || 'Roll to start'}</p>
                </Col> */}

                {/* Game Board */}
                <Col md={6}>
                    <div className="board">
                        {Array.from({ length: BOARD_SIZE }).map((_, row) => (
                            <Row key={row} className="justify-content-center">
                                {Array.from({ length: BOARD_SIZE }).map((_, col) => {
                                    const index = row * BOARD_SIZE + col;
                                    const squareNum = BOARD_LAYOUT[index];

                                    return (
                                        <Col
                                            key={col}
                                            className={`square text-center border p-3 ${playerPosition === squareNum ? 'bg-success text-white' : ''
                                                } ${squareNum === -1 ? 'blank' : ''}`}
                                        >
                                            {squareNum !== -1 ? squareNum : ''}
                                        </Col>
                                    );
                                })}
                            </Row>
                        ))}
                    </div>
                </Col>

                {/* Right Panel */}
                <Col md={6} className="info-panel bg-light border p-3">
                    <h4>Instructions</h4>
                    {(isWon) ? (
                        <div>
                            <p>{WIN_MSG}</p>
                            <p>Press P to play again.</p>
                        </div>
                    ) : (
                        <p>{(diceRoll) ? 'You rolled: ' + diceRoll : 'Press SPACE to roll the dice.'}</p>
                    )}
                    {!isWon &&
                        <ListGroup>
                            {Object.entries(CODES).map(([code, description]) => (
                                <ListGroup.Item key={code}>
                                    <strong>{code.toUpperCase()}:</strong> {description}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default Board;