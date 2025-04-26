import "@testing-library/jest-dom";

class ResizeObserver {
    observe(target) {
        console.log(`Observing:`, target);
    }
    unobserve(target) {
        console.log(`Stopped observing:`, target);
    }
    disconnect() {
        // Intentionally left blank as no cleanup is needed for this mock
    }
}

global.ResizeObserver = ResizeObserver;

global.route = (name, params) => {
    return `/mocked-route/${name}`;
};

beforeEach(() => {
    let store = {};

    vi.stubGlobal("localStorage", {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
            store[key] = value.toString();
        },
        removeItem: (key) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        },
    });
});
