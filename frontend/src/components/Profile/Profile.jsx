import React, {useState} from "react";
import clsx from "clsx";
import styles from "./Profile.module.scss";
import SignInForm from "./SignInForm";
import Modal from "../Modal";
import {DEFAULT_NAME} from "../../lib/constants";
import Button from "../Button";


export default function Profile({ className, name, setName, modalProps }) {
	const [isOpened, setOpened] = useState(!name || name === DEFAULT_NAME);

	return <React.Fragment>
		<Button
			className={clsx(styles.container, className)}
			onClick={() => setOpened(true)}
		>
			{name ?? DEFAULT_NAME}
		</Button>
		{isOpened ? <Modal {...modalProps} >
			<SignInForm
				name={name}
				setName={(nextName) => {
					setName(nextName);
					setOpened(false);
				}}
			/>
		</Modal> : null}
	</React.Fragment>;
}
