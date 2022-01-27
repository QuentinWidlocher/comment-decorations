export interface Decoration {
  name: string;
  titleTemplate: string;
  footerTemplate?: string;
  beforeContent?: string;
  afterContent?: string;
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

  if (decoration.footerTemplate) {
    result += "\n" + decoration.footerTemplate;
  }

  // We retrieve the max line length, excluding the fillers
  let maxLineLength = result
    .replace(/\$FILL\(([^)]+)\)/g, "")
    .split("\n")
    .reduce((max, line) => {
      return Math.max(max, line.length);
    }, 0);

  console.log(maxLineLength);

  let filledResult = "";
  let lineIndex = 0;
  for (let line of result.split("\n")) {
    let firstOrLastLine =
      lineIndex === 0 || lineIndex === result.split("\n").length - 1;

    let howManyFills = line.match(/\$FILL\(([^()]|)*\)/g)?.length ?? 1;

    filledResult += line.replace(/\$FILL\(([^)]+)\)/g, (match, filler) => {
      if (!firstOrLastLine && decoration.afterContent) {
        console.log(`${lineIndex} ${line}`);
        console.log(`${filler} ${decoration.afterContent}`);

        let repeatSize = Math.max(
          Math.round(
            (maxLineLength - line.replace(/\$FILL\(([^)]+)\)/g, "").length) /
              howManyFills /
              filler.length
          ),
          0
        );

        console.log(`repeatSize: ${repeatSize}`);
        return filler.repeat(repeatSize);
      } else {
        let repeatSize = Math.round(
          (maxLineLength - line.replace(/\$FILL\(([^)]+)\)/g, "").length) /
            howManyFills /
            filler.length
        );
        return filler.repeat(repeatSize);
      }
    });
    filledResult += "\n";
    lineIndex++;
    console.debug("filledResult", "\n" + filledResult);
  }

  return addCommentCharacters(filledResult, lang);
}

export function addCommentCharacters(comment: string, commentType: Language) {
  let result = "";
  switch (commentType) {
    case "java":
      result = "/*";
      let lineIndex = 0;
      for (let line of comment.split("\n")) {
        if (lineIndex < comment.split("\n").length - 1) {
          result += "\n * " + line;
        } else {
          result += " \n */";
        }
        lineIndex++;
      }

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
