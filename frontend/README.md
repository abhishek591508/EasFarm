# Authentication App

A beautiful and simple React + Vite authentication application with login and signup functionality.

## Features

- ✨ Modern, responsive design with gradient backgrounds
- 🔄 Toggle between Login and Signup modes
- 📱 Mobile-friendly interface
- 🎨 Smooth animations and hover effects
- 🔒 Form validation (password confirmation for signup)
- 💫 Glassmorphism design with backdrop blur

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd auth-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit the URL shown in the terminal (usually `http://localhost:5173`)

## Usage

- **Login Mode**: Enter your email and password to sign in
- **Signup Mode**: Enter your full name, email, password, and confirm password to create an account
- Click the toggle button at the bottom to switch between login and signup modes
- Form data is logged to the console for demonstration purposes

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customization

The app is designed to be easily customizable:

- Modify colors and gradients in `src/App.css`
- Add your own authentication logic in the `handleSubmit` function in `src/App.jsx`
- Extend the form fields as needed for your use case

## Technologies Used

- React 19
- Vite
- CSS3 (with modern features like backdrop-filter and gradients)
- JavaScript ES6+
