import React from 'react';
import clsx from 'clsx';
import logo from '../../images/logo.svg';
import styles from './Layout.module.scss';
import { PROJECT_NAME } from '../../lib/constants';

export default function Layout({ children, className, header, footer }) {
	return (
		<div className={clsx(styles.container, className)}>
			<header className={styles.header}>
				<h1>{PROJECT_NAME}</h1>
				{header}
			</header>
			<main className={styles.main}>{children}</main>
			<footer className={styles.footer}>
				<div className={styles.madeby}>
					Сделано в
					<a
						href="https://practicum.yandex.ru/"
						target="_blank"
						rel="noreferrer"
					>
						<img className={styles.logo} src={logo} alt="Яндекс Практикум" />
					</a>
				</div>
				{footer}
			</footer>
		</div>
	);
}
