import { useState } from 'react'
import './App.css'
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'

function App() {
  const [contacts, setContacts] = useState([])

  const handleSubmit = (form) => {
    form.preventDefault()

    const data = new FormData(form.target)

    const newContact = {
      id: window.crypto.randomUUID(),
      first_name: data.get('first_name'),
      last_name: data.get('last_name'),
      phone_number: data.get('phone_number'),
    }

    addContact(newContact)
  }

  const addContact = (contact) => {
    setContacts((contacts) => [...contacts, contact])
  }

  return (
    <main>
      <h1>Phonebook</h1>

			<Button onClick={() => setShowContactForm(true)}>Add contact</Button>
			<Modal show={showContactForm} onClose={handleCloseForm}>
				<ContactForm onSubmit={handleSubmit} onDismiss={handleCloseForm} />
			</Modal>

      <section>
        <ContactList data={contacts} />
      </section>
    </main>
  )
}

export default App
