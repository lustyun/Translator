import "./App.css";
import { useEffect, useState } from "react";
const APIKEY = import.meta.env.VITE_API_KEY;

function App() {
    const [text, setText] = useState("");
    const [targetLanguage, setTargetLanguage] = useState("ja");
    const [sourceLanguage, setSourceLanguage] = useState("en");
    const [languages, setLanguages] = useState([]);
    const [inputText, setInputText] = useState("");

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
                source_language: [sourceLanguage],
                target_language: [targetLanguage],
                text: [inputText],
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
            const result = await response.json();
            console.log(result);
            setLanguages(result.data.languages);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getLanguageApi();
    }, []);

    return (
        <div>
            <label>Enter Text:</label>
            <input
                type="text"
                id="text"
                placeholder="Enter your text here"
                value={inputText}
                onChange={(e) => {
                    console.log("onChange event triggered", e.target.value);
                    setInputText(e.target.value);
                }}
            />
            <button onClick={callApi}>Translate</button>
            <label>Source Language: </label>
            <select
                value={sourceLanguage}
                onChange={(e) => {
                    console.log("onChange event triggered", e.target.value);
                    setSourceLanguage(e.target.value);
                }}
                id="source-language">
                {languages.map((language, i) => (
                    <option key={i} value={language.code}>
                        {language.name}
                    </option>
                ))}
            </select>

            <label>Target Language: </label>
            <select
                value={targetLanguage}
                onChange={(e) => {
                    console.log("onChange event triggered", e.target.value);
                    setTargetLanguage(e.target.value);
                }}
                id="target-language">
                {languages.map((language, i) => (
                    <option key={i} value={language.code}>
                        {language.name}
                    </option>
                ))}
            </select>
            <h1>{text}</h1>
        </div>
    );
}

export default App;
