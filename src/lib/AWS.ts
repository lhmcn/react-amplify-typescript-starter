import Amplify, {API, Auth, Signer, Storage} from 'aws-amplify';
import config from '../config/awsConfig';
import {ICredentials} from "aws-amplify/lib/Common/types/types";

export * from '@aws-amplify/ui-react';
export {
	awsLogout,
	awsSession,
	awsAPI,
	s3Upload,
	s3Get,
	s3Remove,
	signUrl,
};


const apiName = 'api';

Amplify.configure({
	Auth: {
		mandatorySignIn: true,
		region: config.cognito.REGION,
		userPoolId: config.cognito.USER_POOL_ID,
		identityPoolId: config.cognito.IDENTITY_POOL_ID,
		userPoolWebClientId: config.cognito.APP_CLIENT_ID,
	},
	Storage: {
		region: config.s3.REGION,
		bucket: config.s3.BUCKET,
	},
	API: {
		endpoints: [
			{
				name: apiName,
				endpoint: config.apiGateway.URL,
				region: config.apiGateway.REGION,
			},
		],
	},
});

/**
 * Logs the current user out.
 */
const awsLogout = async () => {
	try {
		await Auth.signOut();
	} catch (e) {
		console.log(e);
	}
};

/**
 * Gets the session of current user.
 * Throws Exception if current user is not logged in.
 */
const awsSession = async () => {
	const user = await Auth.currentSession();
	const idToken = user.getIdToken();
	return {
		username: idToken.payload['cognito:username'],
		email: idToken.payload.email,
	};
};

type Methods = 'get' | 'post' | 'put' | 'del' | 'patch' | 'head';

interface QueryParams {
	queryStringParameters?: object,
	body?: object,
}

/**
 * Invokes an API through AWS API Gateway
 * @param method get/post/put/del/patch/head
 * @param path The request path
 * @param params Parameters of the request, in an object of key-value pairs
 * @return Returns data object from the API
 */
const awsAPI = async (method: Methods, path: string, params: object = {}) => {
	const queryParams: QueryParams = {};

	if (method === 'get' || method === 'del') {
		queryParams.queryStringParameters = params;
	} else {
		queryParams.body = params;
	}

	// @ts-ignore
	return await API[method](apiName, path, queryParams);
};

type AccessLevel = 'private' | 'protected' | 'public';

/**
 * Uploads a file to S3 bucket
 * @param file The file object.
 * @param accessLevel public/protected/private
 * @return Returns the storage key of the file.
 */
const s3Upload = async (file: any, accessLevel: AccessLevel = 'public') => {
	const filename = `${Date.now()}-${file.name}`;
	const params = {
		level: accessLevel,
		contentType: file.type,
	};
	return await Storage.put(filename, file, params);
};

/**
 * Gets the access url of a file in the S3 bucket
 * @param key The storage key of the file
 * @param accessLevel public/protected/private
 * @param removeSignature By default, the url comes with the signature. If you are accessing a public bucket,
 * you can choose to remove the signature so that the url can be used forever.
 * @return Returns the url
 */
const s3Get = async (key: string, accessLevel: AccessLevel = 'public', removeSignature: boolean = false) => {
	const params = {
		level: accessLevel,
	};

	try {
		const url = await Storage.get(key, params);
		if (removeSignature) {
			const arr = (url as string).split('?');
			return arr[0];
		} else {
			return url;
		}
	} catch (e) {
		console.log(e);
		return '';
	}
};

/**
 * Removes a file in the S3 bucket
 * @param key The storage key of the file
 * @param accessLevel public/protected/private
 */
const s3Remove = async (key: string, accessLevel: AccessLevel = 'public') => {
	const params = {
		level: accessLevel,
	};

	try {
		Storage.configure(params);
		return await Storage.remove(key);
	} catch (e) {
		console.log(e);
		return '';
	}
};

/**
 * Adds signature to an url to gain access on behalf of current user.
 * @param url The url to be signed
 */
const signUrl = async (url: string): Promise<string> => {
	const credentials: ICredentials = await Auth.currentCredentials();

	const accessInfo = {
		access_key: credentials.accessKeyId,
		secret_key: credentials.secretAccessKey,
		session_token: credentials.sessionToken,
	}

	return Signer.signUrl(url, accessInfo);
}
