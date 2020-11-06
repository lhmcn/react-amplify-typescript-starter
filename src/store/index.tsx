import React, {FC, PropsWithChildren, ReactElement} from "react";
import {MessageProvider} from "./message";

// Register providers here
const providers = [
	MessageProvider,
];

interface ComposerProps extends PropsWithChildren<{}> {
	providers: any[],
}

const ProviderComposer = (props: ComposerProps): ReactElement => (
	props.providers.reduce((children: any, Parent: any) => (
		<Parent>{children}</Parent>
	), props.children)
);

const Store: FC = (props) => {
	return (
		<ProviderComposer providers={providers}>
			{props.children}
		</ProviderComposer>
	);
};

export default Store;
