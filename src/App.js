import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import RichTextEditor from './RichTextEditor'; // Import the RichTextEditor component
import { stateToHTML } from 'draft-js-export-html';
import './App.css'
import HtmlOutput from './HtmlOutput';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  // Method to handle editor state change
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;

    // Convert editorState to raw content
    const rawContent = convertToRaw(editorState.getCurrentContent());

    // Convert raw content to HTML
    const htmlContent = stateToHTML(editorState.getCurrentContent());

    console.log('Editor State (Raw Content):', rawContent);
    console.log('Editor State (HTML Content):', htmlContent);

    return (
      <div style={{ margin: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>Rich Text Editor</h1>
        {/* Use the RichTextEditor component */}
        <RichTextEditor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
        />

        {/* Render the HTML output */}
        <div>
        <HtmlOutput editorState={editorState} />
          <h2>Rendered HTML Content:</h2>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
    );
  }
}

export default App;
