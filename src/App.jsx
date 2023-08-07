import "./App.css";
import { useEffect, useState } from "react";
const APIKEY = import.meta.env.VITE_API_KEY;
let source = "en";
let target = "ja";
let inputValue = "Hello! What is your name?";

function App() {
    const [text, setText] = useState("");
    async function callApi() {
        const url = "https://text-translator2.p.rapidapi.com/translate";
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "X-RapidAPI-Key": APIKEY,
                "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
            },
            body: new URLSearchParams({
                source_language: [source],
                target_language: [target],
                text: [inputValue],
            }),
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setText(result.data.translatedText);
            console.log(result.data.translatedText);
        } catch (error) {
            console.error(error);
        }
    }
    async function getLanguageApi() {
        const url = "https://text-translator2.p.rapidapi.com/getLanguages";
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": APIKEY,
                "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
            },
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getLanguageApi();
    }, []);

    return (
        <div>
            <label for="text">Enter Text:</label>
            <input type="text" id="text" placeholder="Enter your text here" />
            <button onclick={callApi}>Translate</button>
            <label>Source Language: </label>
            <select id="source-language" />
            <label>Target Language: </label>
            <select id="target_language" />
            <h1>{text}</h1>
        </div>
    );
}

export default App;
