import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import { PhoneBook } from "./PhoneBook";
import userEvent from "@testing-library/user-event";

describe("Phonebook", () => {
	afterEach(cleanup);

	it("should render", () => {
		render(<PhoneBook />);
	});

	it("should have add contact button", () => {
		render(<PhoneBook />);

		screen.getByRole("button", { name: /Add contact/ });
	});

	it("should render modal on click add contact", async () => {
		const portalContainer = document.createElement("div");
		portalContainer.id = "portal";
		document.body.appendChild(portalContainer);

		render(<PhoneBook />);

		const addContactBtn = screen.getByRole("button", { name: /Add contact/ });

		userEvent.click(addContactBtn);

		await waitFor(() => {
			screen.getByText(/contact information/i);
		});
	});
});
