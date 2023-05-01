import { afterEach, describe, expect, it, test, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import ContactForm from "./ContactForm";
import user from "@testing-library/user-event";

describe("ContactForm basic", () => {
	const onSubmit = vi.fn();

	afterEach(() => {
		cleanup();
		onSubmit.mockClear();

		render(<ContactForm onSubmit={onSubmit} />);
	});

	it("should render ContactForm", () => {
		render(<ContactForm />);
	});

	it("should submit when all fields pass validation", async () => {
		await user.type(getFirstName(), "John");
		await user.type(getLastName(), "Doe");
		await user.type(getPhoneNumber(), "3216549870");

		clickAddButton();

		await waitFor(() => {
			expect(onSubmit).toHaveBeenCalledWith({
				first_name: "John",
				id: null,
				last_name: "Doe",
				phone_number: "3216549870",
			});
		});

		expect(onSubmit).toHaveBeenCalledOnce();
	});

	it("should have 3 required fields", async () => {
		expect(isFieldValid(getFirstName())).toBe(false);

		expect(isFieldValid(getLastName())).toBe(false);

		expect(isFieldValid(getPhoneNumber())).toBe(false);
	});

	describe("Phone number field", () => {
		it("shows tooShort error", async () => {
			user.type(getFirstName(), "John");
			user.type(getLastName(), "Doe");
			user.type(getPhoneNumber(), "32");

			await waitFor(() => {
				expect(getPhoneNumber().validity.tooShort).toBe(true);
			});
		});

		it("shows tooLong error", async () => {
			user.type(getFirstName(), "John");
			user.type(getLastName(), "Doe");
			user.type(getPhoneNumber(), "32165498701");

			await waitFor(() => {
				expect(getPhoneNumber().validity.tooLong).toBe(true);
			});
		});
	});
});

describe("ContactForm edit contact", () => {
	test("should fill fields with contact data for updating", () => {
		cleanup();

		const contact = {
			first_name: "John",
			id: "test",
			last_name: "Doe",
			phone_number: "3216549870",
		};
		render(<ContactForm contact={contact} />);

		expect(getFirstName().value).toBe(contact.first_name);
		expect(getLastName().value).toBe(contact.last_name);
		expect(getPhoneNumber().value).toBe(contact.phone_number);
	});
});

function isFieldValid(field) {
	return field.validity.valid;
}

function getFirstName() {
	return screen.getByLabelText(/First name/i);
}

function getLastName() {
	return screen.getByLabelText(/Last name/i);
}

function getPhoneNumber() {
	return screen.getByLabelText(/Phone number/i);
}

function clickAddButton() {
	const button = screen.getByRole("button", { name: /Add/i });

	return user.click(button);
}
