import React from 'react';
import styles from './App.module.scss';
import Layout from '../Layout';
import Game from "../Game";
import {useSeaBattle} from "../../hooks/useSeaBattle";
import Profile from "../Profile";

function App() {
	const [state, dispatch] = useSeaBattle();

	return <Layout
		className={styles.app}
		header={<Profile
			name={state.playerName}
			setName={name => dispatch({
				type: "change-name",
				payload: name
			})}
		/>}
	>
		<Game
			state={state}
			dispatch={dispatch}
		/>
	</Layout>;
}

export default App;
