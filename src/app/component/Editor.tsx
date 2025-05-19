"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const Editor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      className="border p-2 rounded w-full"
    />
  );
};

export default Editor;
