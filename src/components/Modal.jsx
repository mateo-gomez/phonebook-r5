import { createPortal } from "react-dom";
import Card from "./Card";
import { useEffect } from "react";

const Modal = ({ children, show = false, onClose = () => {} }) => {
	const portalContainer = document.getElementById("portal");

	useEffect(() => {
		const clickout = (e) => {
			if (e.target === portalContainer.firstChild) {
				console.log("on", onClose);
				onClose();
			}
		};

		const keyDown = (e) => {
			if (e.code === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", keyDown);

		if (portalContainer) portalContainer.addEventListener("click", clickout);

		return () => {
			document.removeEventListener("keydown", keyDown);

			if (portalContainer)
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
