import "./App.css";
import { useEffect } from "react";

let source = "en";
let target = "ko";
let inputValue = "Hello! What is your name?";

function App() {
    async function callApi() {
        const url = "https://text-translator2.p.rapidapi.com/translate";
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "X-RapidAPI-Key":
                    "96afb637f6msh22e9497d049080ep10a52ajsna3c7e7fe064e",
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

            console.log(result.data.translatedText);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        callApi();
    }, []);

    return <></>;
}

export default App;
