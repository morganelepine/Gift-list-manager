import { render, screen, fireEvent } from "@testing-library/react";
import AddIdeaAlertModal from "@/Components/GiftList/Auth/Public/AddIdeaAlertModal";
import "@testing-library/jest-dom";

describe("AddIdeaAlertModal", () => {
    const mockCloseModal = vi.fn();
    const mockList = { id: 1 };
    const mockIdeasAvailable = ["idea1", "idea2"];

    it("puts an item in the localStorage when 'Ne plus me rappeler' is clicked", () => {
        render(
            <AddIdeaAlertModal
                modalVisible={true}
                closeModal={mockCloseModal}
                list={mockList}
                ideas_available={mockIdeasAvailable}
            />
        );

        const noReminderButton = screen.getByRole("button", {
            name: /Ne plus me le rappeler/i,
        });

        fireEvent.click(noReminderButton);

        expect(localStorage.getItem("few-ideas-left-reminder-1")).toBe(
            "no-reminder"
        );
        expect(mockCloseModal).toHaveBeenCalled();
    });
});
