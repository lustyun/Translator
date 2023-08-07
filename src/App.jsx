import "./App.css";

function App() {
    async function callApi() {
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
    }

    return <>
    
    </>;
}

export default App;
