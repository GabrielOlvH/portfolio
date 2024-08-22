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

    return (
        <Loader>
            <div className={"title-screen"} key={counter}>
                <Typewriter text={title} speed={40} className={"title-screen-name"}/>
                <div className={"settings"}>
                    <select onChange={(opt) => setLang(opt)} defaultValue={i18n.language}>
                        <option value={"en"}>English</option>
                        <option value={"pt"}>Português (Brasil)</option>
                    </select>
                    <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                        <p>{t("settings_load_animations")}</p>
                        <label htmlFor="my-toggle" className={"switch"}>
                            <input type="checkbox" id="my-toggle"
                                   onClick={() => toggleAnimations()}
                                   value={localStorage.getItem("load_anims") === "true"}/>
                            <span className="slider round"></span>
                        </label>


                    </div>

                    <MenuButton onClick={() => navigate("/")} text={t("back_to_title_screen")}/>
                </div>
            </div>
        </Loader>
    );
}

export default SettingsScreen;
