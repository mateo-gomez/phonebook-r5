import { cleanup, render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import Contact from "./Contact";

const contact = {
	first_name: "John",
	last_name: "Doe",
	phone_number: "1234567890",
};

describe("Contact", () => {
	const onClickEdit = vi.fn();
	const onClickRemove = vi.fn();

	afterEach(cleanup);

	it("should render with contact data", () => {
		render(<Contact contact={contact} />);

		screen.getByText(/John Doe/i);
		screen.getByText(/1234567890/i);
	});

	it("should call onClickEdit", async () => {
		render(<Contact contact={contact} onClickEdit={onClickEdit} />);

		const editButton = screen.getByRole("button", { name: /edit/i });

		user.click(editButton);

		await waitFor(() => {
			expect(onClickEdit).toHaveBeenCalledOnce();
		});
	});

	it("should call onClickRemove", async () => {
		render(<Contact contact={contact} onClickRemove={onClickRemove} />);

		const removeButton = screen.getByRole("button", { name: /remove/i });

		user.click(removeButton);

		await waitFor(() => {
			expect(onClickEdit).toHaveBeenCalledOnce();
		});
	});
});
