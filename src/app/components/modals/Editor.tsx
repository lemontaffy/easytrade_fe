import React, { useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css'; // Quill Snow theme
import ReactQuill, { Quill } from 'react-quill-new';
import { ImageResize } from 'quill-image-resize-module-ts';

if (typeof window !== 'undefined' && Quill) {
    Quill.register('modules/ImageResize', ImageResize);
}

const Editor: React.FC<{ data: string }> = ({ data }) => {
    const [editorData, setEditorData] = useState<string>(data || '');
    const [quillModules, setQuillModules] = useState<any>(null);

    useEffect(() => {
        if (!quillModules) {
            setQuillModules({
                toolbar: {
                    container: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [
                            { list: 'ordered' },
                            { list: 'bullet' },
                            { indent: '-1' },
                            { indent: '+1' },
                        ],
                        ['link', 'image'],
                        [{ align: [] }, { color: [] }, { background: [] }],
                        ['clean'],
                        ['code-block'],
                    ],
                },
                ImageResize: { modules: ['Resize', 'DisplaySize', 'Toolbar'] }, // Use ImageResize module
            });
        }
    }, [quillModules]);

    useEffect(() => {
        setEditorData(data || '');
    }, [data]);

    return (
        <div>
            {ReactQuill && quillModules && (
                <ReactQuill
                    style={{ height: '500px' }}
                    value={editorData}
                    modules={quillModules}
                    onChange={(value) => setEditorData(value)}
                />
            )}
        </div>
    );
};

export default Editor;
