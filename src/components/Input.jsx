import { forwardRef } from "react";

const Input = ({ label, onChange, required, name, ...rest }, ref) => {
	const handleChange = (event) => {
		const text = event.target.value;

		onChange({ value: text, name });
	};

	return (
		<p className="form-control">
			<label htmlFor={name}>
				{required ? (
					<strong>
						<span aria-label="required" className="required">
							*
						</span>
					</strong>
				) : null}
				<span>{label} </span>
			</label>
			<input
				{...rest}
				onChange={handleChange}
				required={required ? "on" : "off"}
				ref={ref}
				id={name}
				name={name}
			/>
		</p>
	);
};

export default forwardRef(Input);
