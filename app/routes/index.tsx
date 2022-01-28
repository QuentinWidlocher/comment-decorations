import { ActionFunction, Form, LoaderFunction, useLoaderData } from "remix";
import CommentPreview from "~/components/comment-preview";
import { decorations } from "~/data/comments.server";
import { Decoration, Language, printDecoration } from "~/types/decoration";

export let loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);

  let title = url.searchParams.get("title")?.toString() || "Title";
  let content =
    url.searchParams.get("content")?.toString() || "Put your content here";
  let language =
    (url.searchParams.get("lang")?.toString() as Language) || "java";
  let decorationName = url.searchParams.get("decoration")?.toString();

  let deco = decorationName
    ? decorations.filter((d) => d.name === decorationName)
    : decorations.filter((d) => d.name != "Dev");

  let comments = deco.map((decoration) => ({
    name: decoration.name,
    comment: printDecoration(decoration, title, content.split("\n"), language),
  }));

  return comments;
};

export default function Index() {
  let comments = useLoaderData<{ name: string; comment: string }[]>();

  return (
    <main className="h-screen w-screen grid-cols-[1fr_4fr] grid-rows-1 md:grid">
      <section className="flex flex-col p-5">
        <h1 className="mx-auto text-2xl underline-offset-2 hover:underline">
          <a href="/">Comment Decorations</a>
        </h1>
        <h2 className="mx-auto opacity-50">Click to copy !</h2>
        <hr className="my-5 opacity-60" />
        <Form className="mx-auto mb-5 flex w-80 flex-col space-y-5">
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              className="rounded border px-2 py-1"
              type="text"
              name="title"
              id="title"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="lang">Comment type</label>
            <select className="rounded border px-2 py-1" name="lang" id="lang">
              <option value="plain">Plain text</option>
              <option value="java">Java</option>
              <option value="html">HTML</option>
              <option value="python">Python</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="content">Content</label>
            <textarea
              className="flex-1 rounded border px-2 py-1"
              name="content"
              id="content"
              rows={10}
            ></textarea>
          </div>

          <button
            className="rounded border border-transparent bg-blue-500 px-2 py-1 text-white shadow shadow-blue-500/50 hover:bg-blue-600 hover:text-blue-50 active:translate-y-px active:transform"
            type="submit"
          >
            Submit
          </button>
        </Form>
        <div className="mt-auto flex justify-around">
          <a
            className="underline-offset-2 hover:underline"
            href="https://quentin.widlocher.com"
          >
            Quentin Widlocher
          </a>
          <a
            className="underline-offset-2 hover:underline"
            href="https://github.com/QuentinWidlocher/comment-decorations"
          >
            See on Github
          </a>
        </div>
      </section>
      <section className="overflow-y-auto p-5">
        <div className="flex flex-wrap items-stretch">
          {comments.map(({ name, comment }) => (
            <div className="w-full p-5 lg:w-1/2 xl:w-1/3">
              <CommentPreview key={name} name={name} comment={comment} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
