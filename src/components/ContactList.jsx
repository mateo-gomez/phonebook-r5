const ContactList = ({ data }) => {
  return (
    <ul>
      {data.map((contact) => (
        <li key={contact.id}>
          <p>
            {contact.first_name} {contact.last_name}
          </p>
          <span>{contact.phone_number}</span>
        </li>
      ))}
    </ul>
  )
}

export default ContactList
