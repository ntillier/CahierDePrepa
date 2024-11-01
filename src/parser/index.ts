import * as htmlparser2 from "htmlparser2";
import { isDocumentItem, isFolderItem } from "./check";
import { FolderHandler } from "./folder";


const Items = {
    Undefined: 0,
    Folder: 1,
    Document: 2
};

const parseHTML = async (html: string) => {
    const data = {
        parent: null,
        folders: [],
        documents: []
    };

    let current = Items.Undefined;
    let item: any = null;

    let level = 0;

    const parser = new htmlparser2.Parser({
        onopentag(name, attribs, isImplied) {
            level += 1;

            if (current !== Items.Undefined && item) {
                item.handleOpenTag(name, attribs, isImplied);
            } else {
                if (isFolderItem(name, attribs)) {
                    current = Items.Folder;
                    item = new FolderHandler({});
                    level = 0;
                }
            }
        },

        ontext(data) {
            if (current !== Items.Undefined && item) {
                item.handleText(data);
            }
        },

        onclosetag(name, isImplied) {

            if (current !== Items.Undefined && item) {
                if (level === 0) {
                    switch (current) {
                        case Items.Folder:
                            data.folders.push(item.toJSON() as never);
                            break;
                    }
                    current = Items.Undefined;
                    item = null;
                } else if (level > 0) {
                    item.handleCloseTag(name, isImplied);
                }
            }

            level -= 1;
        },
    });

    parser.write(html);
    parser.end();

    console.log(data);

    return data;
}

export default parseHTML;