const filterBy = (search) => (contact) => {
	const someStartsWith = Object.values(contact).some((val) => {
		return val.toLowerCase().startsWith(search);
	});

	const fullName = `${contact.first_name} ${contact.last_name}`.toLowerCase();

	return someStartsWith || fullName.startsWith(search);
};

export const getContacts = (search) => {
	const contactsJson = globalThis.localStorage.getItem("contacts");
	const storedContacts = contactsJson ? JSON.parse(contactsJson) : [];

	if (!search) return storedContacts;

	const filteredContacts = storedContacts.filter(filterBy(search));

	return filteredContacts;
};

export const createContact = (contact) => {
	const newContact = {
		...contact,
		id: globalThis.crypto.randomUUID(),
	};

	const contacts = getContacts();

	const updatedContacts = [...contacts, newContact];

	updateStorage(updatedContacts);
	return updatedContacts;
};

export const updateContact = (contactUpdated) => {
	const contacts = getContacts();

	const updatedContacts = contacts.map((item) => {
		if (item.id === contactUpdated.id) return contactUpdated;

		return item;
	});

	updateStorage(updatedContacts);
	return updatedContacts;
};

export const deleteContact = (id) => {
	const contacts = getContacts();

	const updatedContacts = contacts.filter((item) => item.id !== id);

	updateStorage(updatedContacts);
	return updatedContacts;
};

const updateStorage = (contacts) => {
	globalThis.localStorage.setItem("contacts", JSON.stringify(contacts));
};
