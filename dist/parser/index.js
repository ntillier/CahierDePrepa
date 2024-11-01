"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const htmlparser2 = __importStar(require("htmlparser2"));
const check_1 = require("./check");
const folder_1 = require("./folder");
const Items = {
    Undefined: 0,
    Folder: 1,
    Document: 2
};
const parseHTML = (html) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        parent: null,
        folders: [],
        documents: []
    };
    let current = Items.Undefined;
    let item = null;
    let level = 0;
    const parser = new htmlparser2.Parser({
        onopentag(name, attribs, isImplied) {
            level += 1;
            if (current !== Items.Undefined && item) {
                item.handleOpenTag(name, attribs, isImplied);
            }
            else {
                if ((0, check_1.isFolderItem)(name, attribs)) {
                    current = Items.Folder;
                    item = new folder_1.FolderHandler({});
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
                            data.folders.push(item.toJSON());
                            break;
                    }
                    current = Items.Undefined;
                    item = null;
                }
                else if (level > 0) {
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
});
exports.default = parseHTML;
