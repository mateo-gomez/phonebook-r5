import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import ContactList from "./ContactList";

const contacts = [
	{
		id: "dd51add2-8cf9-4085-88ab-4094bef72275",
		first_name: "John",
		last_name: "Doe",
		phone_number: "3216549870",
	},
	{
		id: "187ee06e-ed1c-4cd7-8f6e-934bffe8e03e",
		first_name: "charles",
		last_name: "patiño",
		phone_number: "1234567890",
	},
	{
		id: "f40369d0-6927-4c48-b018-12806a08e7cd",
		first_name: "hugo",
		last_name: "perez",
		phone_number: "4567891230",
	},
];

const oneContact = [
	{
		id: "dd51add2-8cf9-4085-88ab-4094bef72275",
		first_name: "John",
		last_name: "Doe",
		phone_number: "3216549870",
	},
];

describe("ContactList", () => {
	const onClickEdit = vi.fn();
	const onClickRemove = vi.fn();

	afterEach(() => {
		cleanup();

		onClickEdit.mockClear();
		onClickRemove.mockClear();
	});

	it("should render 3 contacts", () => {
		render(<ContactList data={contacts} />);

		screen.getByText(/john doe/i);
		screen.getByText(/charles patiño/i);
		screen.getByText(/hugo perez/i);
	});

	it("should call onClickEdit", async () => {
		render(<ContactList data={oneContact} onClickEdit={onClickEdit} />);

		const editButton = screen.getByRole("button", { name: /edit/i });

		userEvent.click(editButton);

		await waitFor(() => {
			expect(onClickEdit).toHaveBeenCalledOnce();
		});
	});

	it("should call onClickRemove", async () => {
		render(<ContactList data={oneContact} onClickRemove={onClickRemove} />);
		const removeButton = screen.getByRole("button", { name: /remove/i });

		userEvent.click(removeButton);

		await waitFor(() => {
			expect(onClickRemove).toHaveBeenCalledOnce();
		});
	});
});
