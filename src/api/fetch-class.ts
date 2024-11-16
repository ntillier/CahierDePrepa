import { Folder } from "@/core/instance";
import request from "@/core/request";
import * as htmlparser2 from "htmlparser2";

/**
 * Parseur utilisé pour décoder les données au format XML présentes dans le JSON.
 */
const parseXML = (str: string): [number, string][] => {
  const items: [number, string][] = [];
  let option = 0;

  const parser = new htmlparser2.Parser({
    onopentag(name, attribs, isImplied) {
      option = parseInt(attribs.value as string);
    },
    ontext(data) {
      if (option > 0) {
        items.push([option, data]);
      }
    },
  });

  parser.write(str);
  parser.end();

  return items;
};

/**
 *
 * @param session Instance de la session
 * @returns Retourne tous les contenues présent sur l'instance de Cahier de Prépa
 */
export const fetchClass = async (session: InstanceSession): Promise<any> => {
  return new Promise(async (resolve) => {
    // Formulaire de récupération du contenu
    const form = new FormData();
    form.append("action", "docs");

    // Obtention des données
    const res = await request(session, "/recup.php", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      // Décodage du JSON
      const data = await res.json();

      const regexp = /^(.+)\((.+?)\)/;
      const subjects = parseXML(data.mats);
      const tree = new Folder({
        name: "Général",
        id: 1,
        path: "/",
      });

      for (const [id, name] of subjects) {
        const subjectFolders = parseXML(data.reps[id]);

        for (const [id, path] of subjectFolders) {
          tree.createFolder(path, id);

          const folderDocuments = parseXML(data.docs[id]);

          for (const [id, name] of folderDocuments) {
            const m = name.match(regexp) ?? [0, name, ""];
            tree.createDocument(path + "/" + name, {
              id,
              name: m[1],
              format: m[2],
            });
          }
        }
      }

      resolve({
        subjects,
        tree: tree.toObject(),
      });
    } else {
      resolve({});
    }
  });
};
