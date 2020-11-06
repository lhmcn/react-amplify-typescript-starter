import React, {FC, useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {awsSession} from '../../lib/AWS';


const Authorized: FC = (props) => {
	const [authorized, setAuthorized] = useState<boolean>(true);
	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		const checkSession = async () => {
			try {
				await awsSession();
				setAuthorized(true);
			} catch (err) {
				setAuthorized(false)
			}
		};

		checkSession();
	});

	if (authorized) {
		return props.children as React.ReactElement;
	}

	history.replace(`/login?return=${escape(location.pathname)}`);
	return null;
};

export default Authorized;
