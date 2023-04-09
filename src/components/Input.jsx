import { forwardRef } from "react";

const Input = ({ label, required, name, ...rest }, ref) => {
	console.log("label", label);

	return (
		<p className="form-control">
			<label htmlFor={name}>
				<span>{label} </span>

				{required ? (
					<strong>
						<span aria-label="required" className="required">
							*
						</span>
					</strong>
				) : null}
			</label>
			<input
				{...rest}
				required={required ? "on" : "off"}
				ref={ref}
				id={name}
				name={name}
			/>
		</p>
	);
};

export default forwardRef(Input);
