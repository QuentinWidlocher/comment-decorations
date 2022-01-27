import { hydrate } from "react-dom";
import { RemixBrowser } from "remix";

console.debug(`
Hi dev !
Secret cheat-code, I don't escape my templating tags so you can use them in this app.
For example, you can prepend a comment line with $FILL( ) to center your text.

Each comment automatically append $FILL( ) to the end of the line in order to make the HTML comments works as expected.

You can put anything inside the $FILL( ) tags, you can also insert the title with $TITLE (but that's not very useful).

If you want to see a specific decoration, you can use the URL query parameter "decoration" to specify the decoration name (with spaces).
It can be useful to query this page from a scraper or something. (Maybe I'll add an API later)

Final tip : use the url to call the "Dev" decoration. It's a decoration that doesn't do anything so you can do what you want in the content.

Don't forget to visit the source code on https://github.com/QuentinWidlocher/comment-decorations

`);

hydrate(<RemixBrowser />, document);
