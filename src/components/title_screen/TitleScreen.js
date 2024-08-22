import './TitleScreen.css';
import '../../App.css';
import Typewriter from "../typewriter/Typewriter";
import MenuButton from "../menu_button/MenuButton";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

function TitleScreen() {
    const {t} = useTranslation();
    const navigate = useNavigate()

    let title = "GABRIEL HENRIQUE DE OLIVEIRA"
    let subtitle = t("title_screen_subtitle")
    return (
        <div className={"title-screen"}>
            <Typewriter text={title} speed={40} className={"title-screen-name"} delay={500}/>
            <Typewriter text={subtitle} speed={40} delay={500 + 40 * title.length} className={"subtitle"}/>
            <div className={"buttons"}>
                <MenuButton onClick={() => navigate("/about")} text={t("title_screen_about_me_button")}/>
                <MenuButton onClick={() => navigate("/projects")} text={t("title_screen_projects_button")}/>
                <MenuButton onClick={() => navigate("/work-experience")} text={t("title_screen_work_experience_button")}/>
                <MenuButton onClick={() => navigate("/settings")} text={t("title_screen_settings_button")}/>
            </div>
        </div>
    );
}

export default TitleScreen;
