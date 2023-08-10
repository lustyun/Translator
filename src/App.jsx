import "./App.css";
import { useEffect, useState } from "react";
const APIKEY = import.meta.env.VITE_API_KEY;

function App() {
    const [text, setText] = useState("");
    const [targetLanguage, setTargetLanguage] = useState("ja");
    const [sourceLanguage, setSourceLanguage] = useState("en");
    const [languages, setLanguages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [detectedLang, setDetectedLang] = useState(null);

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
            detectLanguageApi();
            console.log(result.data.translatedText);
        } catch (error) {
            console.error(error);
        }
    }

    async function detectLanguageApi() {
        const url =
            "https://google-translate1.p.rapidapi.com/language/translate/v2/detect";
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "application/gzip",
                "X-RapidAPI-Key": APIKEY,
                "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
            },
            body: new URLSearchParams({
                q: inputText,
            }),
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            setDetectedLang(result.data.detections[0][0].language)
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
            console.log(result.data);
            setLanguages(result.data.languages);
        } catch (error) {
            console.error(error);
        }
    }

    function getLanguageNameByCode(code) {
        const language = languages.find(lang => lang.code === code);
        return language ? language.name : 'Language not found';
    }

    useEffect(() => {
        getLanguageApi();
    }, []);

    return (
        <div className="container">
            <h1 className="title">Translator</h1>

            <img
                className="banner"
                src="https://www.ccjk.com/wp-content/uploads/2012/04/The-Choice-of-Word-in-Translation.jpg"
                alt=""
            />
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
            {detectedLang && <h3>Detected source language: {getLanguageNameByCode(detectedLang)}</h3>}
            <h3 className="translated-text">{text}</h3>
            {text && (
                <button
                    className="translate-button copy"
                    onClick={() => navigator.clipboard.writeText(text)}>
                    Copy
                </button>
            )}
        </div>
    );
}

export default App;
