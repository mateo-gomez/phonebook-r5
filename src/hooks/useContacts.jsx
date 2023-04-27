import { useEffect, useState } from "react";
import {
	deleteContact,
	getContacts,
	updateContact as doUpdateContact,
	createContact,
} from "../services/contactService";

export const useContacts = (search) => {
	const [contacts, setContacts] = useState([]);

	const addContact = (newContact) => {
		const contacts = createContact(newContact);

		setContacts(contacts);
	};

	const updateContact = (contactUpdated) => {
		const contacts = doUpdateContact(contactUpdated);

		setContacts(contacts);
	};

	const removeContact = (id) => {
		const contacts = deleteContact(id);

		setContacts(contacts);
	};

	useEffect(() => {
		const contacts = getContacts(search);

		setContacts(contacts);
	}, [search]);

	return {
		contacts,
		addContact,
		updateContact,
		removeContact,
	};
};
