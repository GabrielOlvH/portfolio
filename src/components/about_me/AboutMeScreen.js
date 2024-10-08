import './AboutMeScreen.css';
import Typewriter from "../typewriter/Typewriter";
import {useEffect, useRef, useState} from "react";
import MenuButton from "../menu_button/MenuButton";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import Loader from "../loading_animation/Loader";
import {useWindowDimensions} from "../../App";

const API_URL = "https://gabrielolv.dev/api"

const Card = ({ img, title, played, onClick, children}) => {
    return (<div className={"card"} onClick={onClick}>
        <div className={"card-header"}>
            <img src={img} alt={title}/>
            <p>{title}{played === undefined ? <></> : <span className={"played-time"}><br/>{played}</span>}</p>
            {children}
        </div>


    </div>);
}

const Gallery = ({ children }) => {
    const [wheelPos, setWheelPos] = useState(0);
    const {width} = useWindowDimensions()
    const contentRef = useRef(null);
    const galleryRef = useRef(null);
    const scrollInterval = useRef(null);

    const startScrolling = (direction) => {
        stopScrolling(); // Garante que qualquer rolagem anterior seja parada

        if (width < 600) {
            setWheelPos(wheelPos + 100);
            return;
        }
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

            return () => {
                clearTimeout(scrollInterval.current)
            }
        }, 5);
    };




    const stopScrolling = () => {

        if (scrollInterval.current) {
            console.log("stop")
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
                    onMouseDown={() => startScrolling(-2)}
                    onMouseUp={() => stopScrolling()}
                    onMouseLeave={() => stopScrolling()}
                >{"<"}</button>
                <button className={"right-arrow"}
                        onMouseDown={() => startScrolling(2)}
                        onMouseUp={() => stopScrolling()}
                        onMouseLeave={() => stopScrolling()}
                        disabled={wheelPos >= (contentRef.current?.offsetWidth - galleryRef.current?.offsetWidth)}>{">"}</button>
            </div>
            <div ref={contentRef} style={{ left: `${-wheelPos}px` }} className={"gallery-content"} key={wheelPos}>
                {children}
            </div>
        </div>
    );
};


const GetListening = ( setListening ) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch( `${API_URL}/recentsongs`);

                const json = await response.json();
                setListening(
                    json["recenttracks"]["track"].slice(0, 10).map(obj => {
                        const title = obj["name"]
                        const artist = obj["artist"]["#text"]
                        const img = obj["image"][1]["#text"]
                        const album = obj["album"]["#text"]
                        const url = obj["url"]
                        const playing = obj["@attr"] !== undefined && obj["@attr"]["nowplaying"] === "true"


                        return {
                            title: title,
                            artist: artist,
                            img: img,
                            album: album,
                            url: url,
                            playing: playing
                        }
                    })
                )


            } catch (error) {
                console.error('Failed to request from Last.FM', error);
            }
        };

        fetchData();
    }, [setListening]);
}

const GetPlaying = (setPlaying) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/recentlyplayed`);
                console.log(response.json)
                const json = await response.json();

                console.log(json)
                setPlaying(
                    json["response"]["games"].map(obj => {
                        const title = obj["name"]
                        const img = `https://media.steampowered.com/steamcommunity/public/images/apps/${obj["appid"]}/${obj["img_icon_url"]}.jpg`
                        const playtime = obj["playtime_forever"]

                        return {
                            title: title,
                            img: img,
                            playtime: playtime
                        }
                    })
                )


            } catch (error) {
                console.error('Failed to request from Last.FM', error);
            }
        };

        fetchData();
    }, [setPlaying]);
}

const LoadingSong = {
    title: "Loading",
    img: "Loading",
    artist: "Loading"
}

const LoadingGame = {
    title: "Loading",
    playtime: "Loading",
    img: "Loading"
}

