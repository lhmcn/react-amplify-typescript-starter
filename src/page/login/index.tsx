import React, {FC, useEffect} from 'react';
import {AmplifyAuthenticator, AmplifySignUp} from '@aws-amplify/ui-react';
import {AuthState, onAuthUIStateChange} from '@aws-amplify/ui-components';
import {useHistory, useLocation} from 'react-router-dom';
import styles from './style.module.scss';

const DEFAULT_REDIRECT: string = '/';

const Index: FC = () => {
	const history = useHistory();
	const location = useLocation();

	let returnUrl = location.search.substring(1).split('&').find(s => s.startsWith('return='));
	returnUrl = returnUrl ? returnUrl.split('=')[1] : DEFAULT_REDIRECT;

	useEffect(() => {
		onAuthUIStateChange((newAuthState: AuthState) => {
			if (newAuthState === AuthState.SignedIn) {
				history.replace(returnUrl as string);
			}
		});
	}, []);

	return (
		<div className={styles.container}>
			<AmplifyAuthenticator usernameAlias="email">
				<AmplifySignUp
					slot="sign-up"
					usernameAlias="email"
					formFields={[
						{
							type: "email",
							required: true,
						},
						{
							type: "password",
							required: true,
						}
					]}
				/>
				<h2>You are logged in.</h2>
			</AmplifyAuthenticator>
		</div>
	);
};

export default Index;
