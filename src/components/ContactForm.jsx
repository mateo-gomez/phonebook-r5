import { useEffect, useRef } from "react";
import Button from "./Button";

const ContactForm = ({ onSubmit, onDismiss, contact = null }) => {
	const firstNameRef = useRef(null);
	const lastNameRef = useRef(null);
	const phoneNumberRef = useRef(null);

	useEffect(() => {
		if (contact) {
			firstNameRef.current.value = contact.first_name;
			lastNameRef.current.value = contact.last_name;
			phoneNumberRef.current.value = contact.phone_number;
		}
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = new FormData(event.target);

		const newContact = {
			id: contact ? contact.id : null,
			first_name: data.get("first_name"),
			last_name: data.get("last_name"),
			phone_number: data.get("phone_number"),
		};

		onSubmit(newContact);
	};

	return (
		<form onSubmit={handleSubmit} className="contact-form">
			<section>
				<h2>Contact information</h2>

				<p>
					<label htmlFor="first_name">
						<span>First name: </span>

						<strong>
							<span aria-label="required">*</span>
						</strong>
					</label>
					<input
						required
						ref={firstNameRef}
						type="text"
						id="first_name"
						name="first_name"
						autoFocus="on"
					/>
				</p>
				<p>
					<label htmlFor="last_name">
						<span>Last name: </span>

						<strong>
							<span aria-label="required">*</span>
						</strong>
					</label>
					<input
						required
						ref={lastNameRef}
						type="text"
						id="last_name"
						name="last_name"
					/>
				</p>
				<p>
					<label htmlFor="phone_number">
						<span>Phone: </span>

						<strong>
							<span aria-label="required">*</span>
						</strong>
					</label>
					<input
						required
						ref={phoneNumberRef}
						type="tel"
						id="phone_number"
						name="phone_number"
					/>
				</p>
			</section>

			<div className="contact-actions">
				<Button type="submit">{contact ? "Update" : "Add"}</Button>
				<Button onClick={onDismiss}>Cancel</Button>
			</div>
		</form>
	);
};

export default ContactForm;
