import {IMessage, IMessageState} from "./message";
import {IAction} from "../store";

export {initState, reducer};

const initState: IMessageState = {
	messages: [],
};

const reducer = (state: IMessageState, action: IAction): IMessageState => {
	switch (action.type) {
		case 'ADD':
			const messages: IMessage[] = [action.message, ...state.messages];
			return {messages};
		default:
			return state;
	}
};
