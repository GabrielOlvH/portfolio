import './Typewriter.css';
import {useMemo, useState} from "react";

function Typewriter({text, speed, delay, ...props}) {
    let i = -1;
    const [delayEnded, setDelayEnded] = useState(false);
    const [display, setDisplay] = useState("");
    useMemo(() => {
        let c = "";

        setTimeout(() => {
            setDelayEnded(true);
            const typingInterval = setInterval(() => {
                if (i < text.length) {
                    i++;
                    setDisplay(prev => prev + text.charAt(i));
                } else {
                    setDelayEnded(false);
                    clearInterval(typingInterval);
                }
            }, speed);
        }, delay);

        return c;
    }, [text, speed, delay, i])

    return (
        <p className={"typewriter-text"} {...props}>{display}
            <span className={delayEnded ? "" : display.length >= text.length ? "hidden" : "blinking"}>|</span>
        </p>
    );
}

export default Typewriter;
