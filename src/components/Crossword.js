import { useEffect, useState } from 'react';

const Crossword = () => {
    const [dataList, setDataList] = useState([]);
    const [indexNum, setIndexNum] = useState(-1);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isDescribed, setIsDescribed] = useState(true);

    const [fill, setFill] = useState([]);
    const [userSolve, setUserSolve] = useState([]);
    const [paddedSolve, setPaddedSolve] = useState([]);
    const [isWordDisplayed, setIsWordDisplayed] = useState(false);
    const [isHardMode, setIsHardMode] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Try to get 1000 words from Crossword database
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
            const isModifier = e.getModifierState(e.key);

            // If key not tab, allow action to next word
            if (key === 'TAB') {
                e.preventDefault();
                setIsDescribed(!isDescribed);
            }

            // Retract description page on any key press and ignore key action
            if (isDescribed) {
                setIsDescribed(false);
            } else if (!isModifier && isWordDisplayed) {
                setIndexNum(num => (num + 1) % 1000);
                setIsWordDisplayed(false);
            } else if (key === 'BACKSPACE' || key === 'DELETE') {
                if (userSolve.length > 0) {
                    // Remove key from solve
                    setUserSolve(userSolve.slice(0, userSolve.length - 1));
                }
            } else if (/^[a-zA-Z]$/.test(key)) {
                // Add key to solve if solve if space is not full
                if (userSolve.length < fill.filter(x => x === '_').length) {
                    setUserSolve(solve => [...solve, key]);
                }
            } else if (key === ' ') {
                setIsHardMode(!isHardMode);
            } else if (key === 'ENTER') {
                if (!isDescribed) {
                    // Do not allow definition toggle on description page
                    setUserSolve(dataList[indexNum].word.split(''));
                    setFill(new Array(dataList[indexNum].length).fill('_'));
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

        const pickRandomIndices = (arr, pct) => {
            const maxIndices = Math.floor(arr.length * pct); // Pick a percent of the array indices
            const numToPick = Math.floor(Math.random() * (maxIndices + 1)); // Random 0 to maxIndices
            const indices = Array.from({ length: arr.length }, (_, i) => i); // Array of indices

            // Shuffle and slice to pick random subset
            for (let i = indices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [indices[i], indices[j]] = [indices[j], indices[i]];
            }

            return indices.slice(0, numToPick);
        };

        // Pick a few random indices from the answer to hide
        const indices = pickRandomIndices(dataList[indexNum].word.split(''), isHardMode ? 0.25 : 0.75);

        // Setup next word
        setFill(dataList[indexNum].word.split('').map((x, i) => indices.includes(i) ? x : '_'));
        setUserSolve([]);
        console.log(indexNum);
    }, [indexNum]);

    useEffect(() => {
        if (!isLoaded) return;

        const solve = [];

        var index = 0;
        fill.forEach(letter => {
            if (letter === '_' && index < userSolve.length) {
                solve.push(userSolve[index++]);
            } else {
                solve.push(letter);
            }
        });

        setPaddedSolve(solve);
    }, [userSolve, fill]);

    useEffect(() => {
        if (!isLoaded) return;

        if (JSON.stringify(paddedSolve) === JSON.stringify(dataList[indexNum].word.split(''))) {
            if (isWordDisplayed) {
                setIndexNum(num => (num + 1) % 1000);
                setIsWordDisplayed(false);
            } else {
                setIsWordDisplayed(true);
            }
        }
    }, [paddedSolve]);

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
                            <li className="list-unstyled">{'- [a-z] -----> enter letter'}</li>
                            <li className="list-unstyled">{'- [Delete] --> undo letter'}</li>
                            <li className="list-unstyled">{'- [Enter] ---> reveal answer'}</li>
                            <li className="list-unstyled">{'- [Space] ---> toggle hard mode'}</li>
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
                                <p className={'fs-5' + (!isWordDisplayed && 'text-muted')} style={{ color: isWordDisplayed && '#32a852' }}>
                                    {dataList[indexNum].clue}
                                </p>
                                <div className="display-3" style={{ color: isWordDisplayed && '#32a852' }}>
                                    {paddedSolve.join(' ')}
                                </div>
                                <br />
                                <div className="w-100"></div>
                                {isHardMode ? (
                                    <p className="text-muted pt-5 mt-5">(hard mode)</p>
                                ) : (
                                    <p className="text-muted pt-5 mt-5">(zen mode)</p>
                                )
                                }
                            </div>
                        ) : (
                            <div className="display-3">
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