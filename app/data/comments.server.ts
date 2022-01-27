import { Decoration } from "~/types/decoration";

export const decorations: Decoration[] = [
  {
    name: "Classic",
    titleTemplate: "--------- $TITLE ---------",
    beforeContent: "| ",
    filler: "-",
  },
  {
    name: "Double",
    titleTemplate: "========== $TITLE ==========",
    beforeContent: "|| ",
    filler: "=",
  },
  {
    name: "Arrows",
    titleTemplate: "---------> $TITLE <---------",
    beforeContent: "> ",
    filler: "-",
  },
  {
    name: "Bubbles",
    titleTemplate: "oOoOoOoOoO $TITLE <oOoOoOoOoO",
    beforeContent: " ",
    filler: "oO",
  },
  {
    name: "Boring",
    titleTemplate: "$TITLE",
    beforeContent: "",
    filler: "",
  },
  {
    name: "Magical",
    titleTemplate: "━☆ﾟ.*･｡ﾟ $TITLE ﾟ｡･*.ﾟ☆━",
    beforeContent: "✿ ",
    filler: "☆ﾟ.*･｡ﾟ",
  },
];
