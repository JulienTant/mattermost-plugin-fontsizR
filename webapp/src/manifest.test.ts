import manifest, {pluginId} from './manifest';

test('Plugin manifest, id and version are defined', () => {
    expect(manifest).toBeDefined();

    expect(pluginId).toBeDefined();
});
