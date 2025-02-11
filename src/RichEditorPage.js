import React, { useState, useCallback } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Link } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RichTextEditor from './RichTextEditor';
import HtmlOutput from './HtmlOutput';
import './App.scss';

const RichEditorPage = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = useCallback((newEditorState) => {
        setEditorState(newEditorState);
    }, []);

    return (
        <Box m={3}>
            {/* Back Arrow Button */}
            <Link to="/" style={{ textDecoration: 'none' }}>
                <Button
                    variant="contained"
                    color="primary"
                    mb={2}
                    display={'flex'}
                    alignItems={'center'}
                    gap={1}
                >
                    <ArrowBackIcon /> Back
                </Button>
            </Link>

            <Box display="flex" gap={3}>
                <Box width="60%">
                    <Typography variant="h4" textAlign="center">
                        Rich Text Editor
                    </Typography>
                    <RichTextEditor editorState={editorState} onEditorStateChange={onEditorStateChange} />
                </Box>

                <Box width="40%" p={2} border="1px solid #ccc" borderRadius={2}>
                    <HtmlOutput editorState={editorState} />
                </Box>
            </Box>

            {/* Convert editorState to raw content with Border */}
            <Box mt={3} p={2} border={'1px solid #ccc'} borderRadius={2}>
                <Typography variant="h4" pb={2}>
                    Convert editorState to raw content:
                </Typography>
                <Box dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(editorState.getCurrentContent())) }} />
            </Box>
        </Box>
    );
};

export default RichEditorPage;
