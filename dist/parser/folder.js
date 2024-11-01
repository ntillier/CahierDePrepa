"use strict";
// <p class="rep">
// <span class="repcontenu">
// (6 répertoires, 4 documents)
// </span>
// <a href="?rep=4">
// <span class="icon-rep">
// </span>
// <span class="nom">
// Documents de cours
// </span>
// </a>
// </p>
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderHandler = void 0;
/**
 * Steps:
 *
 */
class FolderHandler {
    constructor(data) {
        this.folder = data;
        this.step = 0;
    }
    handleText(text) {
        console.log('text:', text);
    }
    handleOpenTag(name, attributes, isImplied) {
        // Link
        if (name === 'a' && attributes.href !== null) {
            const params = new URLSearchParams(attributes.href);
            if (params.get('rep')) {
                this.folder.matiere = attributes.href.substring(1);
            }
            else {
                this.folder.id = parseInt(params.get('rep'));
            }
        }
    }
    handleCloseTag(name, isImplied) {
        console.log('open:', name);
    }
    toJSON() {
        return this.folder;
    }
}
exports.FolderHandler = FolderHandler;
