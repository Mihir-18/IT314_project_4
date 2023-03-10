import Avatar from './avatar.png';
function PostForm(){
    return (
        <>
            <div className="bg-dark px-6 py-4 text-gray-400">
                <div className="border border-borderColor p-2 rounded-md flex bg-dark-brighter">
                    <div className="rounded-full bg-gray-600 overflow-hidden w-10 h-10">
                        <img src={Avatar} alt="" style={{ filter: 'invert(100%)' }} />
                    </div>
                    <form action="" className="flex-grow bg-dark-brightest border border-borderColor ml-4 mr-2 rounded-md">
                        <input type="text" className="bg-dark-brightest p-2 px-3 text-sm block w-full rounded-md" placeholder="New Post"></input>
                    </form>
                </div>
            </div>
        </>
    )
}
export default PostForm