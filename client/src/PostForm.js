import Avatar from './avatar.png'

function PostForm() {
     return (
          <>
               <div className="bg-reddit_dark px-6 py-4 text-gray=400">
                    <div className='border border-reddit_border bg-reddit_dark-brighter p-2 rounded-md flex'>
                         <div className="rounded-full overflow-hidden w-10 h-10 bg-gray-600">
                              <img src={Avatar} alt="" style={{ filter: 'invert(100%)' }} />
                         </div>
                         <form action="" className='flex-grow bg-reddit_dark-brightest border border-reddit_border rounded-md ml-4 mr-2'>
                              <input type="text" className='bg-reddit_dark-brightest p-2 block w-full rounded-md ml-4' placeholder='New post' />
                         </form>
                    </div>
               </div>
          </>
     );
}

export default PostForm;