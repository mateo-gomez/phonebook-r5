import Card from './Card'
import Contact from './Contact'

const ContactList = ({ data, onPressEdit, onPressRemove }) => {
  return (
    <Card>
      <ul>
        {data.map((contact) => (
          <Contact
            key={contact.id}
            contact={contact}
            onPressEdit={onPressEdit}
            onPressRemove={onPressRemove}
          />
        ))}
      </ul>
    </Card>
  )
}

export default ContactList
