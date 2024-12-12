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
        <div className="h-[600px]">
            {ReactQuill && quillModules && (
                <ReactQuill
                    style={{ height: '95%', border: 'none' }}
                    value={editorData}
                    modules={quillModules}
                    onChange={(value) => setEditorData(value)}
                    className="bg-white text-gray-800 placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            )}
        </div>
    );
};

export default Editor;
