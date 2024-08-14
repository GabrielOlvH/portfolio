import './App.css';
import TitleScreen from "./components/title_screen/TitleScreen";
import {useEffect, useState} from "react";
import ProjectsScreen from "./components/projects_screen/ProjectsScreen";
import Spline from "@splinetool/react-spline";
import AboutMeScreen from "./components/about_me/AboutMeScreen";
import './i18n';
import WorkExperienceScreen from "./components/work_experience_screen/WorkExperienceScreen";
import {HashRouter, Route, Routes} from "react-router-dom";
import SettingsScreen from "./components/settings/SettingsScreen";


function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}



const Screen = ({children}) => {
    const {width} = useWindowDimensions()
    return (
        <>
            <div className={"bg-filter"}>

            </div>

            {
                width < 600 ?
                    <Spline className={"bg-mobile"} scene="https://prod.spline.design/wNXY-LWgng2gMnYN/scene.splinecode" />
                    : <Spline className={"bg"} scene="https://prod.spline.design/VLjW643I6uFgRpaW/scene.splinecode"/>
            }

            {//<div style={{width:"100%",height:"100%",position:"absolute"}}></div>
                 }
            <div className={"base-screen"}>
                {children}
            </div>
        </>
    )
}

function App() {

    return (
        <Screen>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<TitleScreen/>}/>
                    <Route path="/about" element={<AboutMeScreen/>}/>
                    <Route path="/projects" element={<ProjectsScreen/>}/>
                    <Route path="/work-experience" element={<WorkExperienceScreen/>}/>
                    <Route path="/settings" element={<SettingsScreen/>}/>
                </Routes>
            </HashRouter>
        </Screen>
    );
}

export default App;
