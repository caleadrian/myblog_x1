import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
  } from "react-router-dom";

import Dashboard from "./Modules/Dashboard/Dashboard";
import Posts from "./Modules/Posts/Posts";
import Settings from "./Modules/Settings/Settings";

import Breadcrumb from "./Modules/Components/Breadcrumb";  



export default class Admin extends Component {

    

    render(){

        return(
            <React.Fragment>
                <div className="container p-3">
                    <span className="fw-bold fs-4">My Blog</span>
                </div>
                <Router>

                  <div className="container">
                    <div className="row">

                      <div className="col-2 p-0">
                        <div className="list-group ">
                            <NavLink exact={true} activeClassName="active bg-dark" to="/admin" className="list-group-item list-group-item-action bg-light rounded-pill border-0 my-1">Dashboard</NavLink>
                            <NavLink activeClassName="active bg-dark" to="/admin/posts" className="list-group-item list-group-item-action bg-light rounded-pill border-0 my-1">Posts</NavLink>
                            <NavLink activeClassName="active bg-dark" to="/admin/settings" className="list-group-item list-group-item-action bg-light rounded-pill border-0 my-1">Settings</NavLink>
                        </div>
                      </div>

                      <div className="col ms-5">
                      
                      <div className="container-fluid rounded-pill bg-white mb-2">
                            <Breadcrumb/>
                      </div>

                      <div className="px-4 py-3 bg-white rounded-3">

                        <Switch>
                            <Route exact path="/admin">
                                <Dashboard />
                            </Route>
                            <Route path="/admin/posts">
                                <Posts />
                            </Route>
                            <Route path="/admin/settings">
                              <Settings />
                            </Route>
                        </Switch>
                      </div>

                      </div>

                    </div>
                  </div>



                </Router>
            </React.Fragment>

        );
        
    }
}