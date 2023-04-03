import Logo from './logo.png';
import { BellIcon, ChatIcon, ChevronDownIcon, LoginIcon, LogoutIcon, PlusIcon, SearchIcon, UserIcon } from '@heroicons/react/outline';
import Avatar from './avatar.png'
import Button from './Button';
import { useState, useEffect, useRef, useContext } from 'react';
import AuthModalContext from './AuthModalContext';
import UserContext from './UserContext';

function Header() {
  const [userDropdownVisibilityClass, setuserDropdownVisibilityClass] = useState('hidden');

  function useUserDropdown(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setuserDropdownVisibilityClass('hidden');
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

  function toggleUserDropdown() {
    if (userDropdownVisibilityClass === 'hidden') {
      setuserDropdownVisibilityClass('block');
    }
    else {
      setuserDropdownVisibilityClass('hidden');
    }
  }

  const authModal = useContext(AuthModalContext);
  const user = useContext(UserContext);

  return (
    <header className='flex bg-reddit_dark w-full p-2'>
      <div className="mx-4 flex relative">
        <img src={Logo} alt="" className='w-8 h-8 bg-reddit_dark' />
        <form action="" className='bg-redddt_dark-brighter flex mx-4 p-1 px-3 rounded-md border border-reddit_border flex-grow'>
          <SearchIcon className='text-gray-400 h-6 w-6 mt-1' />
          <input type="text" placeholder='Search' className='bg-reddit_dark-brighter p-1 pl-2 pr-0 focus:outline-none text-white text-sm' />
        </form>
        {user.username && (
          <>
            <button className='px-2 py-1'><ChatIcon className='text-gray-400 w-6 h-6 m-1 mx-2' /></button>
            <button className='px-2 py-1'><BellIcon className='text-gray-400 w-6 h-6 m-1 mx-2' /></button>
            <button className='px-2 py-1'><PlusIcon className='text-gray-400 w-6 h-6 m-1 mx-2' /></button>
          </>
        )}
        {!user.username && (
          <div className='mx-2 hidden sm:block '>
            <Button outline className='mr-1 h-8 ' onClick={() => authModal.setShow('login')}>Log In</Button>
            <Button className='h-8 ' onClick={() => authModal.setShow('register')}>Sign Up</Button>
          </div>
        )}


        <button className='rounded-md flex ml-4 border border-gray-700 ' onClick={toggleUserDropdown} ref={userDropdownRef}>
          {!user.username && (
            <UserIcon className='w-6 h-6 text-gray-400 m-1' />
          )}
          {user.username && (
            <div className="w-8 h-8 bg-gray-600 rounded-md">
              <img src={Avatar} alt="" style={{ filter: 'invert(100%)' }} className='block' />
            </div>
          )}

          <ChevronDownIcon className='text-gray-500 w-5 h-5 mt-2 m-1' />
          <div className={'absolute right-0 top-8 bg-reddit_dark border border-gray-700 z-10 rounded-md text-reddit_text overflow-hidden ' + userDropdownVisibilityClass}>
            {user.username && (
              <span className='block w-50 py-2 px-3 text-sm'>
                Hello, {user.username}!
              </span>
            )}
            {!user.username && (
              <button className='flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black text-sm' onClick={() => authModal.setShow('register')}>
                <LoginIcon className='w-5 h-5 mr-2' />
                Log In / Sign Up
              </button>
            )}
            {user.username && (
              <button className='flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black text-sm' onClick={() => user.logout()}>
                <LogoutIcon className='w-5 h-5 mr-2' />
                Logout 
              </button>
            )}
          </div>
        </button>

      </div>

    </header>
  );
}
export default Header;