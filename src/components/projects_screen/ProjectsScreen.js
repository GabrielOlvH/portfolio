import './ProjectsScreen.css';
import Typewriter from "../typewriter/Typewriter";
import {useState} from "react";
import MenuButton from "../menu_button/MenuButton";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import Loader from "../loading_animation/Loader";


const projects = [
    {
        id: "industrial_revolution",
        img: "https://cdn.modrinth.com/data/kFs9AeXi/66b4c37413001232e53bdee818438939fa554d25.png"
    },
    {
        id: "multiple_minecraft_mods",
        img: "https://cdn.modrinth.com/data/kFs9AeXi/66b4c37413001232e53bdee818438939fa554d25.png"
    },
    {
        id: "pokemon_tcg_replay",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzrbpVsH4HTaM3W_3tYrCq1hTikwdmGRj2eHHsLDJ0rH6HCA3dKpD6q1H-JGWIBsmXKak&usqp=CAU"
    },
    {
        id: "cafeteria_development_website",
        img: "https://cafeteria.dev/img/logo.svg"
    },
    {
        id: "simple_text_editor",
        img: "sheep.png"
    }
];

const Project = ({i, title, desc, img, select, selected}) => {
    return (
        <div className={selected === i ? "project selected" : "project"} onClick={() => select(i)}>
            <img alt={title} src={img}/>
            <div className={"project-info"}>
                <h1>{title}</h1>
                <p>{desc}</p>
            </div>
        </div>
    )
}

function ProjectsScreen() {
    const {t} = useTranslation();
    const navigate = useNavigate()

    const title = t("projects_screen_title")
    const [selected, setSelected] = useState(-1);

    return (
        <Loader>
            <div className="projects-screen">
                <Typewriter text={title} speed={40} className="name" delay={500}/>

                <div className="projects">
                    <div className={"projects-list"}>
                        {projects.map((project, index) => (
                            <Project
                                key={index}
                                i={index}
                                title={t(`projects_${project.id}_title`)}
                                desc={t(`projects_${project.id}_desc`)}
                                img={project.img}
                                select={setSelected}
                                selected={selected}
                            />
                        ))}
                    </div>

                    <div className={"button-list1"}>
                        <MenuButton onClick={() => navigate("/")} text={t("back_to_title_screen")}/>
                        <MenuButton disabled={selected === -1} text={t("project_screen_select")}/>
                    </div>
                </div>
            </div>
        </Loader>
    );
}

export default ProjectsScreen;

