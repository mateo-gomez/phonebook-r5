import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useContacts } from "../hooks/useContacts";
import Modal from "./Modal";
import InputSearch from "./InputSearch";
import ContactForm from "./ContactForm";
import AddContactIcon from "./icons/AddContactIcon";
import ContactList from "./ContactList";
import Button from "./Button";

export const PhoneBook = () => {
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce(search);
	const { contacts, addContact, updateContact, removeContact } =
		useContacts(debouncedSearch);
	const [showContactForm, setShowContactForm] = useState(false);
	const [contactSelected, setContactSelected] = useState(null);

	const handleSubmit = (contact) => {
		if (contact.id) {
			updateContact(contact);
			setContactSelected(null);
		} else {
			addContact(contact);
		}

		setShowContactForm(false);
	};

	const handleCloseForm = () => {
		setShowContactForm(false);
		setContactSelected(null);
	};

	const handleEditContact = (contact) => {
		setShowContactForm(true);
		setContactSelected(contact);
	};

	const handleChangeSearch = (e) => {
		const text = e.target.value.toLowerCase();

		setSearch(text);
	};

	return (
		<>
			<InputSearch onChange={handleChangeSearch} />
			<Modal show={showContactForm} onClose={handleCloseForm}>
				<ContactForm
					onSubmit={handleSubmit}
					onDismiss={handleCloseForm}
					contact={contactSelected}
				/>
			</Modal>

			<Button onClick={() => setShowContactForm(true)}>
				<AddContactIcon /> Add contact
			</Button>

			<ContactList
				data={contacts}
				onClickEdit={handleEditContact}
				onClickRemove={removeContact}
			/>
		</>
	);
};
