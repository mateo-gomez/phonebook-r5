import { forwardRef } from "react";

const Input = ({ label, required, name, ...rest }, ref) => {
	console.log("label", label);

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
				required={required ? "on" : "off"}
				ref={ref}
				id={name}
				name={name}
			/>
		</p>
	);
};

export default forwardRef(Input);
