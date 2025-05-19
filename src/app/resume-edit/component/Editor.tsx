import React, { useRef, useEffect, useCallback } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const Editor = ({ value, onChange, placeholder = "请输入内容" }: Props) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md"
      ref={editorRef}
      contentEditable={true}
      suppressContentEditableWarning={true}
      onInput={handleChange}
    >
      {value ? (
        <div dangerouslySetInnerHTML={{ __html: value }} />
      ) : (
        <p className="text-gray-400">{placeholder}</p>
      )}
    </div>
  );
};
export default Editor;
