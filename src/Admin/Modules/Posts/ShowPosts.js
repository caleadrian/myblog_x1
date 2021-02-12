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

                                                        <td>
                                                            {


                                                                this.state.posts[id].tags != null && <Tags />
                                                                    // this.state.posts[id].tags.map(function(item, i){
                                                                    //      return 
                                                                    //          (this.state.posts[id].tags.count() ) 
                                                                    //          ? <span key={i} className="badge rounded-pill bg-dark px-3 py-2 me-1">{item}</span> 
                                                                    //          : <span key={i} className="badge rounded-pill bg-dark px-3 py-2 me-1">...</span> 

                                                                    //  })
                        

                                                            }
                                                        </td>
                                                        <td><i className="bi bi-pencil-square"></i></td>
                                                        <td><i className="bi bi-three-dots-vertical"></i></td>
                                                    </tr>
                                        })
                                    }

 
                              </tbody>
                          </table>
        </React.Fragment>
       );
 }


}

