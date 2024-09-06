# Analytics Optimizer PoC

This project is a Proof of Concept (PoC) for optimizing the loading of third-party analytics and marketing scripts in a React application. It demonstrates how to lazy load scripts after the main content has been rendered, improving initial page load performance.

## Features

- React-based single-page application
- Lazy loading of third-party scripts (Google Analytics, Facebook Pixel, Snapchat Pixel, TensorFlow.js, Twitter Pixel)
- Simulated main content loading with a progress bar
- Script loading status indicators
- React Router for navigation
- Error Boundary for error handling

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/analytics-optimizer-poc.git
   cd analytics-optimizer-poc
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

1. Start the development server:
   ```
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`

### Building for Production

To create a production build:
