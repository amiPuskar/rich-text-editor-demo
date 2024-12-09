// RichTextEditor.js
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; // Import the styles

const RichTextEditor = ({ editorState, onEditorStateChange }) => {
    return (
        <div
            style={{
                border: '1px solid #ccc', // Border for the editor container
                borderRadius: '5px',
                padding: '10px',
            }}
        >
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange} // Handle state change
                toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'history'],
                }}
            />
        </div>
    );
};

export default RichTextEditor;
