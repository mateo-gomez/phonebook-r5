import Button from "./Button";

export const InputSearch = ({ onChange }) => {
	return (
		<div className="search-container">
			<form action="" method="get">
				<input
					className="search-input"
					type="search"
					name="search"
					placeholder="Search..."
					onChange={onChange}
				/>

				<Button className="search-button">🔍</Button>
			</form>
		</div>
	);
};

export default InputSearch;
