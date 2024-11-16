import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import '../styles/Board.css';

const BOARD_LAYOUT = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    36, -4, -4, -4, -4, -4, -4, -4, -4, 11,
    35, -4, -3, -3, -3, -3, -3, -3, -4, 12,
    34, -4, -3, -2, -2, -2, -2, -3, -4, 13,
    33, -4, -3, -2, -1, -1, -2, -3, -4, 14,
    32, -4, -3, -2, -1, -1, -2, -3, -4, 15,
    31, -4, -3, -2, -2, -2, -2, -3, -4, 16,
    30, -4, -3, -3, -3, -3, -3, -3, -4, 17,
    29, -4, -4, -4, -4, -4, -4, -4, -4, 18,
    28, 27, 26, 25, 24, 23, 22, 21, 20, 19,
];
const BOARD_SIZE = 10;
const END_VALUE = 36;
const MAX_SLEEP = 4;
const CODES = {
    '🥴': 'You laughed at a funny joke, but the emotional response caused cataplexy! Your muscles go limp, and you collapse briefly. Miss your next turn to recover.',
    '🎵': '(2 Hz LC stimulation) Your LC has been optogenetically stimulated, boosting norepinephrine release! You feel more alert—go one down on the sleepy scale.',
    '⚡': 'Oops! Consecutive LC stimulations overwhelmed your system, causing behavioral arrest. This mimics cataplexy-like symptoms—skip your next turn.',
    '💉': "(Orexin injection) With an orexin boost stabilizing your arousal system, you're more awake, but orexin-deficient brains often crave food for energy. No sleepy scale movement this turn, but you need to sit out the next turn to rest.",
    '💤': 'You miss 2 turns when the sleepy scale is full. Your narcolepsy increases the sleepy scale every turns unless otherwise stated.',
};
const WIN_MSG = "Congratulations! You've reached the final step and undergone an LC transplant. This restores norepinephrine release and balances your arousal system. Your sleepy scale resets to zero, and cataplexy is no longer an obstacle. With proper LC function, you're finally able to maintain wakefulness and muscle tone. You win the game—narcolepsy is cured!";
// Gray color shades
const GRAY100 = '#f8f9fa'; // Light gray
const GRAY200 = '#e9ecef'; // Adjusted shade
const GRAY300 = '#dee2e6';
const GRAY400 = '#ced4da';
const GRAY500 = '#adb5bd';
const GRAY600 = '#6c757d'; // Adjusted darker shade
const GRAY700 = '#495057';
const GRAY800 = '#343a40';
const GRAY900 = '#212529'; // Dark gray

