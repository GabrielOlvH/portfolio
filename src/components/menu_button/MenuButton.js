import './MenuButton.css';


const FormatText = ( text ) => {
    // Convert the text to uppercase
    const words = text.toUpperCase().split(" ");

    return (
        <>
            {words.map((word, index) => (
                <span key={index} style={{marginRight: "4px"}}>
                    <span style={{fontSize: "1.2em"}}>{word.charAt(0)}</span>
                    {word.slice(1)}
                </span>
            ))}
        </>
    );
};


function MenuButton({children, text, ...props} ) {
    return (
        <div className={"menu-button-container"}>
            <button className={"menu-button default-button"} {...props}>
                {FormatText(text)}
                {children}
            </button>
            <span className={"arrow"}>▶</span>
        </div>
    );
}

export default MenuButton;
