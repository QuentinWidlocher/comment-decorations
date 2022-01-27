export interface Decoration {
  name: string;
  titleTemplate: string;
  beforeContent?: string;
  afterContent?: string;
  filler: string;
}

export function printDecoration(
  decoration: Decoration,
  title: string,
  content: string[]
): string {
  let displayedTitle = decoration.titleTemplate.replace("$TITLE", title);

  let result = displayedTitle;

  for (let line of content) {
    result += "\n";

    if (decoration.beforeContent) {
      result += decoration.beforeContent;
    }

    result += line;

    if (decoration.afterContent) {
      result += decoration.afterContent;
    }
  }

  result +=
    "\n" +
    decoration.filler.repeat(
      displayedTitle.length / Math.max(decoration.filler.length, 1)
    );

  return addCommentCharacters(result, "java");
}

export function addCommentCharacters(comment: string, commentType: "java") {
  if (commentType === "java") {
    let result = "/*";
    for (let line of comment.split("\n")) {
      result += "\n * " + line;
    }
    result += "\n */";
    return result;
  } else {
    return comment;
  }
}
