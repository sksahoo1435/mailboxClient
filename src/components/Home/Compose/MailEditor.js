import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { Button } from "react-bootstrap";
import {
  GrClearOption,
  GrBlockQuote,
  GrSubscript,
  GrSuperscript,
} from "react-icons/gr";
import { SiCodersrank } from "react-icons/si";
import { BiRuler } from "react-icons/bi";
import {
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaParagraph,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaLevelDownAlt,
  FaCode,
  FaUndo,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setMail } from "../../../store/slices/mail-slice";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <FaBold />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <FaItalic />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <FaStrikethrough />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is_active" : ""}
      >
        <FaUnderline />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        className={editor.isActive("subscript") ? "is-active" : ""}
      >
        <GrSubscript />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        className={editor.isActive("superscript") ? "is-active" : ""}
      >
        <GrSuperscript />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        <FaCode />
      </Button>
      <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        <GrClearOption />
      </Button>

      <Button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        <FaParagraph />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h3
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        h4
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        h5
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        h6
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <FaListUl />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <FaListOl />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        <SiCodersrank />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        <GrBlockQuote />
      </Button>
      <Button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <BiRuler />
      </Button>
      <Button onClick={() => editor.chain().focus().setHardBreak().run()}>
        <FaLevelDownAlt />
      </Button>
      <Button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <FaUndo />
      </Button>
      <Button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <FaRedo />
      </Button>
    </div>
  );
};

const MailEditor = () => {
  const dispatch = useDispatch();
  const editor = useEditor({
    extensions: [StarterKit, Underline, Subscript, Superscript],
    content: ``,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();    
      html.length > 7 ? dispatch(setMail(html)) : dispatch(setMail(null));
    },
  });

  return (
    <div className="mailEditor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default MailEditor;
