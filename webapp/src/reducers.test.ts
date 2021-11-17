import {SET_FONT_SIZE, TICK_FONT_SIZE} from './types/actions';
import reducer from './reducers';
import {DEFAULT_FONT_SIZE} from './defaults';

describe('font size reducers', () => {
    // @ts-ignore
    const initialState = reducer(undefined, {}); // eslint-disable-line no-undefined

    describe('TICK_FONT_SIZE', () => {
        const makeState = (fontSize: number) => ({
            ...initialState,
            fontSize,
        });

        it('should add 1 when we tick within range', () => {
            const state = makeState(DEFAULT_FONT_SIZE);
            const action = {
                type: TICK_FONT_SIZE,
            };
            const expectedState = makeState(14.5);

            // @ts-ignore
            expect(reducer(state, action)).toStrictEqual(expectedState);
        });
        it('go back to 10 when reaching over 20', () => {
            const state = makeState(19.5);
            const action = {
                type: TICK_FONT_SIZE,
            };
            const expectedState = makeState(10);

            // @ts-ignore
            expect(reducer(state, action)).toStrictEqual(expectedState);
        });
        it('go to DEFAULT_FONT_SIZE then when previous state is bellow 10', () => {
            const state = makeState(1);
            const action = {
                type: TICK_FONT_SIZE,
            };
            const expectedState = makeState(DEFAULT_FONT_SIZE);

            // @ts-ignore
            expect(reducer(state, action)).toStrictEqual(expectedState);
        });
    });

    describe('SET_FONT_SIZE', () => {
        const makeState = (fontSize: number) => ({
            ...initialState,
            fontSize,
        });

        it('set the font size to whatever is given', () => {
            const state = makeState(DEFAULT_FONT_SIZE);
            const action = {
                type: SET_FONT_SIZE,
                fontSize: 21,
            };
            const expectedState = makeState(21);

            // @ts-ignore
            expect(reducer(state, action)).toStrictEqual(expectedState);
        });
    });
});
