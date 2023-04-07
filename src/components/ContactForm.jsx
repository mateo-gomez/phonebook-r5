import Button from "./Button";

const ContactForm = ({ onSubmit, onDismiss }) => {
	return (
		<form onSubmit={onSubmit} className="contact-form">
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
				<Button type="submit">Add</Button>
				<Button onClick={onDismiss}>Cancel</Button>
			</div>
		</form>
	);
};

export default ContactForm;
