import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import './style.css';
import Tabs from '../../components/tabs';

import { cacheResponseAction } from '../../store/fontCardReducer';

import ContentFontsA from './contentFontsA';
import ContentFontsB from './contentFontsB';

const VidgetFont = () => {

    const hiddenElementRef = useRef(null);
    const elementsRefList = useRef([]);
    const [tabs, setTabs] = React.useState([]);
    const [activeTab, setActiveTab] = React.useState(null);
    const [content, setContent] = React.useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (hiddenElementRef.current) {
            registerRef(hiddenElementRef.current);
        }
    }, []);

    useEffect(() => {
        if (hiddenElementRef.current) {
            hiddenElementRef.current.focus();
        }
    }, []);


    React.useEffect(() => {
        axios.get('http://json.ffwagency.md/tabs')
            .then(response => {
                setTabs(response.data);
                setActiveTab(response.data[0]);
            })
            // eslint-disable-next-line no-console
            .catch(error => console.error('Error fetching tabs:', error));
    }, []);

    React.useEffect(() => {
        if (activeTab) {
            axios.get(`http://json.ffwagency.md/${activeTab.content_endpoint}`)
                .then(response => {
                    setContent(response.data);
                    dispatch(cacheResponseAction(activeTab.content_endpoint, response.data));
                })
                // eslint-disable-next-line no-console
                .catch(error => console.error('Error fetching content:', error));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);


    const registerRef = (ref) => {
        if (ref && !elementsRefList.current.includes(ref)) {
            elementsRefList.current.push(ref);
        }
    };

    useEffect(() => {
        elementsRefList.current = elementsRefList.current.filter(ref => ref && document.body.contains(ref));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [elementsRefList.current]);

    useEffect(() => {
        const handleTabKey = (event) => {
            try {
                if (event.key === 'Tab' && event.shiftKey) {
                    event.preventDefault();
                    const focusedIndex = elementsRefList.current.findIndex(ref => ref === document.activeElement);
                    if (focusedIndex !== -1) {
                        const nextIndex = (focusedIndex - 1 + elementsRefList.current.length) % elementsRefList.current.length;
                        elementsRefList.current[nextIndex].focus();
                    }
                } else if (event.key === 'Tab') {
                    event.preventDefault();
                    const focusedIndex = elementsRefList.current.findIndex(ref => ref === document.activeElement);
                    if (focusedIndex !== -1) {
                        const nextIndex = (focusedIndex + 1) % elementsRefList.current.length;
                        elementsRefList.current[nextIndex].focus();
                    }
                } else if (event.key === 'ArrowRight' || (event.key === 'ArrowDown' && !event.shiftKey)) {
                    event.preventDefault();
                    const focusedIndex = elementsRefList.current.findIndex(ref => ref === document.activeElement);
                    if (focusedIndex !== -1) {
                        const nextIndex = (focusedIndex + 1) % elementsRefList.current.length;
                        elementsRefList.current[nextIndex].focus();
                    }
                }
                else if (event.key === 'ArrowLeft' || (event.key === 'ArrowUp' && !event.shiftKey)) {
                    event.preventDefault();
                    const focusedIndex = elementsRefList.current.findIndex(ref => ref === document.activeElement);
                    if (focusedIndex !== -1) {
                        const nextIndex = (focusedIndex - 1 + elementsRefList.current.length) % elementsRefList.current.length;
                        elementsRefList.current[nextIndex].focus();
                    }
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error:', error);
                if (hiddenElementRef.current) {
                    hiddenElementRef.current.focus();
                }
            }
        };

        document.addEventListener('keydown', handleTabKey);

        return () => {
            document.removeEventListener('keydown', handleTabKey);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [elementsRefList.current]);


    return (
        <div id="widget-font">

            {/* Hidden element to capture focus if there's no active element */}
            <div tabIndex="-1" ref={hiddenElementRef} style={{ position: 'absolute', top: '-1000px', left: '-1000px' }}></div>

            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                registerRef={registerRef}
            />

            <div>
                {content.type === 'Font selection' ? (
                    <ContentFontsA content={content.content} registerRef={registerRef} />
                ) : content.type === 'Text' ? (
                    <ContentFontsB content={content.content} registerRef={registerRef} />
                ) : (
                    <div>Error: Unknown content type</div>
                )}
            </div>
        </div>
    );
};

export default VidgetFont;