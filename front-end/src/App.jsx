import React,{useEffect,useState} from "react";
import './App.css';
import AllPosts from "./components/AllPosts"
import PostDtails from "./components/PostDetails";
function App() {

  const [onePost,setOnePost]=useState({})
  const [view, setView]=useState('AllPosts')
  const changeState=(state)=>{
    setOnePost(state)
    setView("PostDtails")
  }
  if(view==='AllPosts'){
    return (
      <div className="App">
       <AllPosts changeState={changeState}/>
      </div>
    );
  } else if(view==="PostDtails"){
    return (
      <div className="App">
       <PostDtails onePost={onePost}/>
      </div>
    );
  }
  
}

export default App;
