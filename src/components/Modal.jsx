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

		portalContainer.addEventListener("click", clickout);

		return () => {
			portalContainer.removeEventListener("click", clickout);
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
