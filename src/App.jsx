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

    useEffect(() => {
        callApi();
    }, []); 

    return (
        <>
            <h1>{text}</h1>
        </>
    );
}

export default App;
