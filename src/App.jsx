import { useState } from "react";
import "./App.css";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import Modal from "./components/Modal";
import Button from "./components/Button";

function App() {
	const [contacts, setContacts] = useState([]);
	const [showContactForm, setShowContactForm] = useState(false);

	const handleSubmit = (form) => {
		form.preventDefault();

		const data = new FormData(form.target);

		const newContact = {
			id: window.crypto.randomUUID(),
			first_name: data.get("first_name"),
			last_name: data.get("last_name"),
			phone_number: data.get("phone_number"),
		};

		addContact(newContact);
	};

	const addContact = (contact) => {
		setContacts((contacts) => [...contacts, contact]);
		setShowContactForm(false);
	};

	const handleRemoveContact = (id) => {
		setContacts((contacts) => {
			return contacts.filter((item) => item.id !== id);
		});
	};

	const handleCloseForm = () => {
		setShowContactForm(false);
	};

	return (
		<main>
			<h1>Phonebook</h1>

			<Button onClick={() => setShowContactForm(true)}>Add contact</Button>
			<Modal show={showContactForm} onClose={handleCloseForm}>
				<ContactForm onSubmit={handleSubmit} onDismiss={handleCloseForm} />
			</Modal>

			<ContactList data={contacts} onClickRemove={handleRemoveContact} />
		</main>
	);
}

export default App;
