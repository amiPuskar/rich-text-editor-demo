import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import RichTextEditor from './RichTextEditor'; // Import the RichTextEditor component
import { stateToHTML } from 'draft-js-export-html';
import './App.scss'
import draftToHtml from 'draftjs-to-html';
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
      <div style={{ margin: '5px' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ width: '60%' }}>
            <h1 style={{ textAlign: 'center' }}>Rich Text Editor</h1>
            {/* Use the RichTextEditor component */}
            <RichTextEditor
              editorState={editorState}
              onEditorStateChange={this.onEditorStateChange}
            />
          </div>
          <div style={{ width: '40%' }}>
            <HtmlOutput editorState={editorState} />
          </div>
        </div>

        {/* Render the HTML output */}
        <div className='renderBox'>
          <div className='renderBoxDiv'>
            <h2>Rendered HTML Content htmlContent:</h2>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
          <div className='renderBoxDiv'>
            <h2>Rendered HTML Content draftToHtml:</h2>
            <div dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(editorState.getCurrentContent())) }} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
