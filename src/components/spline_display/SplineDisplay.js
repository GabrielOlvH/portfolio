import './SplineDisplay.css';
import Spline from "@splinetool/react-spline";
import {useState} from "react";


function SplineDisplay() {
    const [hover, setHover] = useState("none");
    return (
        <div className={"spline"}>
            <Spline scene={"https://prod.spline.design/zd0rDcOAUDRspTW0/scene.splinecode"} onMouseHover={(e) => setHover(e.target.name)}/>

            <div className={"info"}>
                <h2>{hover}</h2>
                <hr/>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.</p>
            </div>
        </div>
    );
}

export default SplineDisplay;
