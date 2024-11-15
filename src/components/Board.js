import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const BOARD_SIZE = 10;

const Board = () => {
    const [playerPosition, setPlayerPosition] = useState(1);
    const [diceRoll, setDiceRoll] = useState(null);
    const [isWon, setIsWon] = useState(false);

    const rollDice = () => {
        const roll = Math.floor(Math.random() * 6) + 1;
        setDiceRoll(roll);
        let newPosition = playerPosition + roll;
        if (newPosition <= 100 && !isWon) {
            newPosition = snakesAndLadders[newPosition] || newPosition;
            setPlayerPosition(newPosition);
        }

        if (newPosition == 100) {
            setIsWon(true);
        }
    };

    const snakes = {
        16: 6,
        47: 26,
        49: 11,
        56: 53,
        62: 19,
        64: 60,
        87: 24,
        93: 73,
        95: 75,
        98: 78
    };

    const ladders = {
        4: 14,
        9: 31,
        21: 42,
        28: 84,
        36: 44,
        51: 67,
        71: 91,
        76: 78,
        80: 100
    };

    const snakesAndLadders = {
        ...snakes,
        ...ladders
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
        <Container className="mt-4">

            {/* Board Game */}
            {!isWon && (
                <div>
                    <h1>Shoots and Ladders</h1>
                    <div className="board">
                        {Array.from({ length: BOARD_SIZE }).map((_, row) => (
                            <Row key={row} className="justify-content-center">
                                {Array.from({ length: BOARD_SIZE }).map((_, col) => {
                                    const squareNum = BOARD_SIZE * (BOARD_SIZE - row - 1) + (row % 2 === 0 ? col + 1 : BOARD_SIZE - col);

                                    // Determine if the square contains a snake or ladder
                                    const isSnake = snakes[squareNum];
                                    const isLadder = ladders[squareNum];

                                    return (
                                        <Col
                                            key={squareNum}
                                            className={`square text-center border p-3 ${playerPosition === squareNum ? 'bg-success text-white' : ''} ${isSnake ? 'bg-danger text-white' : ''} ${isLadder ? 'bg-primary text-white' : ''}`}
                                        >
                                            {squareNum}
                                            {isSnake && <span role="img" aria-label="snake"> 🐍 {snakes[squareNum]}</span>}
                                            {isLadder && <span role="img" aria-label="ladder"> 🪜 {ladders[squareNum]}</span>}
                                        </Col>
                                    );
                                })}
                            </Row>
                        ))}
                    </div>
                    <div className="text-center mt-4">
                        {diceRoll
                            ? <p>You rolled: {diceRoll}</p>
                            : <p>Click SPACE to Roll Dice</p>
                        }
                    </div>
                </div>
            )}

            {/* Win Screen Overlay */}
            {isWon && (
                <div className="win-screen-overlay align-items-center">
                    <div className="win-screen-content text-center">
                        <h2>Congratulations!</h2>
                        <p>You reached the top and won the game!</p>
                        <p>Press p to play again.</p>
                    </div>
                </div>
            )}
        </Container>
    );
}

export default Board;