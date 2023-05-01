import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

const initialFormData = {
	id: null,
	first_name: "",
	last_name: "",
	phone_number: "",
};

const ContactForm = ({ onSubmit, onDismiss, contact = null }) => {
	const [formData, setFormData] = useState(() => contact || initialFormData);

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = new FormData(event.target);

		const newContact = {
			id: contact ? contact.id : null,
			first_name: data.get("first_name").trim(),
			last_name: data.get("last_name").trim(),
			phone_number: data.get("phone_number").trim(),
		};

		onSubmit(newContact);
	};

	const handleInputChange = ({ name, value }) => {
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[name]: value,
			};
		});
	};

	return (
		<form onSubmit={handleSubmit} className="contact-form">
			<section>
				<h2>Contact information</h2>

				<Input
					required
					minLength={3}
					maxLength={30}
					placeholder="E.g: Julio"
					label="First name"
					type="text"
					id="first_name"
					name="first_name"
					autoFocus="on"
					onChange={handleInputChange}
					value={formData.first_name}
				/>

				<Input
					required
					minLength={3}
					maxLength={30}
					label="Last name"
					placeholder="E.g: Perez"
					type="text"
					id="last_name"
					name="last_name"
					onChange={handleInputChange}
					value={formData.last_name}
				/>
				<Input
					required
					label="Phone number"
					placeholder="Must have at least 6 numbers"
					type="tel"
					minLength={6}
					maxLength={10}
					id="phone_number"
					name="phone_number"
					onChange={handleInputChange}
					value={formData.phone_number}
				/>

				<p className="required-text">
					<span className="required">*</span> Indicates required
				</p>

				<div className="contact-form-actions">
					<Button variant="outlined" onClick={onDismiss}>
						Cancel
					</Button>
					<Button type="submit">{contact ? "Update" : "Add"}</Button>
				</div>
			</section>
		</form>
	);
};

export default ContactForm;
