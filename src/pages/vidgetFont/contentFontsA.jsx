import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FontCard from '../../components/fontCard';
import { selectFontCardAction } from '../../store/fontCardReducer';

const ContentFontsA = ({ content, registerRef }) => {
    const fontCardRefs = useRef([]);
    const dispatch = useDispatch();

    const selectedFontCard = useSelector(state => state.selectFontCard);

    const isSelected = (id) => {
        return { selected: selectedFontCard === id };
    };

    const handleRefCreation = (ref, index) => {
        fontCardRefs.current[index] = ref;
        registerRef(ref);
    };

    const selectFontCard = (selectFontCard) => {
        dispatch(selectFontCardAction(selectFontCard));
    };

    return (
        <div className="content">
            <div className="first-column">
                {Array.isArray(content) && content.length > 0 && (
                    <FontCard
                        ref={(ref) => handleRefCreation(ref, 0)}
                        key={content[0].id}
                        id={content[0].id}
                        abbr={content[0].abbr}
                        color={content[0].color}
                        colorBlindLabel={content[0]['color-blind-label']}
                        label={content[0].label}
                        onSelect={selectFontCard}
                        isSelected={isSelected(content[0].id)}

                    />
                )}
            </div>
            <div className="second-column">
                {Array.isArray(content) && content.length > 1 && (
                    content.slice(1).map((item, index) => (
                        <FontCard
                            ref={(ref) => handleRefCreation(ref, index + 1)}
                            key={item.id}
                            id={item.id}
                            abbr={item.abbr}
                            color={item.color}
                            colorBlindLabel={item['color-blind-label']}
                            label={item.label}
                            onSelect={selectFontCard}
                            isSelected={isSelected(item.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
export default ContentFontsA;