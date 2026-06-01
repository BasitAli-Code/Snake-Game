# 🐍 Retro Snake Game: Responsive JavaScript Showcase

A fully interactive, classic arcade Snake Game built from scratch using vanilla web technologies. This project serves as a key personal milestone, representing my first deep-dive into complex JavaScript logic, conditional game states, and dynamic browser event handling.

👉 **[Play the Game Live](https://basitali-code.github.io/Snake-Game)**

---

## 🎮 Key Features & Mechanics

*   **Intelligent Device Responsiveness:** Features an adaptive layout engine that dynamically detects user environments:
    *   **Desktop/Laptop:** Locks inputs to the standard keyboard arrow keys and hides redundant screen layouts.
    *   **Mobile/Tablet:** Automatically scales the view and injects retro on-screen directional touch buttons to allow seamless mobile gameplay.
*   **Grid-Based Physics & Motion:** Uses a coordinate tracking array to control the snake's structural growth and movement across an optimized grid matrix.
*   **Adjustable Difficulty Modes:** Features interactive game settings including **Easy** and **Hard** toggles. Switching to hard increases the core refresh interval speed of the game loop, demanding faster user reaction times.
*   **Audio Ecosystem:** Integrated background music and state-dependent audio toggles allowing players to seamlessly turn music on or off mid-session.

---

## 🛠️ Built With

*   **Logic Engine:** Vanilla JavaScript (ES6+)
*   **Structure:** HTML5 (Semantic elements)
*   **Styling:** CSS3 (Media queries & Flexible layouts)

---

## 🚀 What This Project Demonstrates

Building this game required moving past basic web rendering and implementing core software engineering principles:
1.  **The Game Loop:** Managing frame rendering speeds and state updates across varying difficulties.
2.  **State Architecture:** Managing the coordinates of the trailing tail array, collision algorithms (wall hits and self-bites), and random food coordinate generators.
3.  **Advanced User UX:** Swapping input methods on the fly based on device screens to optimize playability.
