import { createPortal } from "react-dom";
import Card from "./Card";
import { useEffect } from "react";

const Modal = ({ children, show = false, onClose }) => {
	const portalContainer = document.getElementById("portal");

	useEffect(() => {
		const clickout = (e) => {
			if (e.target === portalContainer.firstChild) {
				onClose();
			}
		};

		const keyDown = (e) => {
			if (e.code === "Escape") {
				onClose();
			}
		};

		if (portalContainer) {
			portalContainer.addEventListener("click", clickout);
			portalContainer.addEventListener("keydown", keyDown);
		}

		return () => {
			if (portalContainer) {
				portalContainer.removeEventListener("click", clickout);
				portalContainer.removeEventListener("keydown", keyDown);
			}
		};
	}, []);

	return show
		? createPortal(
				<div className="portal">
					<Card className={`modal ${show ? "" : "hidden"}`}>{children}</Card>
				</div>,
				portalContainer
		  )
		: null;
};

export default Modal;
