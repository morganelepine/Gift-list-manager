import { render, screen } from "@testing-library/react";
import AuthList from "@/Components/GiftList/Auth/Public/AuthList";
import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock the Inertia route function
global.route = vi.fn();

// Mock AuthenticatedLayout
vi.mock("@/Layouts/AuthenticatedLayout", () => ({
    default: ({ children }) => <div data-testid="auth-layout">{children}</div>,
}));

// Mock for @inertiajs/react
vi.mock("@inertiajs/react", async () => {
    const actual = await vi.importActual("@inertiajs/react");
    return {
        ...actual,
        usePage: () => ({
            props: {
                auth: mockAuth,
                list: mockList,
                ideas: mockIdeas,
                ideas_available: mockIdeasAvailable,
            },
        }),
        Head: ({ children }) => <div data-testid="head">{children}</div>,
        Link: ({ children }) => <div data-testid="link">{children}</div>,
    };
});

const mockAuth = {
    user: {
        last_login_at: new Date(
            Date.now() - 31 * 24 * 60 * 60 * 1000
        ).toISOString(),
    },
};
const mockList = { id: 1, name: "Gift List" };
const mockIdeas = [1, 2, 3, 4, 5, 6, 7];
const mockIdeasAvailable = [1, 2, 3, 4];

const renderAuthList = (overrides = {}) => {
    const defaultProps = {
        auth: mockAuth,
        list: mockList,
        ideas: mockIdeas,
        ideas_available: mockIdeasAvailable,
    };

    return render(<AuthList {...{ ...defaultProps, ...overrides }} />);
};

describe("AuthList", () => {
    it("displays the 'few-ideas-left' modal when there are less than 6 available ideas in the list", async () => {
        renderAuthList();
        expect(screen.getByText(/il ne reste plus que/i)).toBeInTheDocument();
    });

    it("does NOT display the 'few-ideas-left' modal when there are more than 5 available ideas in the list", async () => {
        renderAuthList({ ideas_available: [1, 2, 3, 4, 5, 6] });
        expect(screen.queryByText(/il ne reste plus que/i)).toBeNull();
    });

    it("displays the archive reminder modal if the user hasn't logged in for over 30 days", async () => {
        renderAuthList();
        expect(
            screen.getByText(/Pensez à archiver votre liste/i)
        ).toBeInTheDocument();
    });

    it("does NOT display the archive reminder modal if the user has logged in less than 30 days ago", async () => {
        renderAuthList({ auth: { user: { last_login_at: new Date() } } });
        expect(screen.queryByText(/Pensez à archiver votre liste/i)).toBeNull();
    });

    it("does NOT display archive reminder if 'archive-reminder' already exists in localStorage", async () => {
        localStorage.setItem(`archive-reminder-${mockList.id}`, "no-reminder");
        renderAuthList();
        expect(screen.queryByText(/Pensez à archiver votre liste/i)).toBeNull();
    });

    it("removes 'few-ideas-left-reminder' from localStorage if the user hasn't logged in for over 30 days", async () => {
        localStorage.setItem(
            `few-ideas-left-reminder-${mockList.id}`,
            "no-reminder"
        );
        renderAuthList();
        expect(
            localStorage.getItem(`few-ideas-left-reminder-${mockList.id}`)
        ).toBeNull();
    });
});
