
import React, {useEffect, useState} from 'react';

export const CurrentUserContext = React.createContext()

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    fetchCurrentUser()
}, [])

const fetchCurrentUser = async () => {
  let response = await fetch("https://localhost:7100/api/Authenticate/loggeduser", {
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
})
.then((res) => {
  if(!res.ok){
      throw Error('Not authorized!')
  }
  return res.json();
}).then(result=>{
  setCurrentUser(result);
  setAuthed(true);
  setLoading(false);
}).catch(err =>{
  setAuthed(false);
  setLoading(false);
  setCurrentUser(null);
})

}

  return (
    <CurrentUserContext.Provider value={{ currentUser,authed, fetchCurrentUser,setAuthed, loading }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export const useCurrentUser = () => React.useContext(CurrentUserContext)