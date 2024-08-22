import './Loader.css';
import {useState} from "react";

function Loader({children}) {
    const [loaded, setLoaded] = useState((localStorage.getItem("load_anims") === "true"));
    if (!loaded) {
        const id = setTimeout(() => {
            setLoaded(true)
            clearInterval(id)
        }, 1200)
    }

    if (!loaded) {
        return (
            <div className={"loader-container-full"}>
                <div className={"loader"}></div>
            </div>)
    } else {
        return <>{children}</>;
    }
}

export default Loader;
