import { useEffect, useState } from "react";

export const useContacts = (search) => {
	const [contacts, updateContacts] = useState([]);

	useEffect(() => {
		const contacts = getContacts(search);
		updateContacts(contacts);
	}, [search]);

	return { contacts, updateContacts };
};

const getContacts = (search) => {
	const contactsJson = globalThis.localStorage.getItem("contacts");
	const storedContacts = contactsJson ? JSON.parse(contactsJson) : [];

	if (search) {
		const contacts = storedContacts.filter((contact) => {
			const someStartsWith = Object.values(contact).some((val) => {
				console.log(val.toLowerCase());

				return val.toLowerCase().startsWith(search);
			});
			const fullName =
				`${contact.first_name} ${contact.last_name}`.toLowerCase();

			return someStartsWith || fullName.startsWith(search);
		});

		return contacts;
	}

	return storedContacts;
};
