import { afterEach, describe, expect, it, vi } from "vitest";
import Button from "./Button";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";

describe("Button", () => {
	afterEach(cleanup);

	it("should render", () => {
		render(<Button />);
	});

	it("should render button text correctly", () => {
		render(<Button>Submit</Button>);

		screen.getByText("Submit");
	});

	it("should be type submit", () => {
		render(<Button type="submit" />);

		const button = screen.getByRole("button");

		expect(button).toHaveProperty("type", "submit");
	});

	it("should render outlined button variant", () => {
		render(<Button variant="outlined" />);

		const button = screen.getByRole("button");

		expect(button).toHaveProperty("className", "button outlined");
	});

	it("should execute callback on click listener", async () => {
		const onClick = vi.fn();
		render(<Button onClick={onClick} />);

		const button = screen.getByRole("button");

		user.click(button);

		await waitFor(() => {
			expect(onClick).toHaveBeenCalled();
		});
	});
});
