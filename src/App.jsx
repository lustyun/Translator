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
        <div className="container">
            <div className="language-selectors">
                <label className="language-label">Source Language:</label>
                <select
                    value={sourceLanguage}
                    onChange={(e) => setSourceLanguage(e.target.value)}
                    className="language-select">
                    {languages.map((language, i) => (
                        <option key={i} value={language.code}>
                            {language.name}
                        </option>
                    ))}
                </select>

                <label className="language-label">Target Language:</label>
                <select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    className="language-select">
                    {languages.map((language, i) => (
                        <option key={i} value={language.code}>
                            {language.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="input-container">
                <textarea
                    type="text"
                    id="text"
                    className="input-text"
                    placeholder="Enter your text here"
                    value={inputText} 
                    onChange={(e) => setInputText(e.target.value)}
                />
            </div>
                <button className="translate-button" onClick={callApi}>
                    Translate
                </button>
            <h3 className="translated-text">{text}</h3>
        </div>
    );
}

export default App;
