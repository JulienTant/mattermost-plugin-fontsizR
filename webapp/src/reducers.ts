import {combineReducers} from 'redux';

import {TICK_FONT_SIZE, ReceivedTickFontSizeAction, SET_FONT_SIZE, ReceivedSetFontSizeAction} from './types/actions';

export function fontSize(state = 13.5, action: ReceivedTickFontSizeAction | ReceivedSetFontSizeAction) {
    switch (action.type) {
    case TICK_FONT_SIZE: {
        let fontSizeState = state;
        fontSizeState++;

        if (fontSizeState < 10) {
            fontSizeState = 13.5;
        }

        if (fontSizeState > 20) {
            fontSizeState = 10;
        }

        return fontSizeState;
    }
    case SET_FONT_SIZE:
        return (action as ReceivedSetFontSizeAction).fontSize;
    }

    return state;
}

const reducer = combineReducers({
    fontSize,
});

export default reducer;

export type FontSizRPluginState = ReturnType<typeof reducer>;
