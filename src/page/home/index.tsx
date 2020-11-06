import React, {FC} from 'react';
import Welcome from '../../component/welcome'
import {Link} from "react-router-dom";

const Home: FC = () => {
	return (
		<div>
			<Welcome/>
			<Link to='/protected'>Go to the protected page</Link>
		</div>
	);
};

export default Home;
