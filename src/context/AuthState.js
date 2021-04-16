import React, { useState, useMemo } from 'react';
import AuthContext from './auth-context';

const AuthState = (props) => {
	const [ user, setUser ] = useState(null);
	const value = useMemo(() => ({ user, setUser }), [ user, setUser ]);

	return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

export default AuthState;
