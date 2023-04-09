export const InputSearch = ({ onChange }) => {
	return (
		<input
			className="search"
			type="search"
			name="search"
			placeholder="Search..."
			onChange={onChange}
		/>
	);
};

export default InputSearch;
