import Input from "./Input";
import Button from "./Button";
import { useState, useContext, useEffect, useRef } from "react";
import axios from 'axios';
import AuthModalContext from "./AuthModalContext";
import UserContext from "./UserContext";

function AuthModal(props) {
     const [modalType, setModalType] = useState('login');
     const [email, setEmail] = useState('');
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');

     const modalContext = useContext(AuthModalContext);
     const user = useContext(UserContext);
     const visibleClass = modalContext.show ? 'block' : 'hidden';

     if(modalContext.show && modalContext.show !==modalType)
     {
          setModalType(modalContext.show);
     }
     function register(event) {
          event.preventDefault();
          const data = { email, username, password };
          axios.post('http://localhost:4000/register', data, { withCredentials: true })
               .then(() => user.setUser({username}));
          modalContext.setShow(false);
          setEmail('');
          setUsername('');
          setPassword('');

     }

     function login(){
          const data={username, password};
          axios.post('http://localhost:4000/login', data)
               .then(() => {
                    modalContext.setShow(false);
                    user.setUser({username})
               });
     }

     function useUserDropdown(ref) {
          useEffect(() => {
               function handleClickOutside(event) {
                    if (ref.current && !ref.current.contains(event.target)) {
                         modalContext.setShow(false);
                    }
               }
               document.addEventListener("mousedown", handleClickOutside);
               return () => {
                    document.removeEventListener("mousedown", handleClickOutside);
               };
          }, [ref]);
     }
     const userDropdownRef = useRef(null);
     useUserDropdown(userDropdownRef);

     
     function toggleUserDropdown(){
          if(modalContext.show){
            modalContext.show(false);
          }
          else{
               modalContext.show(true);
          }
        }
     return (
          <div className={"w-screen h-screen absolute top-0 left-0 z-20 flex " + visibleClass} style={{ backgroundColor: 'rgba(0,0,0,.6)' }}>
                    <button className="border border-reddit_dark-brightest w-3/4 sm:w-1/2 md:w-1/4 bg-reddit_dark p-5 text-reddit_text mx-auto self-center rounded-md " onClick={toggleUserDropdown} ref={userDropdownRef}>
                              {modalType === 'login' && (
                                   <h1 className="text-2xl mb-5">Log In</h1>
                              )}
                              {modalType === 'register' && (
                                   <h1 className="text-2xl mb-5">Register</h1>
                              )}
                              {modalType === 'register' && (
                                   <label>
                                        <span className="text-reddit_text-darker text-sm">Email:</span>
                                        <Input type="email" className='mb-3 w-full' value={email} onChange={event => setEmail(event.target.value)} />
                                   </label>
                              )}
                              <label>
                                   <span className="text-reddit_text-darker text-sm" >Username:</span>
                                   <Input type="text" className='mb-3 w-full' value={username} onChange={event => setUsername(event.target.value)} />
                              </label>
                              <label>
                                   <span className="text-reddit_text-darker text-sm">Password:</span>
                                   <Input type="password" className='mb-3 w-full' value={password} onChange={event => setPassword(event.target.value)} />
                              </label>
                              {modalType === 'login' && (
                                   <Button className='w-full py-2 mb-3 ' style={{ borderRadius: '.3rem' }} onClick={()=>login()}>
                                        Log In
                                   </Button>
                              )}
                              {modalType === 'register' && (
                                   <Button className='w-full py-2 mb-3 ' style={{ borderRadius: '.3rem' }} onClick={event => register(event)} >
                                        Sign Up
                                   </Button>
                              )}

                              {modalType === 'login' && (
                                   <div>
                                        New to Reddit? <button className="text-blue-600" onClick={() => setModalType('register')}>SIGN UP</button>
                                   </div>
                              )}
                              {modalType === 'register' && (
                                   <div>
                                        Already have an account? <button className="text-blue-600" onClick={() => setModalType('login')}>LOG IN</button>
                                   </div>
                              )}

                    </button>
          </div>
     );
}
export default AuthModal;