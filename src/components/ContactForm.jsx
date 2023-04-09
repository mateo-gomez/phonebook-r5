import { useEffect, useRef } from "react";
import Button from "./Button";
import Input from "./Input";

const ContactForm = ({ onSubmit, onDismiss, contact = null }) => {
	const formRef = useRef(null);

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
			first_name: data.get("first_name").trim(),
			last_name: data.get("last_name").trim(),
			phone_number: data.get("phone_number").trim(),
		};

		onSubmit(newContact);
	};

	useEffect(() => {
		const form = formRef.current;

		const keyDown = (e) => {
			if (e.target === "Enter") {
				form?.click();
			}
		};

		form?.addEventListener("keydown", keyDown);

		return () => {
			form?.removeEventListener("keydown", keyDown);
		};
	}, []);

	return (
		<form ref={formRef} onSubmit={handleSubmit} className="contact-form">
			<section>
				<h2>Contact information</h2>

				<Input
					required
					ref={firstNameRef}
					minLength={3}
					maxLength={20}
					placeholder=" E.g: Julio"
					label="First name"
					type="text"
					id="first_name"
					name="first_name"
					autoFocus="on"
				/>

				<Input
					required
					ref={lastNameRef}
					minLength={3}
					maxLength={20}
					label="Last name"
					placeholder="E.g: Perez"
					type="text"
					id="last_name"
					name="last_name"
				/>
				<Input
					required
					ref={phoneNumberRef}
					label="Phone number"
					placeholder="Must have at least 6 numbers"
					type="tel"
					minLength={6}
					maxLength={10}
					id="phone_number"
					name="phone_number"
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
