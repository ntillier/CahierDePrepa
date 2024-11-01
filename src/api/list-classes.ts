import request from "@/core/request";
import * as htmlparser2 from "htmlparser2";

/**
 * List public cahiers
 */
export const listClasses = async (
  instance: InstanceSession,
): Promise<ClassInstance[]> => {
  return new Promise(async (resolve) => {
    const data = await request(
      {
        domain: "cahier-de-prepa.fr",
        path: "",
      },
      "/liste",
    );

    const classes: ClassInstance[] = [];

    if (data.ok) {
      let current: string | null = null;

      const parser = new htmlparser2.Parser({
        onopentag(name, attribs, isImplied) {
          if (
            name === "a" &&
            attribs.href?.startsWith("https://cahier-de-prepa.fr")
          ) {
            current = attribs.href;
          }
        },
        ontext(data) {
          if (current) {
            classes.push({
              name: data,
              domain: "cahier-de-prepa.fr",
              path: current.substring(26, current.length - 1),
            });
            current = null;
          }
        },
      });

      parser.write(await data.text());
      parser.end();
    }

    resolve(classes);
  });
};
