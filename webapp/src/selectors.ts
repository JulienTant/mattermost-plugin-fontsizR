import {GlobalState} from 'mattermost-redux/types/store';
import {pluginId} from './manifest';
import {FontSizRPluginState} from "./reducers";


const pluginState = (state: GlobalState): FontSizRPluginState => state['plugins-' + pluginId as keyof GlobalState] as FontSizRPluginState  || {} as FontSizRPluginState;

export const getFontSize = (state: GlobalState): number => {
    return pluginState(state).fontSize
}
