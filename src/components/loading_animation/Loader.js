import './Loader.css';
import {useState} from "react";
import {useSettings} from "../Settings";

function Loader({children}) {
    const {settings} = useSettings();
    const [loaded, setLoaded] = useState(settings.skip_loading);
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
