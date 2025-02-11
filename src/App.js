import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RichEditorPage from './RichEditorPage';
import TiptapEditor from './TiptapEditor';
import LexicalEditor from './LexicalEditor';
import { Button } from '@mui/material';

const MainPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the Main Page</h1>
      <a href="/richeditor">
        <button style={{ padding: '10px 20px', fontSize: '16px' }}>Open Rich Text Editor</button>
      </a>
      {/* <a href="/tiptapeditor">
        <button style={{ padding: '10px 20px', fontSize: '16px' }}>Open TipTap Text Editor</button>
      </a> */}
      <a href="/lexicaleditor">
        <Button variant="contained" style={{ marginRight: '10px' }}>
          Open Lexical Editor
        </Button>
      </a>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/richeditor" element={<RichEditorPage />} />
        <Route path="/tiptapeditor" element={<TiptapEditor />} />
        <Route path="/lexicaleditor" element={<LexicalEditor />} />
      </Routes>
    </Router>
  );
};

export default App;
