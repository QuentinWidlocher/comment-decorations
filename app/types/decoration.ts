export interface Decoration {
  name: string;
  titleTemplate: string;
  beforeContent?: string;
  afterContent?: string;
  filler: string;
}

export type Language = "java" | "html" | "python";

export function printDecoration(
  decoration: Decoration,
  title: string,
  content: string[],
  lang: Language
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

  return addCommentCharacters(result, lang);
}

export function addCommentCharacters(comment: string, commentType: Language) {
  let result = "";
  switch (commentType) {
    case "java":
      result = "/*";
      for (let line of comment.split("\n")) {
        result += "\n * " + line;
      }
      result += "\n */";
      break;

    case "html":
      for (let line of comment.split("\n")) {
        if (line) {
          result += "<!-- " + line + " -->\n";
        }
      }
      break;

    case "python":
      for (let line of comment.split("\n")) {
        if (line) {
          result += "# " + line + "\n";
        }
      }
      break;

    default:
      result = comment;
      break;
  }

  return result;
}
