import { createContext, useEffect, useState } from "react";
import { setAccessToken, saveRefreshToken, clearAccessToken, clearRefreshToken, getRefreshToken } from "../utils/tokenStore";
import { rotateTokenRequest } from "../api/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = (accessToken, refreshToken, isNewUser = false) => {
    setAccessToken(accessToken);
    saveRefreshToken(refreshToken);
    setIsLoggedIn(true);
    setIsNewUser(isNewUser);
  }

  const logout = () => {
    clearRefreshToken();
    setIsLoggedIn(false);
    setIsNewUser(false);
  }

  const bootstrap = async () => {
    setIsLoading(true);
    try {
        const refreshToken = await getRefreshToken();
        console.log("Refresh Token:", refreshToken);
        if (!refreshToken){
          console.log("No refresh token found."); 
          setIsLoggedIn(false);
          return;
        }

        const data = await rotateTokenRequest(refreshToken);

        setAccessToken(data.accessToken);
        saveRefreshToken(data.refreshToken);
        setIsLoggedIn(true);
      }
      catch (e) {
        // Can be network error; Can be "Refresh Token has been revoked error"
        // Can be Refresh token has expired error.

        // In any case, logout the user.
        // But we should only clear the refresh token if the error was from server.

        // Need to add a check here.
        clearAccessToken();
        clearRefreshToken();
        setIsLoggedIn(false);
        console.log("Error in bootstrap:", e);
      }
      finally {
        setIsLoading(false);
      }
  }

  useEffect(()=>{
    bootstrap();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, isLoggedIn, isNewUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
