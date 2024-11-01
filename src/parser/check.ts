
type Attribs = Record<string, string>;

export const isDocumentItem = (name: string, attribs: Attribs): boolean => {
    return name === 'p' && attribs.class === 'doc';
}

export const isFolderItem = (name: string, attribs: Attribs): boolean => {
    return name === 'p' && attribs.class === 'rep';
}