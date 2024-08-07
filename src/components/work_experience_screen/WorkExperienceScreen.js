import './WorkExperienceScreen.css';
import Typewriter from "../typewriter/Typewriter";
import {useRef, useState} from "react";
import MenuButton from "../menu_button/MenuButton";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useWindowDimensions} from "../../App";


const events = [
    {
        id: "college",
        img: "college.png",
        start_year: 2021,
        end: -1
    },
    {
        id: "quackity_studios",
        img: "quackity_studios.png",
        start_year: 2023,
        end: 2024
    },
    {
        id: "bisect_hosting",
        img: "bisect_hosting.png",
        start_year: 2023,
        end: -1
    },
    {
        id: "ic",
        img: "sheep.png",
        start_year: 2023,
        end: -1
    },
    {
        id: "free_lancing",
        img: "freelance.png",
        start_year: 2022,
        end: 2023
    },

];

function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

const Timeline = ({start, end, events, setSelected}) => {
    const length = end - start;

    const {height, width} = useWindowDimensions()

    const topEvents = []
    const bottomEvents = []
    const separators = []

    const [content, setContent] = useState("");

    const padding = width > 600 ? 6 : 2;

    const separatorBaseWidth = convertRemToPixels(padding) + convertRemToPixels(2);

    for (let i = 0; i < length + 1; i++) {
        for (let j = 0; j < events.length; j++) {
            const event = events[j];

            if (event.start_year === (start + i)) {
                let left = (event.start_year - start) * separatorBaseWidth + convertRemToPixels(2);
                let durationInPx;
                if (event.end !== -1) {
                    durationInPx = separatorBaseWidth * (event.end - event.start_year);
                } else {
                    durationInPx = separatorBaseWidth * (end - event.start_year) + convertRemToPixels(4);
                }

                let eventElement;
                if (width > 600) {
                    eventElement=(
                        <div className={"event"} style={{left: `${left}px`}}
                             onMouseDown={() => setSelected(j)}
                             onMouseOver={() => setContent(event.start_year + " - " + (event.end === -1 ? " Today" : event.end))}
                             onMouseLeave={() => setContent("")}>
                            <img src={event.img}/>
                            <div className={"period"} style={{width: `${durationInPx}px`}}></div>
                            <p className={"period-hover"}>{content}</p>
                        </div>
                    )
                } else {
                    eventElement=(
                        <div className={"event"} style={{top: `${left}px`}} onMouseDown={() => setSelected(j)}>
                            <img src={event.img}/>
                            <div className={"period"} style={{height: `${durationInPx}px`}}></div>
                            <p className={"period-hover"}>{content}</p>
                        </div>
                    )
                }

                if (event.start_year % 2 === 0) bottomEvents.push(eventElement)
                else topEvents.push(eventElement)


            }
        }
        if (i % 2 === 0) {
            separators.push(
                <div className={"separator-container"}>
                    <div key={start + i} className={"separator"}></div>
                    <p>{start + i}</p>
                </div>
            );
        } else {
            separators.push(
                <div className={"separator-container"}>
                    <p>{start + i}</p>
                    <div key={start + i} className={"separator"}></div>
                </div>
            );
        }
    }
    return (
        <>
            <div className={"timeline"}>
                <div className={"center-line"}></div>
                <div className={"inner-timeline"}>
                    {topEvents}
                    <div className={"separators"}>{separators}</div>
                    {bottomEvents}
                </div>
            </div>

        </>)
}

function WorkExperienceScreen() {
    const {t, i18n} = useTranslation();
    const navigate = useNavigate()

    const title = t("work_experience_screen_title")
    const [selected, setSelected] = useState(-1);
    const [loadedTime, setLoadTime] = useState(1200);

    const [viewingPopup, setViewingPopup] = useState(false);

    const scrollableRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState({
        isAtTop: true,
        isAtBottom: false,
    });



        const handleScroll = () => {
            const element = scrollableRef.current;
            if (element) {
                const isAtTop = element.scrollTop === 0;
                const isAtBottom =
                    element.scrollTop + element.clientHeight === element.scrollHeight;

                setScrollPosition({
                    isAtTop,
                    isAtBottom,
                });
            }
        }


    setTimeout(() => {
        setLoadTime(loadedTime - 1);
    }, 1)

    return (
        <div className="work-experience-screen">
            <Typewriter text={title} speed={40} className="work-experience-title" delay={500}/>
            <div className={"work-experience " + (viewingPopup ? "blur-background" : "")}>
                <Timeline start={2021} end={2024} events={events} setSelected={(a) => setSelected(a) || setViewingPopup(true)}></Timeline>

                <div className={"button-list"}>
                    <MenuButton onClick={() => navigate("/")} text={t("back_to_title_screen")}/>
                </div>
            </div>
            <div className={"work-description-container"}>
                <div className={"work-description " + (viewingPopup ? "" : "hide-popup")}>
                    <div className={"work-description-header"}>
                        <img src={events[selected]?.img}/>
                        <div>
                            <p><b>{t(`work_experience_${events[selected]?.id}_title`)}</b></p>
                            <p>{events[selected]?.start_year + "-" + (events[selected]?.end === -1 ? "today" : events[selected]?.end)}</p>
                        </div>
                        <button onClick={() => setViewingPopup(false)} className={"close-button"}>🗙</button>
                    </div>

                    <p style={{marginBottom: "1rem"}}><b>My experience</b></p>

                    <div className={"work-info-scroll-shadow " + (scrollPosition.isAtTop ? "" : "top")}>
                        <div className={"work-info-scroll-shadow " + (scrollPosition.isAtBottom ? "" : "bottom")}>
                            <div className={"work-description-experience"}
                                 ref={scrollableRef}
                                 onScroll={() => handleScroll()}>
                                <div
                                    dangerouslySetInnerHTML={{__html: t(`work_experience_${events[selected]?.id}_desc`)}}>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            {
                loadedTime > 0 ?
                    <div className={"loader-container-full"}>
                    <div className={"loader"}></div>
                    </div>
                    :
                    <></>
            }

        </div>
    );
}

export default WorkExperienceScreen;

