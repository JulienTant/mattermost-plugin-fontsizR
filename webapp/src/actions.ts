import {TICK_FONT_SIZE, ReceivedTickFontSizeAction, ReceivedSetFontSizeAction, SET_FONT_SIZE} from './types/actions';

export function tickFontSizeAction(): ReceivedTickFontSizeAction {
    return {type: TICK_FONT_SIZE};
}

export function setFontSizeAction(fontSize: number): ReceivedSetFontSizeAction {
    return {type: SET_FONT_SIZE, fontSize};
}
