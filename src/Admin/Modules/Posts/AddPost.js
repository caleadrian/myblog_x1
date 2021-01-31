import React, { Component } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html'; 
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class AddPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
          editorState: EditorState.createEmpty(),
          content: 'blank',
          data: ''
        };
    }

    onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
        });

    };

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

    loadData = () =>{
        var convertedData = this.convertCommentFromJSONToHTML(this.state.data)


        this.setState({
            content: convertedData
        })
    }

    editData =() =>{
        var convertedData = this.convertCommentFromJSONToHTML(this.state.data);
        
        this.setState({
            editorState: EditorState.createWithContent(ContentState.createFromBlockArray(
               convertFromHTML(convertedData) 
            ))
        })
    }
    

    render(){
        return(
            <React.Fragment>
        
                <p>Cale</p>
                <Editor
                    editorState={this.state.editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                        options: ['inline', 'list','colorPicker', 'link', 'emoji', 'image'],
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                      }}
                />

                <hr />

                <div dangerouslySetInnerHTML={{ __html: this.state.content}} /> 

                <hr />

                <button onClick={this.loadData} type="button" className="btn btn-primary rounded-pill">Load Data</button>
                <button onClick={this.saveData} type="button" className="btn btn-primary rounded-pill">Save Data</button>
                <button onClick={this.editData} type="button" className="btn btn-success rounded-pill">Load to editor</button>
                
            </React.Fragment>
         );
    }


}

