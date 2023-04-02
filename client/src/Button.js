function Button(props){
     let classnames="border border-gray-300 rounded-full px-2 font-bold ";
     if(props.outline)
     {
          classnames += "text-gray-300 ";
     }
     else
     {
          classnames += "bg-gray-300 text-reddit_dark ";
     }
     return (
          <button {...props} className={classnames + props.className} />
          
     );
}

export default Button;