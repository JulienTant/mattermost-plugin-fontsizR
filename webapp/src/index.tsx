import React from 'react';
import {Store} from 'redux';
import {FormattedMessage} from 'react-intl';

//@ts-ignore Webapp imports don't work properly
import {PluginRegistry} from '@mattermost/webapp/plugins/registry';
import {GlobalState} from 'mattermost-redux/types/store';

import {tickFontSizeAction, setFontSizeAction} from './actions';
import reducer from './reducers';
import FontSizRStyle from './components/FontSizRStyle';
import {getFontSize} from './selectors';
import {pluginId} from './manifest';

const LOCAL_STORAGE_KEY_FONT_SIZE = pluginId + ':font_size';

class FontSizRPlugin {
    initialize(registry: PluginRegistry, store: Store<GlobalState>): void {
        document.body.classList.add('plugin-fontsizr');
        registry.registerRootComponent(FontSizRStyle);
        registry.registerReducer(reducer);
        registry.registerTranslations((locale: string) => {
            try {
                // eslint-disable-next-line global-require
                return require(`../i18n/${locale}.json`); // TODO make async, this increases bundle size exponentially
            } catch {
                return {};
            }
        });

        registry.registerChannelHeaderButtonAction(
            <i className='icon fa fa-text-height'/>,
            () => store.dispatch(tickFontSizeAction()),
            <FormattedMessage defaultMessage='Change font size'/>,
        );

        // storage font size upon change
        store.subscribe(() => {
            const currentFontSize = getFontSize(store.getState());
            if (currentFontSize > 0) {
                localStorage.setItem(LOCAL_STORAGE_KEY_FONT_SIZE, currentFontSize.toString());
            }
        });

        // restore font size if it was set before
        const storedFontSize = parseFloat(localStorage.getItem(LOCAL_STORAGE_KEY_FONT_SIZE) ?? '0');
        if (storedFontSize > 0) {
            store.dispatch(setFontSizeAction(storedFontSize));
        }
    }

    uninitialize() {
        document.body.classList.remove('plugin-fontsizr');
    }
}

// @ts-ignore
window.registerPlugin('com.mattermost.plugin-fontsizr', new FontSizRPlugin());
