import { ActionFunction, Form, LoaderFunction, useLoaderData } from "remix";
import CommentPreview from "~/components/comment-preview";
import { decorations } from "~/data/comments.server";
import { Decoration, Language, printDecoration } from "~/types/decoration";

export let loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);

  let title = url.searchParams.get("title")?.toString() || "";
  let content = url.searchParams.get("content")?.toString() || "";
  let language =
    (url.searchParams.get("lang")?.toString() as Language) || "java";
  let decorationName = url.searchParams.get("decoration")?.toString();

  let deco = decorationName
    ? decorations.filter((d) => d.name === decorationName)
    : decorations;

  let comments = deco.map((decoration) => ({
    name: decoration.name,
    comment: printDecoration(decoration, title, content.split("\n"), language),
  }));

  return comments;
};

export default function Index() {
  let comments = useLoaderData<{ name: string; comment: string }[]>();

  return (
    <main className="w-screen h-screen grid grid-cols-[1fr_4fr] grid-rows-1">
      <section className="p-5 flex flex-col">
        <h1 className="text-2xl mx-auto hover:underline underline-offset-2">
          <a href="/">Comment Decorations</a>
        </h1>
        <h2 className="mx-auto opacity-50">Click to copy !</h2>
        <hr className="opacity-60 my-5" />
        <Form className="flex flex-col space-y-5 mx-auto w-80">
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              className="border rounded px-2 py-1"
              type="text"
              name="title"
              id="title"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="lang">Comment type</label>
            <select className="border rounded px-2 py-1" name="lang" id="lang">
              <option value="plain">Plain text</option>
              <option value="java">Java</option>
              <option value="html">HTML</option>
              <option value="python">Python</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="content">Content</label>
            <textarea
              className="border rounded px-2 py-1 flex-1"
              name="content"
              id="content"
              rows={10}
            ></textarea>
          </div>

          <button
            className="bg-blue-500 text-white rounded hover:text-blue-50 hover:bg-blue-600 shadow shadow-blue-500/50 active:transform active:translate-y-px border border-transparent px-2 py-1"
            type="submit"
          >
            Submit
          </button>
        </Form>
        <div className="mt-auto flex justify-around">
          <a
            className="hover:underline underline-offset-2"
            href="https://quentin.widlocher.com"
          >
            Quentin Widlocher
          </a>
          <a
            className="hover:underline underline-offset-2"
            href="https://github.com/QuentinWidlocher/comment-decorations"
          >
            See on Github
          </a>
        </div>
      </section>
      <section className="overflow-y-auto p-5">
        <div className="flex flex-wrap items-stretch">
          {comments.map(({ name, comment }) => (
            <div className="w-1/3 p-3">
              <CommentPreview key={name} name={name} comment={comment} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
