import { useEffect, useState } from "react";
import "./App.css";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import Modal from "./components/Modal";
import Button from "./components/Button";

function App() {
	const [contacts, setContacts] = useState([]);
	const [showContactForm, setShowContactForm] = useState(false);

	useEffect(() => {
		const restoreSavedContacts = () => {
			const contactsJson = globalThis.localStorage.getItem("contacts");

			const storedContacts = contactsJson ? JSON.parse(contactsJson) : [];

			if (storedContacts.length > 0) {
				setContacts(() => storedContacts);
			}
		};

		restoreSavedContacts();
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = new FormData(event.target);

		const newContact = {
			id: globalThis.crypto.randomUUID(),
			first_name: data.get("first_name"),
			last_name: data.get("last_name"),
			phone_number: data.get("phone_number"),
		};

		addContact(newContact);
	};

	const addContact = (contact) => {
		setContacts((prevContacts) => {
			const contacts = [...prevContacts, contact];

			globalThis.localStorage.setItem("contacts", JSON.stringify(contacts));

			return contacts;
		});
		setShowContactForm(false);
	};

	const handleRemoveContact = (id) => {
		setContacts((prevContacts) => {
			const contacts = prevContacts.filter((item) => item.id !== id);

			globalThis.localStorage.setItem("contacts", JSON.stringify(contacts));

			return contacts;
		});
	};

	const handleCloseForm = () => {
		setShowContactForm(false);
	};

	return (
		<main>
			<h1>Phonebook</h1>

			<input type="search" name="search" />

			<Button onClick={() => setShowContactForm(true)}>Add contact</Button>
			<Modal show={showContactForm} onClose={handleCloseForm}>
				<ContactForm onSubmit={handleSubmit} onDismiss={handleCloseForm} />
			</Modal>

			<ContactList data={contacts} onClickRemove={handleRemoveContact} />
		</main>
	);
}

export default App;
