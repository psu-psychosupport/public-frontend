import { MDXEditor } from "./editor.client";
import React, { forwardRef } from "react";
import {plugins} from "./plugins";
import { MDXEditorMethods } from "@mdxeditor/editor";
import "./inter.css"


export interface EditorProps {
  content: string;
}

const MarkdownViewer = forwardRef<MDXEditorMethods, EditorProps>(
  ({ content}, ref) => {
    return (
      <MDXEditor
        ref={ref}
        markdown={content}
        plugins={plugins}
        contentEditableClassName={"inter"}
        readOnly
      />
    );
  }
);

export default MarkdownViewer;
