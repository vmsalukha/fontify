import React from 'react';

import './style.css';

const ButtonFont = ({ abbr, color }) => {
    const buttonStyle = {
        backgroundColor: color,
    };

    return (
        <>
            <div className="button-font" style={buttonStyle}>
                <span className="button-text">{abbr}</span>
            </div>
        </>
    );
};

export default ButtonFont;