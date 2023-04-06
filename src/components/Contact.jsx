import Button from './Button'

const Contact = ({ contact, onPressRemove, onPressEdit }) => {
  return (
    <li key={contact.id} className='contact'>
      <div className='contact-info'>
        <p>
          {contact.first_name} {contact.last_name}
        </p>
        <span>{contact.phone_number}</span>
      </div>

      <div className='contact-actions'>
        <Button onPress={onPressRemove}>Remove</Button>
        <Button onPress={onPressEdit}>Edit</Button>
      </div>
    </li>
  )
}

export default Contact
