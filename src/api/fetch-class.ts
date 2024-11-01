import request from "@/core/request";
import * as htmlparser2 from "htmlparser2";

const parseXML = (str: string): [number, string][] => {
  const items: [number, string][] = [];
  let option = 0;

  const parser = new htmlparser2.Parser({
    onopentag(name, attribs, isImplied) {
      option = parseInt(attribs.value as string);
    },
    ontext(data) {
      if (option !== 0) {
        items.push([option, data]);
      }
    },
  });

  parser.write(str);
  parser.end();

  return items;
};

export const fetchClass = async (session: InstanceSession) => {
  return new Promise(async (resolve) => {
    const form = new FormData();
    form.append("action", "docs");
    const res = await request(session, "/recup.php", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      const data = await res.json();

      const subjects = parseXML(data.mats);

      for (const subject of subjects) {
        console.log(subject[1], parseXML(data.reps[subject[0]]));
      }

      //console.log(Object.keys(data));
      // [ 'recupok', 'mats', 'reps', 'docs' ]
    }
  });
};
