import React from 'react';
import {useSelector} from 'react-redux';
import {GlobalState} from '@mattermost/webapp/types/store/index';

import {getFontSize} from '../selectors';

const FontSizerStyle = () => {
    const fontSize = useSelector((state: GlobalState) => getFontSize(state));

    return (
        <style>{`
body.plugin-fontsizer .post p {
font-size: ` + fontSize + `px;
}`}</style>
    );
};

export default FontSizerStyle;
