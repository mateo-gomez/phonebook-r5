import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useContacts } from "./useContacts";
import {
	getContacts,
	createContact,
	updateContact,
	deleteContact,
} from "../services/contactService";

vi.mock("../services/contactService");

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

describe("useContacts", () => {
	getContacts.mockImplementation(mockGetContacts);
	createContact.mockImplementation(mockCreateContact);
	updateContact.mockImplementation(mockUpdateContact);
	deleteContact.mockImplementation(mockDeleteContact);

	it("should get contacts", async () => {
		const { result } = renderHook(useContacts);

		expect(result.current.contacts).toHaveLength(3);
	});

	it("should add contacts", async () => {
		const { result, rerender } = renderHook(useContacts);

		result.current.addContact({
			id: "test",
			first_name: "Julio",
			last_name: "Jaramillo",
			phone_number: "1234567890",
		});
		rerender();

		expect(result.current.contacts).toHaveLength(4);
	});

	it("should update contact", async () => {
		const { result, rerender } = renderHook(useContacts);

		const newContactData = {
			id: "dd51add2-8cf9-4085-88ab-4094bef72275",
			first_name: "Juan",
		};

		result.current.updateContact(newContactData);
		rerender();

		expect(result.current.contacts).toHaveLength(3);
		const resultContact = result.current.contacts.find(
			(contact) => contact.id === newContactData.id
		);

		expect(resultContact.id).toBe(newContactData.id);
		expect(resultContact.first_name).toBe("Juan");
	});

	it("should delete contact", async () => {
		const { result, rerender } = renderHook(useContacts);

		const idToDelete = "dd51add2-8cf9-4085-88ab-4094bef72275";

		result.current.removeContact(idToDelete);
		rerender();

		expect(result.current.contacts).toHaveLength(2);
	});
});

const mockGetContacts = () => {
	return contacts;
};

const mockCreateContact = (contact) => {
	const contacts = getContacts();

	return [...contacts, contact];
};

const mockUpdateContact = (contact) => {
	const contacts = getContacts();

	const filtered = contacts.filter((item) => item.id !== contact.id);

	return [...filtered, contact];
};

const mockDeleteContact = (id) => {
	const contacts = getContacts();

	return contacts.filter((item) => item.id !== id);
};
