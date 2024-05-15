import {
  directivesPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
} from "@mdxeditor/editor";
import { VideoDirectiveDescriptor } from "./mdx/video";
import { AudioDirectiveDescriptor } from "./mdx/audio";
import { DiagramDirectiveDescriptor } from "./mdx/diagram";
import {
  PdfDirectiveDescriptor,
  PresentationDirectiveDescriptor,
} from "./mdx/pdf";
import { FileDirectiveDescriptor } from "./mdx/file/FileDescriptor";
import { TestDirectiveDescriptor } from "./mdx/test/TestDescriptor";

export const plugins = [
  listsPlugin(),
  quotePlugin(),
  headingsPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  tablePlugin(),
  thematicBreakPlugin(),
  markdownShortcutPlugin(),
  imagePlugin(),
  directivesPlugin({
    directiveDescriptors: [
      VideoDirectiveDescriptor,
      AudioDirectiveDescriptor,
      DiagramDirectiveDescriptor,
      PdfDirectiveDescriptor,
      PresentationDirectiveDescriptor,
      FileDirectiveDescriptor,
      TestDirectiveDescriptor,
    ],
  }),
];
