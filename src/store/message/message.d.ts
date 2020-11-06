export {IMessage, IMessageState};

interface IMessage {
	timestamp: number,
	content: string,
}

interface IMessageState {
	messages: IMessage[],
}
