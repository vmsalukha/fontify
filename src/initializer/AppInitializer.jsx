import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import App from '../App';
import { selectFontCardAction } from '../store/fontCardReducer';

const AppInitializer = () => {
    const dispatch = useDispatch();
    const appRef = useRef(null);
    const firstFocusableElementRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Tab') {
                const appElement = appRef.current;
                const activeElement = document.activeElement;

                if (appElement && !appElement.contains(activeElement)) {
                    firstFocusableElementRef.current.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const selectedFontCard = localStorage.getItem('selectFontCard');
        if (selectedFontCard) {
            dispatch(selectFontCardAction(selectedFontCard));
        }
    }, [dispatch]);

    return (
        <div ref={appRef} tabIndex={-1}>
            <App firstFocusableElementRef={firstFocusableElementRef} />
        </div>
    );
};

export default AppInitializer;