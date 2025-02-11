import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TiptapEditor from './TiptapEditor';

const TiptapEditorPage = () => {
    const [htmlContent, setHtmlContent] = useState('');

    return (
        <Box m={3}>
            {/* Back Button with Arrow */}
            <Link to="/" style={{ textDecoration: 'none' }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                    <ArrowBackIcon /> Back
                </Button>
            </Link>

            <Box display="flex" gap={3}>
                <Box width="60%">
                    <Typography variant="h4" textAlign="center">
                        Tiptap Editor
                    </Typography>
                    <TiptapEditor setHtmlContent={setHtmlContent} />
                </Box>

                {/* Converted HTML Output with Border */}
                <Box width="40%" p={2} border="1px solid #ccc" borderRadius={2}>
                    <Typography variant="h6" gutterBottom>
                        Converted HTML Output:
                    </Typography>
                    <Box dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </Box>
            </Box>
        </Box>
    );
};

export default TiptapEditorPage;
