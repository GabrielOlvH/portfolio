import './AboutMeScreen.css';
import Typewriter from "../typewriter/Typewriter";
import {useEffect, useRef, useState} from "react";
import MenuButton from "../menu_button/MenuButton";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const Card = ({ img, title, played, onClick}) => {
    return (<div className={"card"} onClick={onClick}>
        <div className={"card-header"}>
            <img src={img} alt={title}/>
            <p>{title}{played === undefined ? <></> : <span className={"played-time"}><br/>{played}</span>}</p>
        </div>


    </div>);
}

const Gallery = ({ children }) => {
    const [wheelPos, setWheelPos] = useState(0);
    const contentRef = useRef(null);
    const galleryRef = useRef(null);
    const scrollInterval = useRef(null);
    //console.log("rerender");
    const startScrolling = (direction) => {
        stopScrolling(); // Garante que qualquer rolagem anterior seja parada
        scrollInterval.current = setInterval(() => {
            setWheelPos(prevWheelPos => {
                const newWheelPos = prevWheelPos + direction;

                // Verifica se a nova posição está dentro dos limites
                if (newWheelPos < 0) return 0;
                if (newWheelPos > (contentRef.current?.offsetWidth - galleryRef.current?.offsetWidth)) {
                    return contentRef.current?.offsetWidth - galleryRef.current?.offsetWidth;
                }

                return newWheelPos;
            });
        }, 5);
    };

    const stopScrolling = () => {
        if (scrollInterval.current) {
            clearInterval(scrollInterval.current);
            scrollInterval.current = null;
        }
    };

    return (
        <div ref={galleryRef} className={"gallery"}>
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
                    disabled={wheelPos <= 0}
                    onMouseDown={() => startScrolling(-1)}
                    onMouseUp={stopScrolling}
                    onMouseLeave={stopScrolling}
                >{"<"}</button>
                <button className={"right-arrow"}
                        onMouseDown={() => startScrolling(1)}
                        onMouseUp={stopScrolling}
                        onMouseLeave={stopScrolling}
                        disabled={wheelPos >= (contentRef.current?.offsetWidth - galleryRef.current?.offsetWidth)}>{">"}</button>
            </div>
            <div ref={contentRef} style={{ left: `${-wheelPos}px` }} className={"gallery-content"}>
                {children}
            </div>
        </div>
    );
};


const GetListening = ( setListening ) => {
    const apiKey = process.env.REACT_APP_LAST_FM_API_KEY;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=gabrielolvh&api_key=${apiKey}&format=json`);
                console.log(response.json)
                const json = await response.json();

                setListening(
                    json["recenttracks"]["track"].slice(0, 11).map(obj => {
                        const title = obj["name"]
                        const artist = obj["artist"]["#text"]
                        const img = obj["image"][1]["#text"]
                        const album = obj["album"]["#text"]
                        const url = obj["url"]
                        return {
                            title: title,
                            artist: artist,
                            img: img,
                            album: album,
                            url: url
                        }
                    })
                )


            } catch (error) {
                console.error('Failed to request from Last.FM', error);
            }
        };

        fetchData();
    }, [apiKey, setListening]);
}
function AboutMeScreen() {
    const {t} = useTranslation();
    const navigate = useNavigate()

    const title = t("about_me_screen_title");
    const [loadedTime, setLoadTime] = useState(1);
    const a = setTimeout(() => {
        setLoadTime(0);
        clearInterval(a);
    }, 1200)

    const [listening, setListening] = useState([{
        title: "Loading",
        artist: "Loading"
    }])
    GetListening(setListening)
    console.log("aaaaaaa")

    return (
        <div className="aboutme-screen">
            <Typewriter text={title} speed={40} className="name" delay={500}/>

            <div className="aboutme">
                <div className={"about-me-header"}>
                    <img src={"profile.png"} className={"profile-pic"} alt={"profile-pic"}/>
                    <div>
                        <div style={{display: "flex", alignItems: "center", margin: "0", cursor: "pointer"}}
                             onClick={() => window.open(listening[0].url)}>

                            <p style={{paddingRight: "1rem"}}>{listening[0].title}<br/><span
                                className={"played-time"}>by {listening[0].artist}</span></p>
                            <img src={"equalizer.gif"} style={{mixBlendMode: "multiply", height: "42px", margin: "0"}}/>
                        </div>
                    </div>
                </div>
                <p>Recent Songs</p>
                <Gallery>
                    {
                        listening.slice(1).map(song => {
                            return <Card img={song.img} title={song.title} played={`by ${song.artist}`} onClick={() => window.open(song.url)}></Card>
                        })
                    }
                </Gallery>
                <p>Recently Played</p>
                <Gallery>
                    <Card img={"sheep.png"} title={"Dead By Daylight"} played={"1,500 hours"}></Card>
                    <Card img={"sheep.png"} title={"Pokemon TCG Live"} played={"??? hours"}></Card>
                    <Card img={"sheep.png"} title={"Minecraft"} played={"??? hours"}></Card>
                    <Card img={"sheep.png"} title={"Stardew Valley"} played={"??? hours"}></Card>
                    <Card img={"sheep.png"} title={"Outer Wilds"} played={"??? hours"}></Card>
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

