import { useEffect, useState } from 'react';

const Anagram = () => {

    const [fill, setFill] = useState([]);
    const [rack, setRack] = useState([]);
    const [userSolve, setUserSolve] = useState([]);
    const [zippedSolve, setZippedSolve] = useState([]);
    const [zippedTrigger, setZippedTrigger] = useState([]);

    const [dataList, setDataList] = useState([]);
    const [indexNum, setIndexNum] = useState(-1);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);
    const [isDescribed, setIsDescribed] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Try to get 1000 words from Scrabble dictionary
                const response = await fetch('https://alexwebserver.onrender.com/anagram');
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

            // Retract description page on any key press
            setIsDescribed(false);

            if (key === 'BACKSPACE' || key === 'DELETE') {
                if (userSolve.length > 0) {
                    const rackLetter = userSolve[userSolve.length - 1];

                    // Remove key from solve
                    setUserSolve(userSolve.slice(0, userSolve.length - 1));
                    // Add letter back to rack
                    setRack([...rack, rackLetter]);
                }
            } else if (rack.includes(key)) {
                const rackIndex = rack.findIndex(letter => letter === key);

                // Add key to solve
                setUserSolve(solve => [...solve, key]);
                // Remove key from rack
                setRack(rack.filter((_val, ind) => ind !== rackIndex));
            } else if (key === ' ') {
                // Do not allow definition toggle on description page
                if (!isDescribed) setIsRevealed(!isRevealed);
            } else if (key === 'TAB') {
                e.preventDefault();
                setIsDescribed(!isDescribed);
            } else if (key === 'ENTER') {
                setIndexNum(num => (num + 1) % 1000);
                setIsDescribed(false);
            }
        };

        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    });

    useEffect(() => {
        if (!isLoaded) return;

        const wordArray = dataList[indexNum].word.toUpperCase().split('');
        const fill = Array(wordArray.length).fill('_');
        const rack = wordArray.reverse();
        rack.sort((_x, _y) => Math.random() - 0.5);

        setFill(fill);
        setRack(rack);
        setUserSolve([]);
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

        if (arraysEqual(userSolve, dataList[indexNum].word.split(''))) {
            setIndexNum(num => (num + 1) % 1000);
            setIsRevealed(false);
        }
    }, [userSolve]);

    return (
        <div>
            {isDescribed ? (
                <div className="container mt-5 font-monospace">
                    <div className="row align-items-center font-monospace">
                        <h1 className="fs-1">Anagram</h1>
                        <p className="pt-5">
                            In Scrabble, a "bingo" refers to when a player uses all seven of their tiles in a single turn,
                            earning 50 bonus points. Finding bingos are an essential part of Scrabble gameplay and can be
                            the difference between winning or losing a close match. This tool will help you recognize 6-,
                            7-, or 8-letter anagrams of valid Scrabble words. All words in the database are based on the
                            North American Scrabble dictionary.
                        </p>
                        <p>Controls:</p>
                        <ul>
                            <li className="list-unstyled">{'- [a-z] -----> enter letter'}</li>
                            <li className="list-unstyled">{'- [Delete] --> undo letter'}</li>
                            <li className="list-unstyled">{'- [Space] ---> shuffle rack'}</li>
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
                                    {(userSolve.length < fill.length) ? (
                                        userSolve.concat(Array(fill.length - userSolve.length).fill('_')).join(' ')
                                    ) : (
                                        userSolve.join(' ')
                                    )}
                                </div>
                                <br />
                                <div className="display-2">
                                    {rack.join(' ')}
                                </div>
                            </div>
                        ) : (
                            <div className="display-2">
                                Loading...
                            </div>
                        )}
                    </div>
                    {isRevealed && isLoaded ? (
                        <div>
                            <p>{dataList[indexNum].word}</p>
                            <p className="text-muted">{dataList[indexNum].definition}</p>
                        </div>
                    ) : (
                        <div className="w-100"></div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Anagram;