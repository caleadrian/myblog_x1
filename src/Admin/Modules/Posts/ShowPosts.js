import React from 'react';

export default function ShowPosts(props){
 return(
  <React.Fragment>
                    <button  onClick={ props.addPostBtn } type="button" 
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
                            <th scope="col">Views</th>
                            <th scope="col">Tags</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="checkbox" className="form-check-input"/> 
                                </td>
                                <th scope="row">1</th>
                                <td>Blog title blah blah</td>
                                <td>Published</td>
                                <td>230</td>
                                <td>
                                    <span className="badge rounded-pill bg-dark px-3 py-2 me-1">animal</span>
                                    <span className="badge rounded-pill bg-dark px-3 py-2 me-1">trend</span>
                                    <span className="badge rounded-pill bg-dark px-3 py-2 me-1">...</span>
                                </td>
                                <td>
                                    <i className="bi bi-pencil-square"></i>
                                </td>
                                <td>
                                    <i className="bi bi-three-dots-vertical"></i>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" className="form-check-input"/> 
                                </td>
                                <th scope="row">2</th>
                                <td>Blog title blah blah</td>
                                <td>Draft</td>
                                <td>111</td>
                                <td>
                                    <span className="badge rounded-pill bg-dark px-3 py-2 me-1">animal</span>
                                    <span className="badge rounded-pill bg-dark px-3 py-2 me-1">trend</span>
                                    <span className="badge rounded-pill bg-dark px-3 py-2 me-1">...</span>
                                </td>
                                <td>
                                    <i className="bi bi-pencil-square"></i>
                                </td>
                                <td>
                                    <i className="bi bi-three-dots-vertical"></i>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" className="form-check-input"/> 
                                </td>
                                <th scope="row">3</th>
                                <td>Blog title blah blah</td>
                                <td>Archived</td>
                                <td>231</td>
                                <td>
                                    <span className="badge rounded-pill bg-dark px-3 py-2 me-1">animal</span>
                                    <span className="badge rounded-pill bg-dark px-3 py-2 me-1">trend</span>
                                    <span className="badge rounded-pill bg-dark px-3 py-2 me-1">...</span>
                                </td>
                                <td>
                                    <i className="bi bi-pencil-square"></i>
                                </td>
                                <td>
                                    <i className="bi bi-three-dots-vertical"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
  </React.Fragment>
 );
}

