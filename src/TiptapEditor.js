import React from 'react';
import { useEditor, EditorContent, FloatingMenu, BubbleMenu, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Box, Button, Typography, Toolbar, AppBar, Container } from '@mui/material';

// Define your toolbar component
const MyEditorToolbar = ({ editor }) => {
    if (!editor) return null; // Ensure the editor is initialized

    return (
        <AppBar position="static">
            <Toolbar>
                {/* Example toolbar buttons */}
                <Button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</Button>
                <Button onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</Button>
                <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>Clear Marks</Button>
            </Toolbar>
        </AppBar>
    );
};

// Define your extension array
const extensions = [StarterKit];

// EditorJSONPreview component to preview the editor content as JSON


const TiptapEditor = () => {
    const editor = useEditor({
        extensions,
        content: '<p>Hello World!</p>',
    });
    // const EditorJSONPreview = () => {
    //     const { editor } = useCurrentEditor()

    //     return <pre>{JSON.stringify(editor.getJSON(), null, 2)}</pre>
    // }

    return (
        <Box maxWidth="lg">
            {/* Render the custom toolbar */}
            <MyEditorToolbar />

            {/* Editor content area */}
            <Box p={2} mt={2} border="1px solid #ccc" borderRadius={2}>
                <EditorContent editor={editor} />
            </Box>

            {/* Floating menu and bubble menu */}
            <FloatingMenu editor={editor}>
                This is the floating menu
            </FloatingMenu>
            <BubbleMenu editor={editor}>
                This is the bubble menu
            </BubbleMenu>

            {/* JSON Preview of the editor content */}
            <Box width="100%" p={2} border="1px solid #ccc" borderRadius={2} mt={2}>
                <Typography variant="h5" pb={2}>
                    Editor Content (JSON):
                </Typography>
                {/* <EditorJSONPreview editor={editor} /> */}
            </Box>
        </Box>
    );
};

export default TiptapEditor;
