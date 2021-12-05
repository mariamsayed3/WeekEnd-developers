import {createContext, useState} from "react";

export const UserContext = createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({children}) => {
  const user = sessionStorage.getItem("user") || "{}"
  const parsedUser = JSON.parse(user)
  const [Email, setEmail] = useState(parsedUser.Email || null);
  const [Admin, setAdmin] = useState(parsedUser.Admin || null);
  const [Token, setToken] = useState(parsedUser.Token || null);
  const [FirstName, setFirstName] = useState(parsedUser.FirstName || null);
  const [LastName, setLastName] = useState(parsedUser.LastName || null);
  
  return (
    <UserContext.Provider
      value={{
        Email,
        setEmail,
        Admin,
        setAdmin,
        FirstName,
        setFirstName,
        LastName,
        setLastName,
        Token,
        setToken
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
