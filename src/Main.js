import React, { Component } from 'react';
import Admin from './Admin/Admin';


export default class Main extends Component{

    state = {
        loggedIn: true,
        role: 'admin'
    } 

    render(){
        return(
            ( this.state.loggedIn && this.state.role === 'admin'
                ? <Admin /> 
                : <p>client</p>)
          );
    }

}
