import Avatar from "./icons/Avatar";
import Button from "./Button";
import RemoveIcon from "./icons/RemoveIcon";
import EditIcon from "./icons/EditIcon";

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
				<Avatar size={80} color="#6cbadf" />
				<div className="contact-info">
					<p>
						{contact.first_name} {contact.last_name}
					</p>
					<span>{contact.phone_number}</span>
				</div>

				<div className="contact-actions">
					<Button onClick={handleEditContact}>
						<EditIcon /> Edit
					</Button>
					<Button variant="outlined" onClick={handleClickRemove}>
						<RemoveIcon /> Remove
					</Button>
				</div>
			</div>
		</li>
	);
};

export default Contact;
