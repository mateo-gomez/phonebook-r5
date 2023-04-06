import { useState } from 'react'
import './App.css'
import ContactList from './components/ContactList'

function App() {
  const [contacts, setContacts] = useState([])

  return (
    <main>
      <h1>Phonebook</h1>

      <section>
        <ContactList data={contacts} />
      </section>
    </main>
  )
}

export default App
