import { useEffect, useState } from 'react';

const Scrabble = () => {

    const [fill, setFill] = useState([]);
    const [rack, setRack] = useState([]);
    const [userSolve, setUserSolve] = useState([]);
    const [zippedFill, setZippedFill] = useState([]);

    const [dataList, setDataList] = useState([]);
    const [indexNum, setIndexNum] = useState(-1);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Try to get 1000 words from Scrabble dictionary
                const response = await fetch('https://alexwebserver.onrender.com/scrabble');
                const data = await response.json();

                setDataList(data);
                setIndexNum(num => num + 1);
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
                setUserSolve([...userSolve, key]);
                // Remove key from rack
                setRack(rack.filter((_val, ind) => ind !== rackIndex));
            }
        };

        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [userSolve, rack, fill]);

    useEffect(() => {
        if (!isLoaded) return;

        const getScramble = (arr) => {
            const len = arr.length;
            if (len < 1) return;

            // Get a random number of 'given' tiles between 0 and len-1
            // Log distribution function to prefer fewer given tiles
            // see: https://en.wikipedia.org/wiki/Logarithmic_distribution
            const p = 3 / 4 - 1 / len;
            const upper = 1 / p;
            const z = Math.random() * upper;
            const pgfz = Math.abs(Math.log(1 - p * z) / Math.log(1 - p));
            const numGivens = (pgfz > len - 1) ? len - 1 : Math.floor(pgfz);

            // Get an array representing which tiles are given
            const scrambleArray = Array(numGivens).fill('X');
            while (scrambleArray.length < len) scrambleArray.push('_');
            // Mix the array
            scrambleArray.sort((_x, _y) => Math.random() - 0.5);
            return scrambleArray;
        };

        const wordArray = dataList[indexNum].word.toUpperCase().split('');
        const scramble = getScramble(wordArray);

        const fill = [];
        const rack = [];
        scramble.forEach((val, index) => {
            if (val === 'X') {
                // Tile is given
                fill.push(wordArray[index]);
            } else {
                // Tile is not given
                fill.push('_');
                rack.push(wordArray[index]);
            }
        });
        rack.sort((_x, _y) => Math.random() - 0.5);

        setFill(fill);
        setRack(rack);
        setUserSolve([]);
    }, [indexNum]);

    // Update the value of zippedFill and check if it is a match
    useEffect(() => {
        if (!isLoaded) return;

        const arraysEqual = (arr, brr) => {
            // Check if the lengths are the same
            if (arr.length !== brr.length) {
                return false;
            }

            // Check if each element is the same
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] !== brr[i]) {
                    return false;
                }
            }

            // If all checks pass, the arrays are equal
            return true;
        };
        const zipFill = (arr, brr) => {
            // Replace '_' in arr with values in brr
            const fill = [];
            for (var inda = 0, indb = 0; inda < arr.length && indb < brr.length; inda++) {
                if (arr[inda] === '_') fill.push(brr[indb++]);
            }

            return (fill.length < arr.length) ? fill.concat(Array(arr.length - fill.length).fill('_')) : fill;
        };

        const zippedFill = zipFill(fill, userSolve);
        if (arraysEqual(zippedFill, dataList[indexNum].word.toUpperCase().split(''))) {
            setIndexNum(index => index + 1);
        } else {
            setZippedFill(zippedFill);
        }
    }, [fill, userSolve]);

    return (
        <div className="container mt-5">
            <div className="text-center my-5 py-5">
                {isLoaded ? (
                    <div>
                        <div className="display-2">
                            {zippedFill.join(' ')}
                        </div>
                        <br />
                        <div className="display-4">
                            {rack.join(' ')}
                        </div>
                        <div className="fs-5 pt-5">
                            {'index: ' + indexNum}
                        </div>
                        <div className="fs-5 pt-5">
                            {`datalist[${indexNum}]: '${dataList[indexNum].word}'`}
                        </div>
                        <div className="fs-5 pt-5">
                            {`userSolve: ${userSolve}`}
                        </div>
                    </div>
                ) : (
                    <div className="display-2">
                        Loading...
                    </div>
                )}
            </div>
        </div>
    );
};

export default Scrabble;