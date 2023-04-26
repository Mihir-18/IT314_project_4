import Input from "./Input";
import Button from "./Button";
import { useState, useContext, useEffect, useRef } from "react";
import axios from 'axios';
import AuthModalContext from "./AuthModalContext";
import UserContext from "./UserContext";

function AuthModal(props) {
     const [registerStatus, setregisterStatus] = useState('');
     const [modalType, setModalType] = useState('login');
     const [email, setEmail] = useState('');
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');

     const modalContext = useContext(AuthModalContext);
     const user = useContext(UserContext);
     const visibleClass = modalContext.show ? 'block' : 'hidden';

     if (modalContext.show && modalContext.show !== modalType) {
          setModalType(modalContext.show);
     }
     async function register(event) {
          event.preventDefault();
          const data = { email, username, password };
          const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
          if (regex.test(email)) {
               axios.post('http://localhost:4000/register', data, { withCredentials: true })
                    .then((response) => {
                         console.log(response);
                         if (response.data === "Invalid username or password") {
                              setregisterStatus("invalid");
                         }
                         else {
                              setregisterStatus("");
                              user.setUser({ username });
                              modalContext.setShow(false);
                         }
                    }).catch(err => {
                         console.log(err);
                    });
               setEmail('');
               setUsername('');
               setPassword('');
          }
          else{
               setregisterStatus("invalid");
          }


     }

     function login(event) {
          event.preventDefault();
          const data = { username, password };
          axios.post('http://localhost:4000/login', data, { withCredentials: true })
               .then((response) => {
                    if (response.data === "Invalid username or password") {
                         setregisterStatus("invalid");
                    }
                    else {
                         console.log(response)
                         modalContext.setShow(false);
                         user.setUser({ username });
                         setregisterStatus("");
                    }
               })
          setEmail('');
          setUsername('');
          setPassword('');
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


     // function toggleUserDropdown() {
     // if (modalContext.show) {
     //      modalContext.show(false);
     // }
     // else {
     //      modalContext.show(true);
     // }
     // }
     return (
          <div className={"w-screen h-screen absolute top-0 left-0 z-30 flex " + visibleClass} style={{ backgroundColor: 'rgba(0,0,0,.6)' }}>
               <button className="border border-reddit_dark-brightest w-3/4 sm:w-1/2 lg:w-1/4 bg-reddit_dark p-5 text-reddit_text mx-auto self-center rounded-md " ref={userDropdownRef}>
                    {modalType === 'login' && (
                         <h1 className="text-2xl mb-5">Log In</h1>
                    )}
                    {modalType === 'register' && (
                         <h1 className="text-2xl mb-5">Register</h1>
                    )}
                    {registerStatus === 'invalid' && (
                         <h4 className="text-red-700">Invalid Credentials</h4>
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
                         <Button className='w-full py-2 mb-3 ' style={{ borderRadius: '.3rem' }} onClick={event => login(event)}>
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
                              New to Reddit? <button className="text-blue-600" onClick={() => modalContext.setShow('register') }>SIGN UP</button>
                         </div>
                    )}
                    {modalType === 'register' && (
                         <div>
                              Already have an account? <button className="text-blue-600" onClick={() => modalContext.setShow('api') }>LOG IN</button>
                         </div>
                    )}

               </button>
          </div>
     );
}
export default AuthModal;