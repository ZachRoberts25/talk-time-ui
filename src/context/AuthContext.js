import React, { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext({
  loaded: false,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user) {
      const auth = getAuth();
      const subscriber = onAuthStateChanged(auth, (u) => {
        if (u) {
          setUser(u);
        }
        setLoaded(true);
      });
      return subscriber;
    }
  }, []);

  const { Provider } = AuthContext;
  return <Provider value={{ user, loaded, setUser }}>{children}</Provider>;
};
