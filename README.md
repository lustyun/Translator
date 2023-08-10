## Translation App

This is a translation app built using React that allows you to translate text between different languages. It interacts with the RapidAPI platform for translation and language detection services.

### Technologies Used

- **React:** The app is built using React, a popular JavaScript library for building user interfaces.
- **useState:** The `useState` hook is used for managing component state.
- **useEffect:** The `useEffect` hook is used for handling side effects such as data fetching.
- **Fetch API:** The Fetch API is used to make network requests to external APIs.
- **RapidAPI:** The app interacts with the RapidAPI platform to access translation and language detection services.
- **Speech Synthesis API:** The app uses the Speech Synthesis API to convert translated text into speech.

### Approach

1. The main component is named `App`. It handles translation, language selection, and text input/output.
2. `useState` is used to manage states like `text`, `targetLanguage`, `sourceLanguage`, etc.
3. The `callApi` function sends a POST request to the translation API using the `fetch` function.
4. The `detectLanguageApi` function determines the source language of the input text using a language detection API.
5. The `getLanguageApi` function fetches the list of supported languages from the API.
6. The UI includes dropdowns for language selection, text input, translate button, detected language display, translated text, and a copy button.
7. The `getLanguageNameByCode` function maps language codes to their names.
8. The `useEffect` hook fetches the list of supported languages when the component mounts.

### Installation

1. Make sure you have Node.js and npm installed on your system.
2. Clone the project repository or create a new project folder.
3. Navigate to the project folder in your terminal.
4. Run `npm install` to install the project dependencies.
5. Replace `import.meta.env.VITE_API_KEY` with your actual API key.
6. Run `npm start` to start the development server.
7. Open your web browser and navigate to `http://localhost:3000` to see the app.

### Unsolved Problems

1. The security of the API key stored in `APIKEY` should be ensured.
2. More robust error handling could be implemented for API requests.
3. Consider potential CORS issues when making API requests.
