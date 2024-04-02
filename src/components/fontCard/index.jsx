import React from 'react';

import './style.css';
import ButtonFont from '../buttonFont';

const FontCard = React.forwardRef(({ id, abbr, color, colorBlindLabel, label, onSelect, isSelected }, ref) => {

    const handleClick = () => {
        onSelect(id);
    };

    return (
        <div
            className={`font-card-div ${isSelected.selected ? 'selected' : ''}`}
            ref={ref}
            tabIndex={id}
            aria-label={`Font card: ${abbr}, Color: ${colorBlindLabel}, Discription: ${label}`}
            onClick={handleClick}
            onKeyDown={(event) => {
                if (event.key === ' ' || event.key === 'Enter') {
                    handleClick();
                }
            }}

        >
            <ButtonFont
                id={id}
                abbr={abbr}
                color={color}
            />
            <ul className="limited-width-list">
                <li key={id}>
                    {label}
                </li>
            </ul>
        </div>
    );
});

export default FontCard;