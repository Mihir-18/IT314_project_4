import BoardHeader from './BoardHeader';
import Header from './Header';
import PostForm from './PostForm';
import AuthModal from './AuthModal';
import AuthModalContext from './AuthModalContext';
import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserContext from './UserContext';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState({});

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
      <UserContext.Provider value={{...user, logout, setUser}}>
        <Header />
        <BoardHeader />
        <PostForm />
        <AuthModal />
        <div className="bg-reddit_dark px-6 text-reddit_text">
          <div className='border border-reddit_border bg-reddit_dark-brighter rounded-md'>
            
          </div>
        </div>
      </UserContext.Provider>
    </AuthModalContext.Provider>
  );
}

export default App;
