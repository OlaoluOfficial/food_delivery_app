import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(() => {
    // Check local storage for user data on initial load
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      return null;
    }
  });
  useEffect(() => {
    // Update local storage when user changes
    try {
      localStorage.setItem("user", JSON.stringify(userInfo));
    } catch (error) {
      console.error("Error stringifying user data:", error);
    }
  }, [userInfo]);

  const loginUser = (userInfo) => {
    setUserInfo(userInfo);
  };

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, loginUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};
