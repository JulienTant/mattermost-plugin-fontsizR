import React from 'react';
import {Store} from 'redux';
import manifest from './manifest';
import {FormattedMessage} from 'react-intl'
import {PluginRegistry} from 'mattermost-webapp/plugins/registry';
import {GlobalState} from 'mattermost-redux/types/store';

// @ts-ignore
const {formatText} = window.PostUtils;

class FontSizRPlugin {
    _myStyleTag: HTMLStyleElement;

    constructor() {
        this._myStyleTag = document.createElement('style')
        this._myStyleTag.type = 'text/css';
    }

    initialize(registry: PluginRegistry, store: Store<GlobalState>): void {
        document.body.classList.add('plugin-fontsizr')
        document.head.appendChild(this._myStyleTag)

        // @ts-ignore
        let storedFontSize = parseFloat(window.localStorage.getItem(`${manifest.id}:fontSize`))
        if (!isNaN(storedFontSize) && storedFontSize > 10) {
            this._myStyleTag.innerText='';
            this._myStyleTag.appendChild(document.createTextNode(`body.plugin-fontsizr .post p{ font-size:${storedFontSize}px; }`))
        }

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
            () => {
                // @ts-ignore
                let fontSize = parseFloat(window.getComputedStyle(document.querySelector('.post p')).fontSize)
                fontSize++

                if (fontSize > 20 || fontSize < 10) {
                    fontSize = 10
                }

                window.localStorage.setItem(`${manifest.id}:fontSize`, fontSize.toString());

                this._myStyleTag.innerText='';
                this._myStyleTag.appendChild(document.createTextNode(`body.plugin-fontsizr .post p{ font-size:${fontSize}px; }`))
            },
            <FormattedMessage defaultMessage="Change font size"/>,
        );
    }

    uninitialize() {
        document.body.classList.remove('plugin-fontsizr')
        document.head.removeChild(this._myStyleTag)
    }
}

// @ts-ignore
window.registerPlugin('com.mattermost.plugin-fontsizr', new FontSizRPlugin());
