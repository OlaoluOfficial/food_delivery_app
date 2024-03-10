import { createContext, useState } from "react";

const AdminContext = createContext({});

export function AdminContextProvider({ children }) {
  const [adminInfo, setAdminInfo] = useState({});
  return (
    <AdminContext.Provider value={{ adminInfo, setAdminInfo }}>
      {children}
    </AdminContext.Provider>
  );
}

export default AdminContext;
