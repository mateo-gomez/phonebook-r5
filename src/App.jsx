import { useEffect, useState } from "react";
import "./App.css";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import Modal from "./components/Modal";
import Button from "./components/Button";

function App() {
	const [contacts, setContacts] = useState([]);
	const [showContactForm, setShowContactForm] = useState(false);
	const [contact, setContact] = useState(null);

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

	const addContact = (contact) => {
		setContacts((prevContacts) => {
			const contacts = [...prevContacts, contact];

			globalThis.localStorage.setItem("contacts", JSON.stringify(contacts));

			return contacts;
		});
		setShowContactForm(false);
	};

	const updateContact = (contact) => {
		setContacts((prevContacts) => {
			const contacts = prevContacts
				.filter((item) => item.id !== contact.id)
				.concat([contact]);

			globalThis.localStorage.setItem("contacts", JSON.stringify(contacts));

			return contacts;
		});

		setContact(null);

		setShowContactForm(false);
	};

	const handleSubmit = (contact) => {
		if (contact.id) {
			updateContact(contact);
		} else {
			const newContact = {
				...contact,
				id: globalThis.crypto.randomUUID(),
			};

			addContact(newContact);
		}
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
		setContact(null);
	};

	const handleEditContact = (contact) => {
		setShowContactForm(true);
		setContact(contact);
	};

	};

	return (
		<main>
			<h1>Phonebook</h1>

			<input type="search" name="search" />

			<Button onClick={() => setShowContactForm(true)}>Add contact</Button>
			<Modal show={showContactForm} onClose={handleCloseForm}>
				<ContactForm
					onSubmit={handleSubmit}
					onDismiss={handleCloseForm}
					contact={contact}
				/>
			</Modal>

			<ContactList
				data={contacts}
				onClickEdit={handleEditContact}
				onClickRemove={handleRemoveContact}
			/>
		</main>
	);
}

export default App;
