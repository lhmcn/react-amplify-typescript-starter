import {Dispatch} from "react";

export {IAction, IContextProps};

interface IAction {
	type: string,

	[x: string]: any,
}

interface IContextProps {
	state: { [x: string]: any },
	dispatch: Dispatch<IAction>,
}
