# Hangman Game

This project is a modern Hangman game built using HTML, CSS, and JavaScript.

## Game Description
The game randomly selects a secret English word that is between 5 and 10 letters long.
The player must guess the word one letter at a time.

- Correct guesses reveal the letter in the word
- Wrong guesses reduce the number of attempts
- The player has 6 attempts in total
- Each move has a 30-second time limit
- If the time runs out, the player loses and a new game starts automatically

## Game Rules
1. The player enters one letter at a time.
2. If the letter exists in the word, it is revealed.
3. If the letter does not exist, one attempt is lost.
4. The game ends when:
   - The player reveals the full word (Win)
   - The player runs out of attempts (Lose)
   - The timer reaches zero (Lose)

## Features
- Modern and responsive user interface
- SVG Hangman drawing with 6 stages
- Countdown timer (30 seconds per move)
- New Game button
- Display of used letters
- Automatic game reset after timeout

## How to Run the Game
Simply open the `index.html` file in any modern web browser.

## Technologies Used
- HTML
- CSS
- JavaScript
