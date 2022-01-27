import { ActionFunction, Form, LoaderFunction, useLoaderData } from "remix";
import CommentPreview from "~/components/comment-preview";
import { decorations } from "~/data/comments.server";
import { Decoration, printDecoration } from "~/types/decoration";

export let loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);

  let title = url.searchParams.get("title")?.toString() || "";
  let content = url.searchParams.get("content")?.toString() || "";
  let language = url.searchParams.get("lang")?.toString() || "java";
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
    <main className="sm:mx-5 md:mx-16 lg:mx-28 xl:mx-56 bg-blue flex flex-col py-5">
      <h1 className="text-2xl mx-auto hover:underline underline-offset-2 cursor-pointer">
        <a href="/">Decoration</a>
      </h1>
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
          <label htmlFor="lang">Language</label>
          <select className="border rounded px-2 py-1" name="lang" id="lang">
            <option value="java">Java</option>
            <option value="html">HTML</option>
            <option value="python">Python</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="content">Content</label>
          <textarea
            className="border rounded px-2 py-1"
            name="content"
            id="content"
            rows={10}
          ></textarea>
        </div>

        <button
          className="bg-blue-500 text-white rounded hover:bg-white hover:border-blue-500 hover:text-blue-500 border border-transparent px-2 py-1"
          type="submit"
        >
          Submit
        </button>
      </Form>
      <hr className="opacity-60 my-5" />
      <section className="mx-auto w-80 space-y-10">
        {comments.map(({ name, comment }) => (
          <CommentPreview key={name} name={name} comment={comment} />
        ))}
      </section>
    </main>
  );
}
