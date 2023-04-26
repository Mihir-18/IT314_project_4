import AuthModalContext from './AuthModalContext';
import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import Routing from './Routing.js';
import PostFormModalContext from './PostFormModalContext.js'; 

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState({});
  const [showPostFormModal ,setShowPostFormModal]= useState(false);
  

  useEffect(() => {
    axios.get('http://localhost:4000/user', { withCredentials: true })
      .then(response => setUser(response.data)).catch(e => {console.log(e)});  
  }, []);

  function logout(){
    axios.post('http://localhost:4000/logout', {}, {withCredentials:true})
    .then(() => setUser({}));
  }

  return (
    <AuthModalContext.Provider value={{ show: showAuthModal, setShow: setShowAuthModal }}>
      <PostFormModalContext.Provider value={{show: showPostFormModal, setShow:setShowPostFormModal}}>
        <UserContext.Provider value={{...user, logout, setUser}}>
          <Routing />
        </UserContext.Provider>
      </PostFormModalContext.Provider>
    </AuthModalContext.Provider>
  );
}

export default App;
