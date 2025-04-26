import "@testing-library/jest-dom";
import { vi } from "vitest";

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

global.route = vi.fn();
global.ResizeObserver = ResizeObserver;
global.route = (name, params) => {
    return `/mocked-route/${name}`;
};

vi.mock("@/Layouts/AuthenticatedLayout", () => ({
    default: ({ children }) => <div data-testid="auth-layout">{children}</div>,
}));

vi.mock("@inertiajs/react", async () => {
    const actual = await vi.importActual("@inertiajs/react");
    return {
        ...actual,
        usePage: () => ({
            props: customProps,
        }),
        Head: ({ children }) => <div data-testid="head">{children}</div>,
        Link: ({ children }) => <div data-testid="link">{children}</div>,
    };
});

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
