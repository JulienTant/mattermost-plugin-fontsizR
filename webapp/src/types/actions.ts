import {pluginId} from '../manifest';

export const TICK_FONT_SIZE = pluginId + '_change_font_size';
export const SET_FONT_SIZE = pluginId + '_set_font_size';

export interface ReceivedTickFontSizeAction {
    type: typeof TICK_FONT_SIZE;
}

export interface ReceivedSetFontSizeAction {
    type: typeof TICK_FONT_SIZE;
    fontSize: number;
}
