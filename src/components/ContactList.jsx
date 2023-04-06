import Card from './Card'
import Contact from './Contact'

const ContactList = ({ data, onClickEdit, onClickRemove }) => {
  return (
    <Card>
      <ul>
        {data.map((contact) => (
          <Contact
            key={contact.id}
            contact={contact}
            onClickEdit={onClickEdit}
            onClickRemove={onClickRemove}
          />
        ))}
      </ul>
    </Card>
  )
}

export default ContactList
