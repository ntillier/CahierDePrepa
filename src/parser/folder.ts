
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

/**
 * Steps:
 * 
 */
export class FolderHandler {
    private folder: Partial<Folder>;
    private step: number;


    constructor(data: Partial<Folder>) {
        this.folder = data;
        this.step = 0;
    }

    handleText(text: string) {
        console.log('text:', text);
    }

    handleOpenTag(name: string, attributes: Record<string, string>, isImplied: boolean) {
        
        // Link
        if (name === 'a' && attributes.href !== null) {
            const params = new URLSearchParams(attributes.href);

            if (params.get('rep')) {
                this.folder.matiere = attributes.href.substring(1);
            } else {
                this.folder.id = parseInt(params.get('rep') as string);
            }
        }
    }

    handleCloseTag(name: string, isImplied: boolean) {
        console.log('open:', name);
    }

    toJSON() {
        return this.folder;
    }
}