import React, { useState } from "react";

function Speak({ text, targetLang }) {
    const [speaking, setSpeaking] = useState(false);

    function getTwoLetterLanguageCode(languageTag) {
        const parts = languageTag.split("-");
        if (parts.length > 0) {
            return parts[0];
        }
        return languageTag;
    }

    const handleSpeak = () => {
        if (!speaking && text) {
            const utterance = new SpeechSynthesisUtterance(text);
            let voices = window.speechSynthesis
                .getVoices()
                .filter(
                    (voice) =>
                        getTwoLetterLanguageCode(voice.lang) === targetLang
                );
            utterance.voice = voices[0];
            speechSynthesis.speak(utterance);
            setSpeaking(true);

            utterance.onend = () => {
                setSpeaking(false);
            };
        }
    };

    return (
        text && (
            <div className="App">
                <button
                    className="translate-button speak"
                    onClick={handleSpeak}
                    disabled={speaking}>
                    {speaking ? "Speaking..." : "Speak"}
                </button>
            </div>
        )
    );
}

export default Speak;
