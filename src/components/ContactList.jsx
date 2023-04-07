import Card from "./Card";
import Contact from "./Contact";

const ContactList = ({ data, onClickEdit, onClickRemove }) => {
	return (
		<Card>
			<ul>
				{data.length > 0 ? (
					data.map((contact) => (
						<Contact
							key={contact.id}
							contact={contact}
							onClickEdit={onClickEdit}
							onClickRemove={onClickRemove}
						/>
					))
				) : (
					<div style={{ textAlign: "center" }}>No contacts found</div>
				)}
			</ul>
		</Card>
	);
};

export default ContactList;
