import { ActionFunction, Form, LoaderFunction, useLoaderData } from "remix";
import CommentPreview from "~/components/comment-preview";
import { decorations } from "~/data/comments.server";
import { Decoration, printDecoration } from "~/types/decoration";

export let loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);

  let title = url.searchParams.get("title")?.toString() || "Lorem Ipsum";
  let content =
    url.searchParams.get("content")?.toString() ||
    "Lorem\nIpsum\nDolor\nSit\nAmet";

  let comments = decorations.map((decoration) => ({
    name: decoration.name,
    comment: printDecoration(decoration, title, content.split("\n")),
  }));

  return comments;
};

export default function Index() {
  let comments = useLoaderData<{ name: string; comment: string }[]>();

  return (
    <main>
      <h1>Decoration</h1>
      <hr />
      <Form
        style={{ display: "flex", flexDirection: "column", width: "20rem" }}
      >
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" />

        <label htmlFor="content">Content</label>
        <textarea name="content" id="content" rows={10}></textarea>
        <button type="submit">Submit</button>
      </Form>
      <hr />
      {comments.map(({ name, comment }) => (
        <CommentPreview key={name} name={name} comment={comment} />
      ))}
    </main>
  );
}
