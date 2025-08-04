import React, { useState } from 'react';
import clsx from 'clsx';
import Button from '../Button';
import styles from './Form.module.scss';

function InputText({ className, label, value, onChange, ...props }) {
	return (
		<input
			{...props}
			value={String(value)}
			onChange={({ target }) => onChange(target.value)}
			className={clsx(styles.input, className)}
		/>
	);
}

function InputNumber({
	className,
	label,
	value,
	onChange,
	...props
}) {
	return (
		<input
			{...props}
			type="number"
			value={String(value)}
			onChange={({ target }) => onChange(Number(target.value))}
			className={clsx(styles.input, className)}
		/>
	);
}

function InputBoolean({ className, label, value, onChange, ...props }) {
	return (
		<input
			{...props}
			type="checkbox"
			checked={Boolean(value)}
			onChange={({ target }) => onChange(target.checked)}
			className={clsx(styles.input, className)}
		/>
	);
}

const selectInputType = (props) => {
	switch (props.type) {
		case 'number':
			return InputNumber;
		case 'boolean':
			return InputBoolean;
		default:
			return InputText;
	}
};

function Field({ className, inputClassName, label, ...props }) {
	const Input = selectInputType(props);

	return (
		<label className={styles.field}>
			{label ? <span className={styles.label}>{label}</span> : null}
			<Input {...props} />
		</label>
	);
}

export default function Form({
	className,
	title,
	fields = {},
	value = {},
	onSubmit,
}) {
	const [state, setState] = useState(value);

	return (
		<form
			className={clsx(styles.form, className)}
			onSubmit={(event) => {
				event.preventDefault();
				onSubmit(state);
				return false;
			}}
		>
			{title ? <h2>{title}</h2> : null}

			{Object.keys(state).map((name) => {
				const input = fields[name];

				return (
					<Field
						{...input}
						key={name}
						value={state[name]}
						onChange={(nextValue) =>
							setState({
								...state,
								[name]: nextValue,
							})
						}
					/>
				);
			})}

			<Button type="submit" label="Сохранить" variant="primary" />
		</form>
	);
}