function AboutMeScreen() {
    const {t} = useTranslation();
    const navigate = useNavigate()

    const title = t("about_me_screen_title");

    const [listening, setListening] = useState([LoadingSong, LoadingSong, LoadingSong, LoadingSong])
    const [playing, setPlaying] = useState([LoadingGame, LoadingGame, LoadingGame, LoadingGame])

    GetListening(setListening)
    GetPlaying(setPlaying)

    return (
        <Loader>
            <div className="aboutme-screen">
                <Typewriter text={title} speed={40} className="name" delay={500}/>

                <div className="aboutme">
                    <div className={"about-me-header"}>
                        {/*<img src={"profile.png"} className={"profile-pic"} alt={"profile-pic"}/>*/}
                        <div >
                            <div style={{display: "flex", alignItems: "center", gap: ".5rem"}}>
                                <img alt={"email"} height="18" width="18" src="https://unpkg.com/simple-icons@v13/icons/gmail.svg"/>
                                <p style={{margin: "0"}}>gabrielh.oliveira222@gmail.com</p>
                            </div>
                            <div style={{display: "flex", alignItems: "center", gap: ".5rem"}}>
                                <img alt={"discord"} height="18" width="18" src="https://unpkg.com/simple-icons@v13/icons/discord.svg"/>
                                <p style={{margin: "0"}}>notsteven13</p>
                            </div>
                            <div className={"social-media"} style={{display: "flex", flexDirection: "row", gap: ".5rem"}}>
                                <img alt={"github"} height="18" width="18" src="https://unpkg.com/simple-icons@v13/icons/github.svg"
                                     onClick={() => window.open("https://github.com/GabrielOlvH")}/>
                                <img alt={"gitlab"} height="18" width="18" src="https://unpkg.com/simple-icons@v13/icons/gitlab.svg"
                                     onClick={() => window.open("https://gitlab.com/StupPlayer")}/>
                                <img alt={"twitter"} height="18" width="18" src="https://unpkg.com/simple-icons@v13/icons/x.svg"
                                     onClick={() => window.open("https://twitter.com/notstevenatall")}/>
                                <img alt={"linkedin"} height="18" width="18" src="https://unpkg.com/simple-icons@v13/icons/linkedin.svg"
                                     onClick={() => window.open("https://www.linkedin.com/in/gabriel-oliveira-a11564243/")}/>
                            </div>
                        </div>
                    </div>
                    <div style={{display: "flex", alignItems: "center", margin: "0", cursor: "pointer"}}>
                        <img alt={"songs"} src={"equalizer.gif"} style={{mixBlendMode: "multiply", height: "32px", margin: ".5rem"}}/>
                        <p>Recent Songs</p>
                    </div>
                    <Gallery>
                        {
                            listening.map((song, index) => {
                                return <Card key={index} img={song.img} title={song.title} played={`by ${song.artist}`}
                                             onClick={() => window.open(song.url)}>
                                    {
                                        song.playing ? <img alt={"nowplaying"} src={"nowplaying.gif"}
                                                            style={{
                                                                mixBlendMode: "multiply",
                                                                height: "16px",
                                                                margin: ".5rem"
                                                            }}/> : <></>
                                    }
                                </Card>
                            })
                        }
                    </Gallery>
                    <div style={{display: "flex", alignItems: "center", margin: "0", cursor: "pointer"}}>
                        <img alt={"games"} src={"playing.gif"} style={{mixBlendMode: "multiply", height: "32px", margin: ".5rem"}}/>
                        <p>Recent Games</p>
                    </div>
                    <Gallery>
                        {
                            playing.toSorted((g, b) => b.playtime - g.playtime).map((game, index) => {
                                const time = game.playtime < 60 ? "< 1 hour" : `${Math.floor(game.playtime / 60)} hours`
                                return <Card key={index} img={game.img} title={game.title} played={time}
                                             onClick={() => window.open(game.url)}>

                                </Card>
                            })
                        }
                    </Gallery>
                </div>
                <MenuButton onClick={() => navigate("/")} text={t("back_to_title_screen")}/>

            </div>
        </Loader>
    );
}

export default AboutMeScreen;

