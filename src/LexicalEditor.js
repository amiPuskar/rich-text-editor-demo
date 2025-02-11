import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ParagraphNode, TextNode, $isTextNode, isHTMLElement } from 'lexical';
import './lexicalstyle.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExampleTheme from './ExampleTheme';
import ToolbarPlugin from './ToolbarPlugin';
import TreeViewPlugin from './TreeViewPlugin';
import { parseAllowedColor, parseAllowedFontSize } from './styleConfig';
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';

const placeholder = 'Enter some rich text...';

// Function to remove styles from exported DOM
const removeStylesExportDOM = (editor, target) => {
    const output = target.exportDOM(editor);
    if (output && isHTMLElement(output.element)) {
        // Remove all inline styles and classes if the element is an HTMLElement
        for (const el of [
            output.element,
            ...output.element.querySelectorAll('[style],[class],[dir="ltr"]'),
        ]) {
            el.removeAttribute('class');
            el.removeAttribute('style');
            if (el.getAttribute('dir') === 'ltr') {
                el.removeAttribute('dir');
            }
        }
    }
    return output;
};

// Export DOM configuration
const exportMap = new Map([
    [ParagraphNode, removeStylesExportDOM],
    [TextNode, removeStylesExportDOM],
]);

// Function to get extra styles
const getExtraStyles = (element) => {
    let extraStyles = '';
    const fontSize = parseAllowedFontSize(element.style.fontSize);
    const backgroundColor = parseAllowedColor(element.style.backgroundColor);
    const color = parseAllowedColor(element.style.color);
    if (fontSize !== '' && fontSize !== '15px') {
        extraStyles += `font-size: ${fontSize};`;
    }
    if (backgroundColor !== '' && backgroundColor !== 'rgb(255, 255, 255)') {
        extraStyles += `background-color: ${backgroundColor};`;
    }
    if (color !== '' && color !== 'rgb(0, 0, 0)') {
        extraStyles += `color: ${color};`;
    }
    return extraStyles;
};

// Function to construct import map
const constructImportMap = () => {
    const importMap = {};

    // Wrap all TextNode importers with a function that also imports custom styles
    for (const [tag, fn] of Object.entries(TextNode.importDOM() || {})) {
        importMap[tag] = (importNode) => {
            const importer = fn(importNode);
            if (!importer) {
                return null;
            }
            return {
                ...importer,
                conversion: (element) => {
                    const output = importer.conversion(element);
                    if (output === null || output.forChild === undefined || output.after !== undefined || output.node !== null) {
                        return output;
                    }
                    const extraStyles = getExtraStyles(element);
                    if (extraStyles) {
                        const { forChild } = output;
                        return {
                            ...output,
                            forChild: (child, parent) => {
                                const textNode = forChild(child, parent);
                                if ($isTextNode(textNode)) {
                                    textNode.setStyle(textNode.getStyle() + extraStyles);
                                }
                                return textNode;
                            },
                        };
                    }
                    return output;
                },
            };
        };
    }

    return importMap;
};

// Editor configuration
const editorConfig = {
    html: {
        export: exportMap,
        import: constructImportMap(),
    },
    namespace: 'React.js Demo',
    nodes: [ParagraphNode, TextNode],
    onError(error) {
        throw error;
    },
    theme: ExampleTheme,
};

// LexicalEditor component
export default function LexicalEditor() {
    return (
        <Box>
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
            <LexicalComposer initialConfig={editorConfig}>
                <div className="editor-container">
                    <ToolbarPlugin />
                    <div className="editor-inner">
                        <RichTextPlugin
                            contentEditable={
                                <ContentEditable
                                    className="editor-input"
                                    aria-placeholder={placeholder}
                                    placeholder={<div className="editor-placeholder">{placeholder}</div>}
                                />
                            }
                            ErrorBoundary={LexicalErrorBoundary}
                        />
                        <HistoryPlugin />
                        <AutoFocusPlugin />
                        <TreeViewPlugin />
                    </div>
                </div>
            </LexicalComposer>
        </Box>
    );
}
