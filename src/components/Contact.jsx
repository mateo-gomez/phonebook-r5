import Button from "./Button";

const Contact = ({ contact, onClickRemove, onClickEdit }) => {
	const handleClickRemove = () => {
		onClickRemove(contact.id);
	};

	const handleEditContact = () => {
		onClickEdit(contact);
	};

	return (
		<li key={contact.id} className="contact">
			<div className="contact-info">
				<p>
					{contact.first_name} {contact.last_name}
				</p>
				<span>{contact.phone_number}</span>
			</div>

			<div className="contact-actions">
				<Button onClick={handleClickRemove}>Remove</Button>
				<Button onClick={handleEditContact}>Edit</Button>
			</div>
		</li>
	);
};

export default Contact;
