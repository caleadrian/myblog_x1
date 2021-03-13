import React, { Component } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html'; 
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TagsInput from 'react-tagsinput'
import './tags.css'
import firebaseDB from '../../../firebase'

export default class AddPost extends Component {

    constructor(props){
        super(props);
        this.state = {
          editorState: EditorState.createEmpty(),
          post : {
              title: '',
              content: '',
              status: 'draft',
              tags: [],
              createdById: 1207
          }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.getDataById(this.props.postId)
    }

    getDataById = (id) =>{
        let arr = [];
        let shitContent =  [];
        firebaseDB.child('posts').orderByChild('id').equalTo(id)
            .on('value', snapshot =>{
            if (snapshot.exists()) {

                snapshot.forEach((child) => {
                    arr.push(child.val());
                });

                shitContent = JSON.parse(arr[0].content)
               
                this.setState({
                    post: {
                        ...arr[0]
                    },
                    editorState: EditorState.createWithContent(
                        convertFromRaw(shitContent)
                    )
                })

              }
              else {
                console.log("No data available");
              }
        })
    }

    onEditorStateChange = (editorState) => {
        var convertedData = convertToRaw(this.state.editorState.getCurrentContent());

        this.setState({
            editorState,
            post:{
                ...this.state.post,
                content: convertedData,
            }
        });
    }

    convertCommentFromJSONToHTML = (text) => {                     
        return stateToHTML(convertFromRaw(text)) 
    }

    saveData = () =>{
        var convertedData = convertToRaw(this.state.editorState.getCurrentContent());

        this.setState({
            data: convertedData
          });

          console.log('Save data:', this.state.editorState.getCurrentContent())

          this.setState({editorState: EditorState.createEmpty()})
    }

    handleChange = (e) => {
        this.setState({
            post: {
                ...this.state.post,
                title: e.target.value
            }
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.props.savePost(this.state.post)
        this.clearData()
    }

    handleTagsChange =(tags) => {
        this.setState({
            post: {
                ...this.state.post,
                tags : tags
            }
        })
    }

    clearData = () =>{
        this.setState({
            post: {
                ...this.state.post,
                tags: [],
                title: '',
            }
        })
    }

    render(){
        return(
            <React.Fragment>

                <button type="button" onClick={this.props.showPostsBtn}
                    className="btn btn-sm btn-danger rounded-pill mb-2 px-3">Cancel</button>

                <form onSubmit={ this.handleSubmit }>

                <div className="form-group mb-3">
                    <label className="text-muted">Title</label>
                    <input type="text" value={this.state.post.title} onChange={this.handleChange} 
                        className="form-control" placeholder="Enter your title here..."/>
                </div>

                <div className="form-group mb-3">

                    <label className="text-muted">Content</label>
                    <Editor
                        editorState={this.state.editorState}
                        toolbarClassName="form-control"
                        wrapperClassName="wrapperClassName"
                        editorClassName="form-control border-muted"
                        onEditorStateChange={this.onEditorStateChange}
                        toolbar={{
                            options: ['inline', 'list','colorPicker', 'link', 'emoji', 'image'],
                        }}
                    />
                </div>
                    

                <div className="form-group mb-2"> 
                    <label className="text-muted">Tags</label>
                    <TagsInput 
                        className="form-control"
                        value={this.state.post.tags} 
                        onChange={this.handleTagsChange} 
                        onlyUnique={true}
                        />
                </div>

                <button type="submit" className="btn btn-primary rounded-pill">Save Changes</button>
                </form>
            </React.Fragment>
        )
    }

}