# 🧩 Puzzle Master - Modern Responsive Puzzle Game

A beautifully designed, fully responsive sliding puzzle game built with React, Vite, and modern CSS. Features a premium UI/UX design with smooth animations, accessibility support, and comprehensive game statistics tracking.

## ✨ Features

### Core Gameplay
- **Multiple Grid Sizes**: 2x2, 3x3, 4x4, and 5x5 puzzle grids
- **Smooth Tile Movement**: Responsive tile interactions with visual feedback
- **Keyboard Support**: Arrow keys for intuitive puzzle solving
- **Win Detection**: Automatic puzzle completion detection with celebration modal
- **Move Counter**: Track total moves made per game
- **Timer**: Real-time game duration tracking
- **Difficulty Calculation**: Expert, Advanced, Challenging, and Completed ratings

### User Experience
- **Beautiful Gradient UI**: Modern purple gradient theme (667eea → 764ba2)
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Smooth Animations**: CSS animations for tiles, buttons, and modals
- **Dark Mode Support**: Automatic dark mode detection and styling
- **High Contrast Mode**: Enhanced contrast for accessibility
- **Reduced Motion Support**: Respects user's motion preferences
- **Touch Optimized**: Full touch support with haptic-friendly buttons

### Statistics & Tracking
- **Best Time Tracking**: Saves best completion time per grid size
- **Best Moves Tracking**: Records minimum moves needed per grid size
- **Win Streak**: Tracks consecutive puzzle completions
- **LocalStorage Integration**: All stats persist across sessions
- **Enhanced Game Context**: Comprehensive state management with game modes and difficulty levels

### Accessibility
- **ARIA Labels**: Proper accessibility labels for screen readers
- **Keyboard Navigation**: Full keyboard support with focus management
- **Focus Indicators**: Clear focus-visible states for keyboard users
- **Semantic HTML**: Proper heading hierarchy and semantic structure
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Font Sizing**: Responsive font scaling with clamp()

## 📁 Project Structure

```
puzzle-dashboard/
├── src/
│   ├── components/
│   │   ├── Puzzle/
│   │   │   ├── PuzzleGrid.jsx (620+ lines)
│   │   │   ├── PuzzleGrid.css (850+ lines)
│   │   │   ├── Tile.jsx (45 lines)
│   │   │   └── Tile.css (350+ lines)
│   │   └── UI/
│   │       ├── Button.jsx (35 lines)
│   │       └── Button.css (320+ lines)
│   ├── context/
│   │   └── GameContext.jsx (80+ lines)
│   ├── pages/
│   │   ├── Game.jsx (70+ lines)
│   │   └── Game.css (380+ lines)
│   ├── App.jsx (35 lines)
│   ├── App.css (250+ lines)
│   ├── main.jsx
│   └── index.css (610+ lines)
├── package.json
├── vite.config.js
└── index.html
```

## 🎯 Code Statistics

**Total Lines of Code: 2000+**

- **JavaScript/JSX**: ~800 lines
- **CSS**: ~1200+ lines
- **Comprehensive styling with responsive breakpoints**
- **Advanced animations and transitions**
- **Full accessibility compliance**

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd puzzle-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5174
```

### Build for Production

```bash
npm run build

# Preview production build
npm run preview
```

## 🎮 How to Play

1. **Select Grid Size**: Click the ⚙️ settings button to choose puzzle difficulty (2x2 to 5x5)
2. **Move Tiles**: 
   - Click on tiles adjacent to the empty space
   - Or use arrow keys for keyboard navigation
3. **Complete Puzzle**: Arrange all tiles in numerical order
4. **View Stats**: Check your moves, time, and difficulty rating
5. **Track Progress**: All statistics are saved to LocalStorage

## 🎨 Design Features

### Color Palette
- **Primary Gradient**: #667eea → #764ba2
- **Secondary Success**: #10b981
- **Danger Color**: #ef4444
- **Background**: Light mode white, Dark mode deep blue

### Responsive Breakpoints
- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: < 480px

### Typography
- **Font Family**: Inter, system-ui, -apple-system
- **Headings**: Font-weight 900 with letter-spacing
- **Responsive**: Using clamp() for fluid scaling

## 🔧 Technologies Used

- **React 18**: Component-based UI framework
- **Vite**: Next-generation build tool
- **Modern CSS3**: 
  - CSS Grid & Flexbox
  - CSS Custom Properties (CSS Variables)
  - CSS Animations & Transitions
  - Backdrop Filters
  - CSS Gradients
- **LocalStorage API**: Client-side data persistence
- **Context API**: State management

## ♿ Accessibility Compliance

- ✅ WCAG 2.1 AA Level Compliance
- ✅ Keyboard Navigation Support
- ✅ Screen Reader Friendly
- ✅ High Contrast Mode Support
- ✅ Reduced Motion Preferences Respected
- ✅ Touch-friendly Interface
- ✅ Proper ARIA Labels

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## 🎓 Learning Resources

### CSS Techniques Used
- **CSS Grid**: Multi-dimensional layouts
- **CSS Flexbox**: Flexible container layouts
- **CSS Variables**: Dynamic theming
- **Media Queries**: Responsive design
- **Backdrop Filters**: Glassmorphism effects
- **CSS Animations**: Smooth transitions

### React Patterns
- **Hooks**: useState, useEffect, useCallback, useContext
- **Context API**: Global state management
- **Custom Hooks**: Reusable logic
- **Component Composition**: Modular architecture

## 🔄 Game Logic

### Puzzle Solving Algorithm
- **Shuffling**: Fisher-Yates shuffle with solvability check
- **Solvability Check**: Validates puzzle is solvable before playing
- **Move Validation**: Ensures tiles are adjacent to empty space
- **Win Detection**: Checks if puzzle matches goal state

## 📊 Local Storage Schema

```javascript
{
  best_time_3: 45,      // Best time in seconds for 3x3
  best_moves_3: 25,     // Best moves for 3x3
  consecutive_wins: 5,  // Current win streak
  gameStats: {
    totalGames: 10,
    totalWins: 8,
    totalMoves: 200,
    totalTime: 450,
    averageTime: 56.25,
    bestTime: 42,
    bestMoves: 18
  }
}
```

## 🎯 Future Enhancements

- [ ] Sound effects and background music
- [ ] Multiplayer mode
- [ ] Daily challenges
- [ ] Leaderboard system
- [ ] More puzzle variations
- [ ] Image-based puzzles
- [ ] Hint system
- [ ] Undo/Redo functionality
- [ ] Social sharing
- [ ] PWA capabilities

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Credits

Designed and developed with ❤️ for puzzle enthusiasts and developers learning React and modern CSS.

## 📧 Support

For questions or issues, please refer to the project documentation or create an issue in the repository.

---

**Made with React, Vite, and CSS Magic** ✨
