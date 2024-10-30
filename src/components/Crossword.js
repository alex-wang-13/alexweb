import { useEffect, useState } from 'react';

const Crossword = () => {

    const [fill, setFill] = useState([]);
    const [userSolve, setUserSolve] = useState([]);
    const [zippedSolve, setZippedSolve] = useState([]);
    const [zippedTrigger, setZippedTrigger] = useState(false);

    const [dataList, setDataList] = useState([]);
    const [indexNum, setIndexNum] = useState(-1);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isDescribed, setIsDescribed] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Try to get 1000 words from Scrabble dictionary
                const response = await fetch('https://alexwebserver.onrender.com/crossword');
                const data = await response.json();

                setDataList(data);
                setIndexNum(num => (num + 1) % 1000);
                setIsLoaded(true);
            } catch (error) {
                console.log('Could not fetch word list', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        const handleKeydown = (e) => {
            const key = e.key.toUpperCase();

            // Remove description on key press
            setIsDescribed(false);

            if (key === 'BACKSPACE' || key === 'DELETE') {
                if (userSolve.length > 0) {
                    // Remove key from solve
                    setUserSolve(userSolve.slice(0, userSolve.length - 1));
                }
            } else if (/^[a-zA-Z0-9]$/.test(key)) {
                // Add key to solve
                if (userSolve.length < fill.length) {
                    setUserSolve(solve => [...solve, key]);
                }
            } else if (key === ' ' && !isDescribed) {
                if (fill.find(x => x === '_')) {
                    // Add a random letter to the fill
                    do {
                        var index = Math.floor(Math.random() * (fill.length));
                    } while (fill[index] !== '_');
                    // Update the fill with a revealed letter
                    setFill([
                        ...fill.slice(0, index),
                        dataList[indexNum].word[index],
                        ...fill.slice(index + 1)
                    ]);
                    // Force update of zippedSolve
                    setZippedTrigger(!zippedTrigger);
                } else {
                    setIndexNum(num => (num + 1) % 1000);
                    setIsDescribed(false);
                }
            } else if (key === 'TAB') {
                e.preventDefault();
                setIsDescribed(!isDescribed);
            } else if (key === 'ENTER') {
                if (fill.find(x => x === '_')) {
                    setFill(dataList[indexNum].word.split(''));
                } else {
                    setIndexNum(num => (num + 1) % 1000);
                    setIsDescribed(false);
                }
            }
        };

        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    });

    useEffect(() => {
        if (!isLoaded) return;

        const data = dataList[indexNum];
        if (data.clue.includes('Across') || data.clue.includes('Down')) {
            // Skip referential clues
            setIndexNum(num => num + 1);
        } else {
            // Update fill
            setFill(Array(data.length).fill('_'));
            // Reset solve when indexNum increments
            setZippedSolve([]);
            setUserSolve([]);
        }
    }, [indexNum]);

    useEffect(() => {
        if (!isLoaded) return;

        const arraysEqual = (arr, brr) => {
            if (arr.length !== brr.length) return false;

            // Check if each element is the same
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] !== brr[i]) return false;
            }
            return true;
        };

        // Get the current state
        var index = 0;
        const solve = fill.map(letter => {
            if (letter === '_' && index < userSolve.length) {
                return userSolve[index++];
            } else {
                return letter;
            }
        });
        setZippedSolve(solve);

        if (arraysEqual(solve, dataList[indexNum].word.split(''))) {
            setIndexNum(num => (num + 1) % 1000);
        }
    }, [userSolve, zippedTrigger]);

    return (
        <div>
            {isDescribed ? (
                <div className="container mt-5 font-monospace">
                    <div className="row align-items-center font-monospace">
                        <h1 className="fs-1">Crossword</h1>
                        <p className="pt-5">
                            Solving the New York Times Crossword may seem overwhelming at first, and even experienced solvers
                            are sometimes stumped by the trickier clues. For beginners, it's common to struggle with filling
                            in clues on even the easier puzzles, but the beauty of crossword solving lies in its learnability.
                            With practice, anyone can become good at recognizing patterns or wordplay. The key to improvement
                            is learning common trivia, wordplay, and crossword meta. Clues are pulled from an NYTXW database.
                        </p>
                        <p>Controls:</p>
                        <ul>
                            <li className="list-unstyled">{'- [a-zA-Z] --> enter letter'}</li>
                            <li className="list-unstyled">{'- [Delete] --> undo letter'}</li>
                            <li className="list-unstyled">{'- [Space] ---> reveal letter/answer'}</li>
                            <li className="list-unstyled">{'- [Enter] ---> reveal answer'}</li>
                            <li className="list-unstyled">{'- [Tab] -----> bring this page back'}</li>
                        </ul>
                        <p>
                            Press any key to begin.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="container mt-5">
                    <div className="text-center my-5 py-5 font-monospace">
                        {isLoaded ? (
                            <div>
                                <div className="display-2">
                                    {zippedSolve.join(' ')}
                                </div>
                                <br />
                                <div className="w-100"></div>
                                <p className="text-muted">{'clue: ' + dataList[indexNum].clue}</p>
                            </div>
                        ) : (
                            <div className="display-2">
                                Loading...
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Crossword;