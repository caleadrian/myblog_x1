import React, { Component } from 'react';
import firebaseDB from '../../../firebase'

import Tags from "./Tags";

export default class ShowPosts extends Component{

    constructor(props){
        super(props)
        this.state = {
            posts: {}
        }
    }

    componentDidMount(){
        this.getPosts()
        console.log('data loaded')
    }

    getPosts = () =>{
        firebaseDB.child('posts').on('value', snapshot =>{
            if(snapshot.val() != null){
                this.setState({
                    posts: {
                        ...snapshot.val()

                    }
                })
            }
        })

    }

    editPost = (id) =>{
        this.props.editPost(id)
    }

 render(){
    return(
        <React.Fragment>
                          <button  onClick={  this.props.addPostBtn } type="button" 
                          className="btn btn-sm btn-primary rounded-pill">Add New</button>
                          <table className="table mt-2">
                              <thead className="bg-light">
                                  <tr>
                                  <th scope="col">
                                      <input type="checkbox" className="form-check-input"/>
                                  </th>
                                  <th scope="col">ID</th>
                                  <th scope="col">Title</th>
                                  <th scope="col">Type</th>
                                  <th scope="col">Date Created</th>
                                  <th scope="col">Tags</th>
                                  <th scope="col"></th>
                                  <th scope="col"></th>
                                  </tr>
                              </thead>
                              <tbody>
                             
                                    { 
                                      
                                        Object.keys(this.state.posts).map(id => {
                                            return <tr key={this.state.posts[id].id}>
                                                        <td>
                                                            <input type="checkbox" className="form-check-input"/> 
                                                        </td>
                                                        <th scope="row">{this.state.posts[id].id}</th>
                                                        <td>{this.state.posts[id].title}</td>
                                                        <td>{this.state.posts[id].status}</td>
                                                        <td>{this.state.posts[id].date}</td>

                                                        <td className="w-20">
                                                            {
                                                                 this.state.posts[id].tags != null && 
                                                                 <Tags tags={this.state.posts[id].tags} />
                                                            }
                                                        </td>
                                                        <td><i onClick={() => this.editPost(this.state.posts[id].id)} className="link-primary bi bi-pencil-square"></i></td>
                                                        <td><i className="link-primary bi bi-three-dots-vertical"></i></td>
                                                    </tr>
                                        })
                                    }

 
                              </tbody>
                          </table>
        </React.Fragment>
       );
 }


}

