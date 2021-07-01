import React from 'react';
import {useState, useRef, createContext} from 'react';

export const LoadingContext = createContext();

export const LoadingProvider = props => {

	const [loading, setLoading] = useState(true);
	
	return(
		<LoadingContext.Provider value={[loading, setLoading]}>
			{props.children}
		</LoadingContext.Provider>
	);
}