"use client";

import { forwardRef, useImperativeHandle, useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

import { formats, modules } from "@/utils/react-quill";

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const Editor = forwardRef(({ onChange, value }: Props, ref) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  useImperativeHandle(ref, () => ({
    // Expose any methods or properties to the parent component if needed
  }));

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      className="h-[65vh] mb-6 whitespace-pre-wrap"
      modules={modules}
      formats={formats}
    />
  );
});

Editor.displayName = "Editor";

export default Editor;
