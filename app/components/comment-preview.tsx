import { Decoration, printDecoration } from "~/types/decoration";

interface CommentPreviewProps {
  name: string;
  comment: string;
}

export default function CommentPreview({ comment, name }: CommentPreviewProps) {
  function copy() {
    navigator.clipboard.writeText(comment);
  }

  return (
    <section onClick={copy} style={{ cursor: "pointer" }}>
      <h2>{name}</h2>
      <pre>{comment}</pre>
    </section>
  );
}
