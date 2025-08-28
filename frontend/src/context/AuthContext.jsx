import { createContext, useState, useContext } from "react";

// 1. Create a context object
const AuthContext = createContext();

// 2. Make a provider component
export function AuthProvider({ children }) {
  // isLoggedIn state will be stored here
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Provide value to all children components
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Custom hook for easier use
export function useAuth() {
  return useContext(AuthContext);
}
