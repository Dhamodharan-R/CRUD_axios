import React, { Component } from 'react';
import axios from"axios";



const Url ="http://jsonplaceholder.typicode.com/posts";
class App extends Component {

  constructor(props){
    super(props)
    this.state={
      posts : [],
      id : "" ,
      userId : "",
      title : "",
      body : ""
    }

  }

//Create
  createposts = async()=> {
    try {
      const {userId,title,body}= this.state;
      const {data }= await axios.post(`${Url}`,{userId,title,body});
      
      console.log(data);
      const posts = [...this.state.posts]

      posts.push(data);
      console.log(posts);
      this.setState({posts ,userId:"",title:"",body:""});
      
    } catch (error) {
      console.log(error);
    }

  }

// Read 
  getposts = async()=> {
    try {

      const {data} = await axios.get(`${Url}`);
      this.setState({posts: data});
      console.log(this.state.posts)
      
    } catch (error) {
      console.log(error);
    }

  }

  //Update

  updateposts = async()=> {
    try {
      const {id,userId,title,body}= this.state;
      console.log("update posts called")
      const {data :post} = await axios.put(`${Url}/${this.state.id}`,{userId,title,body})
       
    const posts = [...this.state.posts]
    
    const index = posts.findIndex((p)=>p.id === id)
    posts[index]=post;
      this.setState({posts});
      this.setState({userId:"",title:"",body:"",id:""})
    } catch (error) {
      console.log(error);
    }

  }

  //Delete
  deleteposts = async(ids)=> {
    try {
      
      const posts = this.state.posts.filter(({id})=>{
        return id!= ids
      })
      
      await axios.delete(`${Url}/${ids}`);
    
      

      /* console.log(posts); */
      this.setState({posts})


      
    } catch (error) {
      console.log(error);
    }

  }

  handleSubmit = (event)=>{

    event.preventDefault()
    if(this.state.id){
       this.updateposts();
    }
    else{
      this.createposts();
    }

  }

  update = ({id,userId,title,body}) => {

    this.setState({id,userId,title,body})
  }

  handlechange =({target:{value,name}})=>{
    this.setState({[name]:value})
  }



  componentDidMount () {
    console.log("component did mount called");
    this.getposts();
    
  }

 

  render() {
    return (
      <>
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>userId : </label>
          <input type="text" name="userId" value={this.state.userId} onChange={this.handlechange}/>
        </div>
        <br/>
        <div>
          <label>title : </label>
          <input type="text" name="title" value={this.state.title} onChange={this.handlechange}/>
          
        </div>
        <br/>
        <div>
          <label>body : </label>
          <textarea  name="body" value={this.state.body} onChange={this.handlechange}></textarea>
        
        </div>
        <br/>
        <button  >Submit</button>
      </form>
      <br/>
      <table>
        <thead>
        <tr>
          <td>Id</td>
          <td>UserId</td>
          <td>Title</td>
          <td>Body</td>
          <td>Action</td>
        </tr>
        </thead>
        {this.state.posts.map(({id,userId,title,body})=>{
          return (
            <tr key={id}>
              <td>{id}</td>
              <td>{userId}</td>
              <td>{title}</td>
              <td>{body}</td>
              <td><button onClick={()=>this.update({id,userId,title,body})}>Update</button></td>
              <td><button onClick={()=>this.deleteposts(id)}>Delete</button></td>
            </tr>
          )
        })}
      </table>
      
      </>
    )
  }
}


export default App;

