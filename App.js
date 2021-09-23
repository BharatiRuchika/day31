import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
class postApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
       posts:[],
       id:"",
       title:"",
       userId:"",
       body:""
    }
  }
  createPost = async()=>{
    try{
    console.log(this.state);
    const {userId,title,body} = this.state;
    const {data} = await axios.post("https://jsonplaceholder.typicode.com/posts",{userId,title,body})
    console.log("data",data);
    const posts = [...this.state.posts];
    posts.push(data);
    this.setState({posts,userId:"",title:"",body:""});
    }catch(error){
      console.log(error);
    }
  }
  getPosts = async() => {
    try{
      const {data} = await axios.get("https://jsonplaceholder.typicode.com/posts"); 
      // const data = response.json();
      console.log(data);
      this.setState({posts:data});
    }catch(error){
      console.log("error in fetching data",error);
    }
  }
  updatePost = async()=>{
     try{
       const {id,userId,title,body} = this.state;
        const {data:post} = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,{
          userId,title,body
        });
        const posts = [...this.state.posts];
        const index = posts.findIndex((post)=>post.id==id);
        console.log(index);
        posts[index] = post;
        this.setState({posts,userId:"",title:"",body:""});

     }catch(error){
       console.log("error in updating",error);
     }
  }
  selectPostToUpdate = (post)=>{
    console.log(post);
    this.setState({...post})
  }
  deletePost = async(postId)=>{
   console.log("im here");
   console.log(postId);
   try{
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      let posts = [...this.state.posts];
      console.log("posts",posts);
     posts = posts.filter((post)=>post.id!==postId)
      // const new_posts = [];
      // posts.map((post)=>{
      //      if(post.id!==postId){
      //        new_posts.push(post);
      //      }
      // })
      this.setState({posts:posts});

   }catch(error){
     console.log("error in deleting data",error);
   }
  }
  componentDidMount(){
    this.getPosts();
  }
  handleChange = ({target:{type,value,name}})=>{
    this.setState({[name]:value});
  }
  handleSubmit = (event)=>{
    event.preventDefault();
    if(this.state.id){
      this.updatePost();
    }else{
      this.createPost();
    }
   
  }
  render(){
    return (<>
    <form onSubmit={this.handleSubmit}>
      <div>
        <label>UserId</label>
      <input type="number" name="userId" onChange={this.handleChange} value={this.state.userId}></input></div>
      <br/>
      <div>
        <label>Title</label>
        <input type="text" name="title" onChange={this.handleChange}
        value={this.state.title}/>
      </div>
      <br/>

      <div>
        <label>Body</label>
        <input type="text" name="body" onChange={this.handleChange}
        value={this.state.body}></input>
      </div>
      <br/>
<div>
  <button type="submit">Submit</button>
</div>
    </form>
    <table>
      <thead>
      <tr>
        <th>postId</th>
        <th>userId</th>
        <th>Title</th>
        <th>Body</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      {this.state.posts.map((post)=>{
        return (<tr key={post.id}>
          <td>{post.id}</td>
          <td>{post.userId}</td>
          <td>{post.title}</td>
          <td>{post.body}</td><td>
          <button onClick={()=>{this.deletePost(post.id)}}>Delete</button>
          <button onClick={()=>{this.selectPostToUpdate(post)}}>Update</button></td>
          </tr>)
      })}
      </tbody>
      </table></>);
  }
}

export default postApp;
