import React, { Component } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html'; 
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TagsInput from 'react-tagsinput'
import './tags.css'

export default class AddPost extends Component {

    constructor(props) {
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
    }


    onEditorStateChange = (editorState) => {
        var convertedData = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));

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

    // saveData = () =>{
    //     var convertedData = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));

    //     this.setState({
    //         data: convertedData
    //       });

    //       console.log('Save data:', this.state.editorState.getCurrentContent())

    //       this.setState({editorState: EditorState.createEmpty()})
    // }

    loadData = () =>{
        var convertedData = this.convertCommentFromJSONToHTML(this.state.data)
        this.setState({
            content: convertedData
        })
    }

    // editData =() =>{
    //     var convertedData = this.convertCommentFromJSONToHTML(this.state.data);  
    //     this.setState({
    //         editorState: EditorState.createWithContent(ContentState.createFromBlockArray(
    //            convertFromHTML(convertedData) 
    //         ))
    //     })
    // }

    handleChange = (e) => {
        this.setState({
            post: {
                ...this.state.post,
                title: e.target.value
            }
        })
    }

    // cookPostData = () =>{
    //     const rawState = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    //     this.setState({
    //         post:{
    //             content: rawState
    //         }
    //     })
    // }

    handleSubmit = (e) =>{
        e.preventDefault()
        // this.cookPostData()
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
                <button type="button" onClick={ this.props.showPostsBtn }
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
                            // inline: { inDropdown: true },
                            // list: { inDropdown: true },
                            // link: { inDropdown: true },
                            // history: { inDropdown: true },
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

                {/* <div dangerouslySetInnerHTML={{ __html: this.state.content}} />  */}
                <button onClick={this.saveData} type="submit" className="btn btn-primary rounded-pill">Save Data</button>
                </form>

            </React.Fragment>
         );
    }
}

