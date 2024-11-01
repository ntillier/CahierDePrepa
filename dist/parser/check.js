"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFolderItem = exports.isDocumentItem = void 0;
const isDocumentItem = (name, attribs) => {
    return name === 'p' && attribs.class === 'doc';
};
exports.isDocumentItem = isDocumentItem;
const isFolderItem = (name, attribs) => {
    return name === 'p' && attribs.class === 'rep';
};
exports.isFolderItem = isFolderItem;
