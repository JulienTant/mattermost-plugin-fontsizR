import {GlobalState} from 'mattermost-redux/types/store';

import {pluginId} from './manifest';
import {FontSizerPluginState} from './reducers';

// @ts-ignore
const pluginState = (state: GlobalState): FontSizerPluginState => state['plugins-' + pluginId as keyof GlobalState] as FontSizerPluginState || {} as FontSizerPluginState;

export const getFontSize = (state: GlobalState): number => {
    return pluginState(state).fontSize;
};
