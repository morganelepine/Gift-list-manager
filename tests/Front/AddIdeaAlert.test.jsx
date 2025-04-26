import { render, screen, fireEvent } from "@testing-library/react";
import AddIdeaAlert from "@/Components/GiftList/Auth/Public/Actions/AddIdeaAlert";

const mockList = { id: 1, name: "Gift List" };
const mockIdeas = [1, 2, 3, 4, 5, 6, 7];
const mockIdeasAvailable = [1, 2, 3, 4];
const mockDaysSinceLastLogin = 31;

const renderAddIdeaAlert = (overrides = {}) => {
    const defaultProps = {
        list: mockList,
        ideas: mockIdeas,
        ideas_available: mockIdeasAvailable,
        daysSinceLastLogin: mockDaysSinceLastLogin,
    };

    return render(<AddIdeaAlert {...{ ...defaultProps, ...overrides }} />);
};

describe("AddIdeaAlert", () => {
    it("displays the 'few-ideas-left' modal when there are less than 6 available ideas in the list", async () => {
        renderAddIdeaAlert();
        expect(screen.getByText(/il ne reste plus que/i)).toBeInTheDocument();
    });

    it("does NOT display the 'few-ideas-left' modal when there are more than 5 available ideas in the list", async () => {
        renderAddIdeaAlert({ ideas_available: [1, 2, 3, 4, 5, 6] });
        expect(screen.queryByText(/il ne reste plus que/i)).toBeNull();
    });

    it("puts 'few-ideas-left-reminder' in localStorage when 'Ne plus me rappeler' is clicked", () => {
        renderAddIdeaAlert();

        const noReminderButton = screen.getByRole("button", {
            name: /Ne plus me le rappeler/i,
        });

        fireEvent.click(noReminderButton);

        expect(localStorage.getItem("few-ideas-left-reminder-1")).toBe(
            "no-reminder"
        );
        expect(screen.queryByText(/il ne reste plus que/i)).toBeNull();
    });

    it("removes 'few-ideas-left-reminder' from localStorage if the user hasn't logged in for over 30 days", async () => {
        localStorage.setItem(
            `few-ideas-left-reminder-${mockList.id}`,
            "no-reminder"
        );
        renderAddIdeaAlert();
        expect(
            localStorage.getItem(`few-ideas-left-reminder-${mockList.id}`)
        ).toBeNull();
    });
});
