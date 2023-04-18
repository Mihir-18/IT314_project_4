import {Link} from "react-router-dom";


function Post(props) {
  return (
    <div className=" px-6 text-reddit_text pb-4">
      <Link to={'/comments/'+props._id} className=' block border border-reddit_border hover:border-reddit_text bg-reddit_dark-brighter p-2 rounded-md cursor-pointer'>
        <h5 className="text-reddit_text-darker text-sm mb-1">Posted by u/ test123 3 hours ago</h5>
        <h2 className='text-xl mb-3'>UK hourly & day rate question</h2>
        <div className='text-sm leading-6'>
          {props.body}
        </div>
      </Link>
    </div>
  );
}

export default Post;
