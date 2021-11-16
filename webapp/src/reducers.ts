import {TICK_FONT_SIZE, ReceivedTickFontSizeAction, SET_FONT_SIZE, ReceivedSetFontSizeAction} from "./types/actions";
import {combineReducers} from "redux";
import {act} from "react-dom/test-utils";

export function fontSize(state = 13.5, action: ReceivedTickFontSizeAction | ReceivedSetFontSizeAction) {
    switch (action.type) {
        case TICK_FONT_SIZE:
            console.log('action.type ok', state, action)

            let fontSize = state
            fontSize++

            if (fontSize < 10) {
                fontSize = 13.5
            }

            if (fontSize > 20) {
                fontSize = 10
            }

            return fontSize
        case SET_FONT_SIZE:
            return (action as ReceivedSetFontSizeAction).fontSize;
    }

    return state
}


const reducer = combineReducers({
    fontSize,
});

export default reducer;

export type FontSizRPluginState = ReturnType<typeof reducer>;
