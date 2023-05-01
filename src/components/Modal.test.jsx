import { cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Modal from "./Modal";
import userEvent from "@testing-library/user-event";

describe("Modal", () => {
	const onClose = vi.fn();

	afterEach(() => {
		cleanup();
		onClose.mockClear();
	});

	it("should show modal", async () => {
		render(<Modal show />, {
			container: createPortalEntryPoint(),
		});
	});

	it("should hide modal on esc key pressed", async () => {
		const { container } = render(<Modal show onClose={onClose} />, {
			container: createPortalEntryPoint(),
		});

		const modal = container.firstChild;

		userEvent.type(modal, "{esc}");

		await waitFor(() => {
			expect(onClose).toHaveBeenCalled();
		});
	});

	it("should hide modal on esc key pressed", async () => {
		const { container } = render(<Modal show onClose={onClose} />, {
			container: createPortalEntryPoint(),
		});

		const modal = container.firstChild;

		userEvent.click(modal);

		await waitFor(() => {
			expect(onClose).toHaveBeenCalled();
		});
	});
});

const createPortalEntryPoint = () => {
	const portalContainer = document.createElement("div");

	portalContainer.id = "portal";
	document.body.appendChild(portalContainer);

	return portalContainer;
};
