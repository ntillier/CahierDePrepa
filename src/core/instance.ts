export const segmentify = (path: string): string[] => {
  return path
    .split("/")
    .map((i) => i.trim())
    .filter((i) => i.length > 0);
};

interface FolderMetadata {
  id?: number;
  name: string;
  path: string;
}

export class Folder {
  public folder: FolderMetadata;
  public children: Record<string, Folder>;
  public documents: Record<string, TreeDocument>;

  constructor(folder: FolderMetadata) {
    this.folder = folder;
    this.children = {};
    this.documents = {};
  }

  private pushSegment(segment: string[], folder: FolderMetadata) {
    const current = segment.shift();

    if (!current) {
      return;
    }

    if (!(current in this.children)) {
      this.children[current] = new Folder(folder);
    }

    this.children[current].pushSegment(segment, folder);
  }

  private pushDocument(segment: string[], document: TreeDocument) {
    const current = segment.pop();

    if (!current) {
      return;
    }

    if (segment.length === 0) {
      this.documents[current] = document;
    } else {
      this.pushDocument(segment, document);
    }
  }

  createFolder(path: string, id?: number) {
    const segment = segmentify(path);

    if (segment.length > 0) {
      this.pushSegment(segment, {
        id,
        path,
        name: segment[segment.length - 1],
      });
    }
  }

  createDocument(path: string, document: TreeDocument) {
    const segments = segmentify(path);
    this.pushSegment(segments.slice(0, segments.length - 1), {
      name: segments[segments.length - 1],
      path: segments.slice(0, segments.length - 1).join("/"),
    });
    this.pushDocument(segments, document);
  }

  toObject(): TreeFolder {
    const children: TreeFolder[] = [];
    const documents: TreeDocument[] = [];

    for (const value of Object.values(this.children)) {
      children.push(value.toObject());
    }

    for (const value of Object.values(this.documents)) {
      documents.push(value);
    }

    return {
      children,
      documents,
      id: this.folder.id,
      name: this.folder.name,
      path: this.folder.path,
    };
  }
}
