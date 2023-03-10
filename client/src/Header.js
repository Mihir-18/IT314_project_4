import Logo from './newsAggregatorLogo.png';
import Avatar from './avatar.png';
function Header(){
    return (
        <header className="w-full bg-dark p-2">
            <div className="mx-4 flex">
                <img src={Logo} alt="Workflow" className="w-8 h-8 bg-dark mr-4" />
                <form action="" className="bg-dark-brighter p-1 px-3 flex rounded-md border border-borderColor mx-4 flex-grow">
                    <input type="text" className="bg-dark-brighter p-1 pl-2 pr-0 text-sm block focus:outline-none text-white" placeholder="Search" />
                </form>
                <button className="rounded-md flex">
                    <div className="w-8 h=8 bg-gray-600 rounded-md">
                        <img src={Avatar} alt="" style={{ filter: 'invert(100%)' }} className="block w-8 h-8" />
                    </div>
                </button>
            </div>

        </header>
    );
}

export default Header;