import { useState } from "react";
import "./App.css";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import Modal from "./components/Modal";
import Button from "./components/Button";
import { useContacts } from "./hooks/useContacts";
import { useDebounce } from "./hooks/useDebounce";

function App() {
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce(search);
	const { contacts, updateContacts } = useContacts(debouncedSearch);
	const [showContactForm, setShowContactForm] = useState(false);
	const [contactSelected, setContactSelected] = useState(null);

	const addContact = (contact) => {
		updateContacts((prevContacts) => {
			const contacts = [...prevContacts, contact];

			globalThis.localStorage.setItem("contacts", JSON.stringify(contacts));

			return contacts;
		});
		setShowContactForm(false);
	};

	const updateContact = (contact) => {
		updateContacts((prevContacts) => {
			const contacts = prevContacts
				.filter((item) => item.id !== contact.id)
				.concat([contact]);

			globalThis.localStorage.setItem("contacts", JSON.stringify(contacts));

			return contacts;
		});

		setContactSelected(null);

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
		updateContacts((prevContacts) => {
			const contacts = prevContacts.filter((item) => item.id !== id);

			globalThis.localStorage.setItem("contacts", JSON.stringify(contacts));

			return contacts;
		});
	};

	const handleCloseForm = () => {
		setShowContactForm(false);
		setContactSelected(null);
	};

	const handleEditContact = (contact) => {
		setShowContactForm(true);
		setContactSelected(contact);
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
					contact={contactSelected}
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
