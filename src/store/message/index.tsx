import React, {Context, FC, useReducer} from 'react';
import {IContextProps} from '../store';
import {initState, reducer} from './reducer';

export {MessageContext, MessageProvider};

const MessageContext: Context<IContextProps> = React.createContext({} as IContextProps);

const MessageProvider: FC = (props) => {
	const [state, dispatch] = useReducer(reducer, initState);

	return (
		<MessageContext.Provider value={{state, dispatch}}>
			{props.children}
		</MessageContext.Provider>
	);
};
