import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import Input from "./Input";

describe("Input", () => {
	afterEach(cleanup);

	it("should render an input", () => {
		render(<Input />);
	});

	it('should show an input with label "First name"', () => {
		render(<Input label="First name" name="first_name" />);

		screen.getByLabelText("First name");
	});
});
