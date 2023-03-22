import React, { createContext, useContext, useEffect, useState } from "react"
import cookie from "js-cookie"

export const AppContext = createContext({})
export const useAppCtx = () => useContext(AppContext)

export const AppProvider = ({children}) => {
  const [ user, setUser ] = useState(null)
  const [userCart, setUserCart] = useState([]);

  const verifyUser = async () => {
    const authCookie = cookie.get("auth-token");
    if (authCookie) {
      const query = await fetch("/api/user/verify", {
        method: "post",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": authCookie,
        },
      });
      if (query.ok) {
        const result = await query.json();
        if (result) {
          setUser(result);
          console.log("User verified:", result);
        }
      } else {
        console.error('Error verifying user:', await query.text());
      }
    }
  };
  

  useEffect(() => {
    verifyUser()
  },[])

  return (
    <AppContext.Provider value={{ user, userCart, setUserCart }}>
      {children}
    </AppContext.Provider>
  )
}