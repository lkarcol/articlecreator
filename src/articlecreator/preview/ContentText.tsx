import React from 'react';
import { Text } from '@m2stack/ui.onestino';

const ContentText = ({ type, content }) => {

    const TextStyles = {
        "Text": { font: "medium", fontSize: "20px", lineHeight: "28px", marginBottom: "64px", maxWidth: "727px" },
        "Credit": { font: "medium", fontSize: "20px", lineHeight: "28px", marginBottom: "64px", maxWidth: "727px" , alignSelf:"flex-start" },
        "Qoute": { font: "semi", fontSize: "24px", lineHeight: "32px", letterSpacing: "0.5px", marginBottom: "64px", maxWidth: "727px", textAlign: "center" },
    }



    return type == "Credit" ? <Text text={`${content.type}:${content.name}`} style={TextStyles[type]} /> : <Text text={content} style={TextStyles[type]} />
};

export default ContentText;