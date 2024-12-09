// HtmlOutput.js
import React from 'react';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';

const HtmlOutput = ({ editorState }) => {
    return (
        <div>
            <h3>Converted HTML Output:</h3>
            <textarea
                style={{
                    width: '100%',
                    height: '200px',
                    marginTop: '10px',
                    padding: '10px',
                    fontSize: '16px',
                }}
                readOnly
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} // Convert to HTML
            />
        </div>
    );
};

export default HtmlOutput;