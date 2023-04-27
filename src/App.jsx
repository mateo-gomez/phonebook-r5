import { useState } from "react";
import "./App.css";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import Modal from "./components/Modal";
import Button from "./components/Button";
import { useContacts } from "./hooks/useContacts";
import InputSearch from "./components/InputSearch";
import { useDebounce } from "./hooks/useDebounce";
import AddContactIcon from "./components/icons/AddContactIcon";
import ContactsIcon from "./components/icons/ContactsIcon";

function App() {
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
		<main>
			<h1 className="title">
				Phone Book <ContactsIcon fill="#00cca7" />
			</h1>

			<InputSearch onChange={handleChangeSearch} />
			<Button onClick={() => setShowContactForm(true)}>
				<AddContactIcon /> Add contact
			</Button>
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
				onClickRemove={removeContact}
			/>
		</main>
	);
}

export default App;
