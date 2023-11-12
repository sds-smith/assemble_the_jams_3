import { createContext, useState, useEffect } from "react";
import { httpGetClientToken, httpGetSession } from "../utils/http.requests/auth";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [hasClientToken, setHasClientToken] = useState(false);
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

    const currentUserExists = Boolean(authenticatedUser);

    useEffect(() => {
        (async () => {
          if (!hasClientToken) {
            const { hasClientToken } = await httpGetClientToken();
            setHasClientToken(hasClientToken);
          }
        })();
      }, [])
    
      useEffect(() => {
        (async () => {
          const { user } = await httpGetSession();
          console.log({user})
          if (Boolean(user)) setAuthenticatedUser(user)
        })();
      },[]);

    const value = {
        hasClientToken, setHasClientToken,
        authenticatedUser, setAuthenticatedUser,
        currentUserExists
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}