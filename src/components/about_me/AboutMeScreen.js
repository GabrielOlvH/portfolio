import './AboutMeScreen.css';
import Typewriter from "../typewriter/Typewriter";
import {useState} from "react";
import MenuButton from "../menu_button/MenuButton";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

function AboutMeScreen() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate()

    const title = t("about_me_screen_title");
    const [loadedTime, setLoadTime] = useState(1200);
    setTimeout(() => {
        setLoadTime(loadedTime - 1);
    }, 1)
    return (
        <div className="aboutme-screen">
            <Typewriter text={title} speed={40} className="name" delay={500}/>

            <div className="aboutme">
                <p>a nao sei o que la</p>
                <MenuButton onClick={() => navigate("/")} text={t("back_to_title_screen")}/>
            </div>
            {
                loadedTime > 0 ?
                    <div className={"loader-container-full"}>
                        <div className={"loader"}></div>
                    </div>
                    : <></>
            }

        </div>
    );
}

export default AboutMeScreen;

