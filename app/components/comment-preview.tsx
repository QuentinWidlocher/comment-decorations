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
    <section className="card" onClick={copy} style={{ cursor: "pointer" }}>
      <h2 className="text-white text-xl font-bold mb-3">{name}</h2>
      <pre>{comment}</pre>
    </section>
  );
}