const Board = () => {
    // Player action + information
    const [playerPosition, setPlayerPosition] = useState(1);
    const [diceRoll, setDiceRoll] = useState(null);

    // Player status
    const [sleepyScale, setSleepyScale] = useState(0);
    const [turnsDelayed, setTurnsDelayed] = useState(0);
    const [isSleeping, setIsSleeping] = useState(false);

    // Stats
    const [numMoves, setNumMoves] = useState(0);
    const [numSleeps, setNumSleeps] = useState(0);

    // Game status
    const [isWon, setIsWon] = useState(false);
    const [specialSquares, setSpecialSquares] = useState(undefined);
    const [specialEffect, setSpecialEffect] = useState(undefined);
    const [isStimulated, setIsStimulated] = useState(false);

    // Cheat state
    const [trigger, setTrigger] = useState(false);

    const rollDice = () => {
        if (turnsDelayed > 0) {
            // Delay turn
            setTurnsDelayed(value => value - 1);
            // If last turn delay, reset sleepy scale
            if (isSleeping && turnsDelayed === 1) {
                setSleepyScale(0);
                setIsSleeping(false);
            }
        } else {
            // Roll dice
            const roll = Math.floor(Math.random() * 6) + 1;
            setDiceRoll(roll);
            let newPosition = playerPosition + roll;
            if (newPosition <= END_VALUE && !isWon) {
                setPlayerPosition(newPosition);
            } else if (newPosition >= END_VALUE) {
                setPlayerPosition(END_VALUE);
                setIsWon(true);
            }
        }
    };

    useEffect(() => {
        if (sleepyScale < 0) setSleepyScale(0);
        if (sleepyScale >= MAX_SLEEP) {
            // Skip 2 turns at sleep scale max
            setTurnsDelayed(2);
            setIsSleeping(true);
            setNumSleeps(value => value + 1);
        }
    }, [sleepyScale]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === ' ' && !isWon) {
                e.preventDefault();
                setNumMoves(value => value + 1);
                rollDice();
            } else if (isWon && (e.key.toUpperCase() === 'P')) {
                setIsWon(false);
                setNumMoves(0);
                setNumSleeps(0);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    useEffect(() => {
        if (specialSquares) {
            const effect = specialSquares[playerPosition - 1];
            setSpecialEffect(effect);
            setTrigger(!trigger);
        }
    }, [playerPosition]);

    useEffect(() => {
        if (specialEffect) {
            // Handle stimulated effect
            if (specialEffect === '🎵' || specialEffect === '⚡') {
                setIsStimulated(true);
            } else {
                setIsStimulated(false);
            }

            // Update delays and sleepiness
            if (specialEffect === '🥴') {
                // Skip next turn
                setSleepyScale(value => value + 1);
                setTurnsDelayed(1);
            } else if (specialEffect === '🎵') {
                // Reduce sleepiness
                setSleepyScale(value => value - 1);
            } else if (specialEffect === '⚡') {
                // Skip next turn
                setSleepyScale(value => value + 1);
                setTurnsDelayed(1);
            } else if (specialEffect === '💉') {
                // Skip next turn and no sleepy scale change
                setTurnsDelayed(1);
            }
        } else {
            // If there is no special effect, increase sleep
            setSleepyScale(value => value + 1);
        }
    }, [trigger]);

    useEffect(() => {
        if (specialSquares) {
            if (isStimulated) {
                setSpecialSquares(specialSquares.map(value => (value === '🎵') ? '⚡' : value));
            } else {
                setSpecialSquares(specialSquares.map(value => (value === '⚡') ? '🎵' : value));
            }
        }
    }, [isStimulated]);

    useEffect(() => {
        if (!isWon) {
            // Randomize map
            const valueDistribution = ['🥴', '🎵', '💉', undefined, undefined, undefined];
            setSpecialSquares(Array.from({ length: END_VALUE }, () => {
                const randomIndex = Math.floor(Math.random() * valueDistribution.length);
                return valueDistribution[randomIndex];
            }).map((x, i) => (i + 1 === 1 || i + 1 === END_VALUE) ? undefined : x));
            // Reset state
            setPlayerPosition(1);
            setDiceRoll(null);
            setSleepyScale(0);
            setTurnsDelayed(0);
        } else {
        }
    }, [isWon]);

    return (
        <Container fluid className="mt-1">
            <Row>
                <Col className='text-center font-monospace p-3'>
                    <h1>😴 You Snooze | You Lose 😭</h1>
                </Col>
            </Row>

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

                                        // Determine content
                                        var squareContent = ''
                                        if (squareNum === 1) {
                                            squareContent = '➡️';
                                        } else if (isSpecial) {
                                            squareContent = isSpecial;
                                        }

                                        // Determine style
                                        var bgcolor = 'inherit';
                                        var bdcolor = 'inherit';
                                        if (sleepyScale === 1 && squareNum <= -1) {
                                            bgcolor = GRAY200;
                                            bdcolor = GRAY300;
                                        } else if (sleepyScale === 2 && squareNum <= -1) {
                                            bgcolor = GRAY500;
                                            bdcolor = GRAY700;
                                        } else if (sleepyScale === 3 && squareNum <= -1) {
                                            bgcolor = GRAY700;
                                            bdcolor = GRAY900;
                                        } else if (sleepyScale === 4 && squareNum <= -1) {
                                            bgcolor = 'black';
                                            bdcolor = 'black';
                                        }

                                        // Determine player image
                                        var person = '';
                                        if (playerPosition === squareNum) {
                                            person = '🧍';
                                        }

                                        if (playerPosition === squareNum && sleepyScale >= MAX_SLEEP) {
                                            person = '🛌';
                                        }

                                        return (
                                            <Col
                                                key={col}
                                                className={`
                                                    square text-center p-2
                                                    ${(squareNum > 0 && sleepyScale < 4) && 'border'}
                                                `}
                                                style={{ backgroundColor: bgcolor, borderColor: bdcolor }}
                                            >
                                                {squareContent + person}
                                            </Col>
                                        );
                                    })}
                                </Row>
                            ))}
                        </div>
                    </Col>
                }

                {/* Right Panel */}
                <Col md={6} className="info-panel bg-light border p-2">
                    {(isWon) ? (
                        <div>
                            <p>{WIN_MSG}</p>
                            <p>You won in {numMoves} moves! You fell asleep {numSleeps} times.</p>
                            <p>Press P to play again.</p>
                        </div>
                    ) : (
                        <div>
                            <h4>Instructions</h4>
                            <p>{(diceRoll) ? 'You rolled: ' + diceRoll : 'Press SPACE to roll the dice.'}</p>
                        </div>
                    )}
                    {!isWon && (
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
                    )}
                </Col>
            </Row>

            <Row>
                {/* Title */}
                <Col md={12} className='text-center pt-5 font-monospace'>
                    {!isWon &&
                        <p>
                            Sleepy Scale: {Array.from({ length: MAX_SLEEP }).map((_, index) => index < sleepyScale ? '🔳' : '🔲')} |
                            Turns Delayed: {Array.from({ length: turnsDelayed }).fill('🚫')}
                        </p>
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default Board;