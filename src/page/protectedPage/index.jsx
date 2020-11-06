import React from 'react';
import Authorized from "../../component/authorized";
import {awsLogout} from "../../lib/AWS";
import {useHistory} from 'react-router-dom';

const ProtectedPage = () => {
	const history = useHistory();

	const logOut = async () => {
		await awsLogout();
		history.replace('/');
	};

	return (
		<Authorized>
			You can see this page only if you are logged in.
			<button onClick={logOut}>Logout</button>
		</Authorized>
	);
};

export default ProtectedPage;
