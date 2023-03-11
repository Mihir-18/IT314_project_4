import Logo from './newsAggregatorLogo.png';
import { UserIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon }   from '@heroicons/react/24/solid';
import LoginSignupButton from './LoginSignupButton.js'
import {useState} from 'react';
import ClickOutHandler from 'react-clickout-handler';
function Header(){
    const [userDropDownVisibilityClass, setUserDropDownVisibilityClass]= useState ('hidden');

    function toggleUserDropDown() {
        if(userDropDownVisibilityClass === 'hidden'){
            setUserDropDownVisibilityClass('block');
        }
        else{
            setUserDropDownVisibilityClass('hidden');
        }
    }
    return (
        <header className="w-full bg-dark p-2">
            <div className="mx-4 flex">
                <img src={Logo} alt="Workflow" className="w-8 h-8 bg-dark mr-4" />
                <form action="" className="bg-dark-brighter p-1 px-3 flex rounded-md border border-borderColor mx-4 flex-grow">
                    <input type="text" className="bg-dark-brighter p-1 pl-2 pr-0 text-sm block focus:outline-none text-white" placeholder="Search" />
                </form>
                <div className="mx-3">
                    <LoginSignupButton >Log In</LoginSignupButton>
                    <LoginSignupButton >Sign Up</LoginSignupButton>
                </div>

                <ClickOutHandler onClickOut={()=> setUserDropDownVisibilityClass('hidden')}>
                    <button className="rounded-md flex border border-gray-700" onClick={() => toggleUserDropDown()}>
                        <UserIcon className="w-6 h-6 text-gray-400 m-1" />
                        <ChevronDownIcon className="text-gray-500 w-5 h-5 mt-2 m-1" />
                    </button>
                </ClickOutHandler>
                <div className={"absolute right-0 top-12 bg-dark border border-gray-700 z-10 rounded-md text-Text overflow-hidden " + userDropDownVisibilityClass} >
                    <button href="" className="block flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black text-sm">
                        Log In / Sign Up
                    </button>
                </div>
            </div>

        </header>
    );
}

export default Header;