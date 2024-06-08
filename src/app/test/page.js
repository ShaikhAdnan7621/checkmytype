"use client";
import React, { useState, useEffect } from "react";

export default function Page() {
    const allEmojis = [
        "🍎",
        "🍌",
        "🍒",
        "🍇",
        "🍓",
        "🍉",
        "🍍",
        "🥭",
        "🐶",
        "🐱",
        "🦊",
        "🐼",
        "🐻",
        "🦁",
        "🐺",
        "🐇",
        "⚽",
        "🏀",
        "🏈",
        "🎾",
        "⚾",
        "🏐",
        "🏓",
        "🏏",
        "🏠",
        "🌳",
        "🌞",
        "⭐",
        "🌈",
        "🌊",
        "🚀",
        "✈️",
        "🚗",
        "🚲",
        "🚂",
        "🚁",
        "🚀",
        "🛸",
        "🍔",
        "🍕",
        "🌮",
        "🍦",
        "🍩",
        "☕",
        "🍷",
        "🍺",
        "🎉",
        "🎊",
        "🎈",
        "🎁",
        "🎄",
        "🎅",
        "👻",
        "🎃",
        "😈",
        "👿",
        "👽",
    ];

    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        // Randomly select 8 unique emojis for the game
        const shuffledEmojis = shuffle(allEmojis);
        const gameEmojis = shuffledEmojis.slice(0, 8);

        // Create pairs and shuffle them
        const pairs = gameEmojis.concat(gameEmojis);
        const shuffledPairs = shuffle(pairs);

        // Initialize cards with random emojis
        setCards(
            shuffledPairs.map((emoji, index) => ({
                id: index,
                emoji,
                flipped: false,
                matched: false,
            }))
        );
    }, []);

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleCardClick = (index) => {
        if (gameStarted && !cards[index].matched) {
            if (flippedCards.length < 2) {
                setCards((prevCards) => {
                    const newCards = [...prevCards];
                    newCards[index].flipped = true;
                    setFlippedCards([...flippedCards, index]);
                    return newCards;
                });
            }

            if (flippedCards.length === 2) {
                const [card1Index, card2Index] = flippedCards;
                const card1 = cards[card1Index];
                const card2 = cards[card2Index];

                if (card1.emoji === card2.emoji) {
                    setCards((prevCards) => {
                        const newCards = [...prevCards];
                        newCards[card1Index].matched = true;
                        newCards[card2Index].matched = true;
                        setMatchedCards([
                            ...matchedCards,
                            card1Index,
                            card2Index,
                        ]);
                        return newCards;
                    });
                } else {
                    setTimeout(() => {
                        setCards((prevCards) => {
                            const newCards = [...prevCards];
                            newCards[card1Index].flipped = false;
                            newCards[card2Index].flipped = false;
                            return newCards;
                        });
                        setFlippedCards([]);
                    }, 200);
                }
            }
        }
    };

    const handleStartGame = () => {
        setGameStarted(true);
    };

    return (
        <div>
            
        </div>
    );
}
