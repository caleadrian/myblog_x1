import React, { Component } from 'react';

import ShowPosts from './ShowPosts'
import AddPost from './AddPost'
import EditPost from './EditPost'

import firebaseDB from '../../../firebase'

export default class Posts extends Component{
    


    constructor(props){
        super(props)

        this.state = {
            action: 1,
            postId: 0
        }
    }

    componentDidMount(){
        this.addPostBtn = this.addPostBtn.bind(this)
    }

    getLastId = () =>{
        let postRef = firebaseDB.child('posts').orderByKey().limitToLast(1);
        
        postRef.once('child_added', snapshot => {
           this.setState({
               newKey: snapshot.child('id').val() + 1
           })
          });
    }

    addPostBtn = () => {
        this.setState({
            action : 2
        })

        console.log('set state')
    }

    showPostsBtn = () => {
        this.setState({
            action : 1
        }) 
    }

    savePost = (obj) =>{
 
        var newObj = {}
        var date = new Date();


        let postRef = firebaseDB.child('posts').orderByKey().limitToLast(1);
        postRef.once('child_added', snapshot => {
        //    this.setState({
        //        newKey: snapshot.child('id').val() + 1
        //    })

            newObj = {
                ...obj,
                date:  date.toLocaleString(),
                id: snapshot.child('id').val() + 1
            }

        }).then( ()=>{

            firebaseDB.child('posts').push(
                newObj,
                err => {
                    if(err){
                        console.log(err)
                    }
                }
            ).then( 
                ()=>{
                    console.log('save success')
                }
            )
        })




    }

    editPost = (id) =>{
        this.setState({
            action : 3,
            postId: id
        })

    }

    PageSwitch = (params) =>{
        switch (params) {
            case 1:
                return <ShowPosts addPostBtn={this.addPostBtn} editPost={this.editPost}/>
    
            case 2:
                return <AddPost showPostsBtn={this.showPostsBtn} savePost={this.savePost}/>

            case 3:
                return <EditPost showPostsBtn={this.showPostsBtn} savePost={this.savePost} postId={this.state.postId}/>
        
            default:
                return null;
        }
    }

    //showposts = 1
    //addpost = 2
    //editpost = 3

    render(){
        return(
            <React.Fragment>
                <h4 className="fw-bold mb-4">Posts</h4>

               {this.PageSwitch(this.state.action)}


            </React.Fragment>
        )
    }

}




