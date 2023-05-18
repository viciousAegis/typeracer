import React, { Fragment } from "react";
import { useState } from "react";

const TextCard = ({ textToType, setWpm, setPercentComplete, started, setStarted }) => {
    const words = textToType.split(' ');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [isInputCorrect, setIsInputCorrect] = useState(true);
    const [startTime, setStartTime] = useState(0);
    const [startFlag, setStartFlag] = useState(false);
    const [finished, setFinished] = useState(false);

    const handleInputChange = (e) => {
        // if the input is empty, set the start time
        if (!startFlag && inputValue === '') {
            setStartTime(Date.now());
            setStartFlag(true);
            setStarted(true);
        }

        const value = e.target.value;

        if (e.nativeEvent.inputType === 'deleteContentBackward') {
            console.log('backspace');
            setInputValue((value));
            handleBackspace();
        } else {
            setInputValue(value);

            if (value.endsWith(' ')) {
                handleWordTyped();
            } else {
                handleCharacterTyped(value);
            }
        }
    };

    const handleBackspace = () => {
        // check if current value is a substring of the current word
        // if it is, then it's a valid backspace
        const currentWord = words[currentWordIndex];

        // get current value by removing the last character, as react doesn't update the value immediately
        const currentInputValue = inputValue.slice(0, inputValue.length - 1);

        console.log(currentWord, currentInputValue);

        if (currentInputValue === '') {
            console.log('empty');
            setIsInputCorrect(true);
        }

        if (currentWord.startsWith(currentInputValue)) {
            setIsInputCorrect(true);
        }
    };

    const handleWordTyped = () => {
        if (inputValue.trim() === words[currentWordIndex]) {
            setInputValue('');
            setCurrentWordIndex((prevIndex) => prevIndex + 1);
            setCurrentCharIndex(0);
            setIsInputCorrect(true);

            // calculate wpm
            const totalTimeInSeconds = (Date.now() - startTime) / 1000;
            const wordsTyped = currentWordIndex + 1;
            const wpm = Math.round((wordsTyped / totalTimeInSeconds) * 60);
            setWpm(wpm);

            // calculate percent complete rounded to nearest integer
            const percentComplete = Math.round(
                ((currentWordIndex + 1) / words.length) * 100
            );
            setPercentComplete(percentComplete);

            // check if finished
            if (currentWordIndex === words.length - 1) {
                setStarted(false);
                setFinished(true);
            }

        } else {
            setIsInputCorrect(false);
        }
    };

    const handleCharacterTyped = (value) => {
        if (value === words[currentWordIndex].slice(0, currentCharIndex + 1)) {
            setCurrentCharIndex((prevIndex) => prevIndex + 1);
            setIsInputCorrect(true);
        } else {
            setIsInputCorrect(false);
        }
    };

    const renderWords = () => {
        return words.map((word, index) => {
            const isCurrentWord = index === currentWordIndex;
            let wordClass = isCurrentWord ? 'current-word' : '';

            // for words that have been typed, render them with grey text color
            if (index < currentWordIndex) {
                wordClass += ' typed-word';
            }

            return (
                <Fragment key={index}>
                    <span className={wordClass}>
                        {renderWordContent(word, index)}
                    </span>
                    {index !== words.length - 1 && ' '}
                </Fragment>
            );
        });
    };

    const renderWordContent = (word, index) => {
        const isCurrentWord = index === currentWordIndex;

        // console.log(word, currentCharIndex);

        if (isCurrentWord) {
            return (
                <>
                    <span className="highlighted-word">{word.slice(0, currentCharIndex)}</span>
                    <span className="current-char">{word[currentCharIndex]}</span>
                    <span>{word.slice(currentCharIndex + 1)}</span>
                </>
            );
        }

        return word;
    };

    return (
        <div className="text-card">
            {finished ?
                <div className="text-container">
                    <h2>Finished!</h2>
                </div>
                :
                <div className="text-container">{renderWords()}</div>}
            <input
                placeholder={!started ? 'Start typing...' : ''}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className={isInputCorrect ? 'type-input' : 'type-input wrong-input'}
                disabled={finished}
            />
        </div>
    );
};

export default TextCard;