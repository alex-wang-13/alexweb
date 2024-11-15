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
    const [isStimulated, setIsStimulated] = useState(false);

    const [isWon, setIsWon] = useState(false);
    const [specialSquares, setSpecialSquares] = useState(undefined);
    const [specialEffect, setSpecialEffect] = useState(undefined);

    const rollDice = () => {
        const roll = Math.floor(Math.random() * 6) + 1;
        setDiceRoll(roll);
        let newPosition = playerPosition + roll;
        if (newPosition <= END_VALUE && !isWon) {
            setPlayerPosition(newPosition);
        }

        if (newPosition >= END_VALUE) {
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

    useEffect(() => {
        if (specialSquares) {
            const effect = specialSquares[playerPosition - 1];
            setSpecialEffect(effect);
            if (effect === '🎵' || effect === '⚡') {
                setIsStimulated(true);
            } else {
                setIsStimulated(false);
            }
        }
    }, [playerPosition]);

    useEffect(() => {
        if (specialSquares) {
            if (isStimulated) {
                setSpecialSquares(specialSquares.map(value => (value === '🎵') ? '⚡' : value));
            } else {
                setSpecialSquares(specialSquares.map(value => (value === '⚡') ? '🎵' : value));
            }
        }
    }, [isStimulated])

    useEffect(() => {
        if (!isWon) {
            const valueDistribution = ['🥴', '🎵', '💉', undefined, undefined, undefined];
            setSpecialSquares(Array.from({ length: END_VALUE }, () => {
                const randomIndex = Math.floor(Math.random() * valueDistribution.length);
                return valueDistribution[randomIndex];
            }).map((x, i) => (i + 1 === 1 || i + 1 === END_VALUE) ? undefined : x));
        }
    }, [isWon]);

    return (
        <Container fluid className="mt-4">

            <Row>
                {/* Game Board */}
                {specialSquares &&
                    <Col md={6}>
                        <div className="board">
                            {Array.from({ length: BOARD_SIZE }).map((_, row) => (
                                <Row key={row} className="justify-content-center">
                                    {Array.from({ length: BOARD_SIZE }).map((_, col) => {
                                        const index = row * BOARD_SIZE + col;
                                        const squareNum = BOARD_LAYOUT[index];

                                        // squareNum is 1-indexed
                                        const isSpecial = specialSquares[squareNum - 1];


                                        return (
                                            <Col
                                                key={col}
                                                className={`square text-center border p-3 ${playerPosition === squareNum ? 'bg-success text-white' : ''
                                                    } ${squareNum === -1 ? 'blank' : ''}`}
                                            >
                                                {(squareNum === -1) ? '' : (isSpecial) ? isSpecial : squareNum}
                                            </Col>
                                        );
                                    })}
                                </Row>
                            ))}
                        </div>
                    </Col>
                }

                {/* Right Panel */}
                <Col md={6} className="info-panel bg-light border p-3">
                    {(isWon) ? (
                        <div>
                            <p>{WIN_MSG}</p>
                            <p>Press P to play again.</p>
                        </div>
                    ) : (
                        <div>
                            <h4>Instructions</h4>
                            <p>{(diceRoll) ? 'You rolled: ' + diceRoll : 'Press SPACE to roll the dice.'}</p>
                        </div>
                    )}
                    {!isWon &&
                        <ListGroup>
                            {Object.entries(CODES).map(([code, description]) => (
                                <ListGroup.Item
                                    key={code}
                                    className={`
                                        ${code === specialEffect && code === '🥴' && 'bg-primary text-white'}
                                        ${code === specialEffect && code === '🎵' && 'bg-warning text-white'}
                                        ${code === specialEffect && code === '⚡' && 'bg-danger text-white'}
                                        ${code === specialEffect && code === '💉' && 'bg-info text-white'}
                                        ${code === specialEffect && code === '💤' && 'bg-black text-white'}
                                    `}
                                >
                                    <strong>{code}:</strong> {description}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    }
                </Col>
            </Row>

            <Row>
                {/* Title */}
                <Col md={12} className='text-center pt-5 font-monospace'>
                    <h1>😴 You Snooze | You Lose 😭</h1>
                </Col>
            </Row>
        </Container>
    );
};

export default Board;