import { createContext, useState, useContext, useEffect } from "react";

const AdminContext = createContext({});

export function AdminContextProvider({ children }) {
  const [adminInfo, setAdminInfo] = useState(() => {
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
      localStorage.setItem("user", JSON.stringify(adminInfo));
    } catch (error) {
      console.error("Error stringifying user data:", error);
    }
  }, [adminInfo]);

  const loginUser = (adminInfo) => {
    setAdminInfo(adminInfo);
  };

  return (
    <AdminContext.Provider value={{ adminInfo, loginUser, setAdminInfo }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  return useContext(AdminContext);
};
