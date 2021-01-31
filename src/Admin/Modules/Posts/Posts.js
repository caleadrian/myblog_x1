import React, { Component } from 'react';

import ShowPosts from './ShowPosts'
import AddPost from './AddPost'

export default class Posts extends Component{
    
    state = {
        action: 1
    }

    // constructor(props){
    //     super(props)

    //     this.addPostBtn = this.addPostBtn.bind(this)
    // }


    addPostBtn = () => {
        this.setState({
            action : 2
        })
    }

    PageSwitch = (params) =>{
        switch (params) {
            case 1:
                return <ShowPosts addPostBtn={this.addPostBtn} />
    
            case 2:
                return <AddPost />
        
            default:
                return null;
        }
    }

    //showposts = 1
    //addpost = 2
    render(){
        return(
            <React.Fragment>
                <h4 className="fw-bold mb-4">Posts</h4>

               {this.PageSwitch(this.state.action)}


            </React.Fragment>
        )
    }

}




