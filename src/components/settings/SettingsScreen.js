import './SettingsScreen.css';
import '../../App.css';
import Typewriter from "../typewriter/Typewriter";
import MenuButton from "../menu_button/MenuButton";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Loader from "../loading_animation/Loader";

function SettingsScreen() {
    const {t, i18n} = useTranslation();
    const navigate = useNavigate()

    const [counter, setCounter] = useState(0)

    let title = t("settings_screen_title")

    const setLang = (opt) => {
        console.log(opt.target.value)
        i18n.changeLanguage(opt.target.value)
        setCounter(counter + 1)

    }


    const toggleAnimations = () => {
        let enabled = localStorage.getItem("load_anims") === "true"
        localStorage.setItem("load_anims", (!enabled).toString())
    }

    const setTypewriterSpeed = (speed) => {
        localStorage.setItem("typewriter", speed.target.value)
    }

    return (
        <Loader>
            <div className={"title-screen"} key={counter}>
                <Typewriter text={title} speed={40} className={"title-screen-name"}/>
                <div className={"settings"}>
                    <div className={"settings-opt"}>
                        <p>{t("settings_language")}</p>
                        <select onChange={(opt) => setLang(opt)} defaultValue={i18n.language}>
                            <option value={"en"}>English</option>
                            <option value={"pt"}>Português (Brasil)</option>
                        </select>
                    </div>

                    <div className={"settings-opt"}>
                        <p>{t("typewriter_speed")}</p>
                        <select onChange={(opt) => setTypewriterSpeed(opt)} defaultValue={localStorage.getItem("typewriter")}>
                            <option value={"5"}>Slower</option>
                            <option value={"1"}>Normal</option>
                            <option value={"0.5"}>Fast</option>
                            <option value={"0"}>Disabled</option>
                        </select>
                    </div>

                    <div className={"settings-opt"}>
                        <p>{t("settings_load_animations")}</p>
                        <label htmlFor="my-toggle" className={"switch"}>
                            <input type="checkbox" id="my-toggle"
                                   onClick={() => toggleAnimations()}
                                   value={localStorage.getItem("load_anims") === "true"}/>
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
                <MenuButton onClick={() => navigate("/")} text={t("back_to_title_screen")}/>
            </div>
        </Loader>
    );
}

export default SettingsScreen;
