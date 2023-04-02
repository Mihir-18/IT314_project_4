function Input(props){
     return (
          <input {...props} className={'bg-reddit_dark-brighter text-reddit_text p-2 border border-reddit_dark-brightest block rounded-md '+props.className}/>
     );
}

export default Input;