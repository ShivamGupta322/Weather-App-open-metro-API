# Open-Metro API Project

## Overview
The Open-Metro API Project is a web application designed to provide users with weather-related information. It includes features such as weather dashboards, recent searches, and graphical representations of weather data. The project is built using modern web development tools and frameworks.

## Features
- **Weather Dashboard**: Displays current weather information.
- **Recent Searches**: Keeps track of the user's recent weather searches.
- **Weather Graphs**: Visual representation of weather trends.
- **Weather Table**: Tabular display of weather data.

## Project Structure
The project is organized as follows:

```
eslint.config.js
index.html
package.json
postcss.config.js
tailwind.config.js
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
src/
  App.tsx
  index.css
  main.tsx
  vite-env.d.ts
  components/
    InputForm.tsx
    LoadingSpinner.tsx
    RecentSearches.tsx
    WeatherDashboard.tsx
    WeatherGraph.tsx
    WeatherTable.tsx
  services/
    api.ts
  types/
    weather.ts
  utils/
    dateFormatter.ts
```

## Technologies Used
- **React**: For building the user interface.
- **TypeScript**: For type-safe JavaScript development.
- **Vite**: For fast and efficient development and build processes.
- **Tailwind CSS**: For styling the application.
- **ESLint**: For maintaining code quality.

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd Open-Metro-API-Project
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Scripts
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run lint`: Runs ESLint to check for code quality issues.

## Folder Details
- **src/components**: Contains reusable React components like `InputForm`, `LoadingSpinner`, etc.
- **src/services**: Contains API-related logic.
- **src/types**: Contains TypeScript type definitions.
- **src/utils**: Contains utility functions like `dateFormatter`.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch.
4. Submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.