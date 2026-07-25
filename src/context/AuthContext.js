import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, isNewUser, setIsNewUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
