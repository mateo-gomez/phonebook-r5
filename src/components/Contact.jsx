import Avatar from "./Avatar";
import Button from "./Button";

const Contact = ({ contact, onClickRemove, onClickEdit }) => {
	const handleClickRemove = () => {
		onClickRemove(contact.id);
	};

	const handleEditContact = () => {
		onClickEdit(contact);
	};

	return (
		<li key={contact.id}>
			<div className="contact">
				<Avatar size={80} color="#146C94" />
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
			</div>
		</li>
	);
};

export default Contact;
