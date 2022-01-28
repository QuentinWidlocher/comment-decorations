import { useState } from "react";
import { Decoration, printDecoration } from "~/types/decoration";

interface CommentPreviewProps {
  name: string;
  comment: string;
}

export default function CommentPreview({ comment, name }: CommentPreviewProps) {
  let [displayToast, setDisplayToast] = useState(false);

  function copy() {
    navigator.clipboard.writeText(comment);
    setDisplayToast(true);
    setTimeout(() => {
      setDisplayToast(false);
    }, 2000);
  }

  return (
    <section className="card relative" onClick={copy}>
      <h2 className="mb-3 text-xl font-bold text-white">{name}</h2>
      <pre className="w-100 overflow-x-auto">{comment}</pre>
      <div className="absolute top-0 left-0 flex h-full w-full">
        <span
          className={`m-auto rounded bg-gray-500/75 px-5 py-3 text-white transition-opacity ${
            displayToast ? "opacity-100" : "opacity-0"
          }`}
        >
          Copied to clipboard !
        </span>
      </div>
    </section>
  );
}
