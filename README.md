🎮 Assembly endgame

A fun and interactive game built with React, where you guess a hidden programming-related word before you run out of time or attempts. Each wrong guess “eliminates” a programming language — once they’re gone, the Assembly is only left and the game is over 💀

🚀 Live Demo

👉 https://progassembly-endgame.netlify.app

🛠️ Built With

React (hooks & functional components)

JavaScript (ES6+)

CSS (mobile-first, responsive design)

clsx – conditional class handling

Custom React Hooks

react-confetti 🎉

🎯 Features
⏱️ 60-second countdown timer
⌨️ On-screen keyboard
🧠 Hidden word guessing logic
❌ Wrong guess tracking
💀 Languages eliminated one by one
💬 Random farewell messages
🏆 Win & lose states
🔄 Restart game functionality
📱 Mobile-friendly UI
♿ Accessibility support (ARIA live regions)

🕹️ How to Play

Click Start to begin the game
Guess letters using the on-screen keyboard
Each wrong guess removes one programming language
Guess the full word before:
Time runs out ⏱️
All languages are eliminated 💀
Win the game and celebrate 🎉 or try again!

🧩 Game Logic Overview

The word is randomly selected from a predefined list
Correct guesses reveal letters in the word
Wrong guesses:
Increase the wrong guess count
Remove a language
Trigger a farewell message
The game ends when:
All letters are guessed (WIN)
No attempts remain OR time reaches 0 (LOSS)

🔧 Custom Hook: useCountDownTimer

The timer logic is extracted into a reusable custom hook:

const {
timeRemaining,
isTimerActive,
startTimer,
stopTimer,
resetTimer
} = useCountDownTimer(60);

This keeps the main component clean and easier to maintain.

📦 Installation & Setup

# Clone the repository

git clone https://github.com/ibogoeska/assembly-endgame.git

# Install dependencies

npm install

# Start the development server

npm run dev

🌱 Future Improvements

🔊 Sound effects

🌗 Light/Dark mode toggle

🏆 High score tracking

📄 License

This project is open source and available under the MIT License.
