import { useCallback, useEffect, useState } from "react";

export const useContacts = (search) => {
	const [contacts, setContacts] = useState([]);

	const addContact = (contact) => {
		const newContact = {
			...contact,
			id: globalThis.crypto.randomUUID(),
		};
		setContacts((prevContacts) => {
			const contacts = [...prevContacts, newContact];
			updateStorage(contacts);

			return contacts;
		});
	};

	const updateContact = (contactUpdated) => {
		setContacts((prevContacts) => {
			const contacts = prevContacts.map((item) => {
				if (item.id === contactUpdated.id) return contactUpdated;

				return item;
			});

			updateStorage(contacts);

			return contacts;
		});
	};

	const removeContact = (id) => {
		setContacts((prevContacts) => {
			const contacts = prevContacts.filter((item) => item.id !== id);

			updateStorage(contacts);

			return contacts;
		});
	};

	const getContacts = useCallback(
		(search) => {
			const contactsJson = globalThis.localStorage.getItem("contacts");
			const storedContacts = contactsJson ? JSON.parse(contactsJson) : [];

			if (!search) return storedContacts;

			const filteredContacts = storedContacts.filter(filterBy(search));

			return filteredContacts;
		},
		[search]
	);

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

const updateStorage = (contacts) => {
	globalThis.localStorage.setItem("contacts", JSON.stringify(contacts));
};

const filterBy = (search) => (contact) => {
	const someStartsWith = Object.values(contact).some((val) => {
		return val.toLowerCase().startsWith(search);
	});

	const fullName = `${contact.first_name} ${contact.last_name}`.toLowerCase();

	return someStartsWith || fullName.startsWith(search);
};
