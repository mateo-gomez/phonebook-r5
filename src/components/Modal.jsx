import { createPortal } from "react-dom";
import Card from "./Card";
import { useEffect } from "react";
const portalContainer = document.getElementById("portal");

const Modal = ({ children, show = false, onClose }) => {
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

		portalContainer.addEventListener("click", clickout);
		portalContainer.addEventListener("keydown", keyDown);

		return () => {
			portalContainer.removeEventListener("click", clickout);
			portalContainer.removeEventListener("keydown", keyDown);
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
