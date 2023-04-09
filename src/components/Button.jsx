const Button = ({
	variant = "contained",
	type = "button",
	onClick,
	children,
	...rest
}) => {
	return (
		<button
			className={`button ${variant}`}
			type={type}
			onClick={onClick}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;
