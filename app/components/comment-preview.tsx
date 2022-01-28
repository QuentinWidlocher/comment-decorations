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
    <section className="card" onClick={copy}>
      <h2 className="mb-3 text-xl font-bold text-white">{name}</h2>
      <pre className="w-100 overflow-x-auto">{comment}</pre>
    </section>
  );
}
