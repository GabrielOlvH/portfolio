import {useEffect, useState} from "react";

const getInitialSettings = () => {
    const savedSettings = localStorage.getItem('settings');
    return savedSettings ? JSON.parse(savedSettings) : { typewriter_speed: 1, skip_loading: false };
};


export const useSettings = () => {
    const [settings, setSettings] = useState(getInitialSettings);

    // Salva as configurações no localStorage sempre que elas mudarem
    useEffect(() => {
        localStorage.setItem('settings', JSON.stringify(settings));
    }, [settings]);

    const updateSetting = (key, value) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };

    const resetSettings = () => {
        const defaultSettings = { typewriter_speed: 1, skip_loading: false };
        setSettings(defaultSettings);
    };

    // Retorna o estado atual das configurações e os métodos para manipulá-las
    return {
        settings,
        updateSetting,
        resetSettings,
    };
};