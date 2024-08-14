import './AboutMeScreen.css';
import Typewriter from "../typewriter/Typewriter";
import {useCallback, useRef, useState} from "react";
import MenuButton from "../menu_button/MenuButton";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const Card = ({ img, title, played }) => {
    return (<div className={"card"}>
        <div className={"card-header"}>
            <img src={img}/>
            <p>{title}</p>
        </div>
        {played === undefined ? <></> : <p className={"played-time"}>{played}</p>}

    </div>);
}

const Gallery = ({children}) => {
    const [wheelPos, setWheelPos] = useState(0)

    const contentRef = useRef(null);
    const galleryRef = useRef(null);

    const [gallerySpeed, setGallerySpeed] = useState(0)

    setTimeout(() => {
        if (wheelPos < 0 && gallerySpeed < 0) return;
        if (gallerySpeed > 0 && wheelPos > (contentRef.current?.offsetWidth - galleryRef.current?.offsetWidth)) return;
        setWheelPos(wheelPos + gallerySpeed)
    }, 20, [gallerySpeed])


    return <div ref={galleryRef} className={"gallery"}>
        <div style={{
            display: "flex",
            position: "fixed",
            width: galleryRef.current?.offsetWidth,
            justifyContent: "space-between",
            zIndex: "10",
            pointerEvents: "none"
        }}>
            <button
                className={"left-arrow"}
                disabled={wheelPos < 0}
                onMouseDown={() => setGallerySpeed(-2)}
                onMouseUp={() => setGallerySpeed(0)}
            >{"<"}</button>
            <button className={"right-arrow"}
                    onMouseDown={() => setGallerySpeed(2)}
                    onMouseUp={() => setGallerySpeed(0)}
                    disabled={wheelPos > (contentRef.current?.offsetWidth - galleryRef.current?.offsetWidth)}>{">"}</button>
        </div>
        <div ref={contentRef} style={{left: `${-wheelPos}px`}} className={"gallery-content"}>
            {children}
        </div>

    </div>
}

function AboutMeScreen() {
    const {t, i18n} = useTranslation();
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
                <div className={"about-me-header"}>
                    <img src={"profile.png"} className={"profile-pic"}/>
                    <div>
                        <p>Listening: </p>
                        <p>Playing: </p>
                    </div>
                </div>
                <p>Favorite Games</p>
                <Gallery>
                    <Card img={"sheep.png"} title={"Dead By Daylight"} played={"1,500 hours"}></Card>
                    <Card img={"sheep.png"} title={"Pokemon TCG Live"} played={"??? hours"}></Card>
                    <Card img={"sheep.png"} title={"Minecraft"} played={"??? hours"}></Card>
                    <Card img={"sheep.png"} title={"Stardew Valley"} played={"??? hours"}></Card>
                </Gallery>
                <p>Favorite Songs</p>
                <Gallery>
                    <Card img={"sheep.png"} title={"The Ballad of Costa Concordia"} played={"Car Seat Headrest"}></Card>
                    <Card img={"sheep.png"} title={"Cute Thing"} played={"Car Seat Headrest"}></Card>
                    <Card img={"sheep.png"} title={"Cute Thing"} played={"Car Seat Headrest"}></Card>
                </Gallery>
            </div>
            <MenuButton onClick={() => navigate("/")} text={t("back_to_title_screen")}/>
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

