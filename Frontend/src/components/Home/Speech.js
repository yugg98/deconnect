import React from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
const Speech = (text) => {
    console.log(text)
    const [value, setValue] = React.useState("");
    const { speak } = useSpeechSynthesis();
    return (
        <>
            <button  onClick={() => speak({ text:text.text })}><VolumeUpIcon/></button>
        </>
    );
};
export default Speech;