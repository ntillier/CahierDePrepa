/**
 * Formats the path of a ressource
 */
export const getPath = (session: InstanceSession, path: string) => {
  return `https://${session.domain}${session.path}${path}`;
};

/**
 * Parses cookies
 */
export const getCookie = (
  cookies: string,
  match: string,
): string | undefined => {
  const matches = cookies.match(new RegExp(`${match}=(.+?)(;|\\s|$)`));

  if (matches && matches.length >= 2) {
    return matches[1];
  }

  return undefined;
};

/**
 * Serialize cookies
 */
export const serializeCookies = (
  cookies: Record<string, string | undefined>,
): string => {
  let str = "";

  for (const [key, value] of Object.entries(cookies)) {
    if (value !== undefined && value !== null) {
      str += `${encodeURIComponent(key)}=${encodeURIComponent(value)}; `;
    }
  }

  return str;
};

/**
 * Function to make a request to a cahier
 */
const request = async (
  session: InstanceSession,
  path: string,
  data: RequestInit = {},
  count: number = 5,
): Promise<Response> => {
  return new Promise(async (resolve, reject) => {
    if (count === 0) {
      return resolve({
        ok: false,
      } as Response);
    }

    let res;

    try {
      res = await fetch(
        getPath(session, path),
        Object.assign(data, {
          headers: {
            Cookie: serializeCookies({
              CDP_SESSION_PERM: session.cookie,
              CDP_SESSION: session.token,
            }),
          },
        }),
      );
    } catch (_) {
      return resolve(await request(session, path, data, count - 1));
    }

    if (res && res.ok) {
      return resolve(res);
    }

    return resolve(await request(session, path, data, count - 1));
  });
};

export default request;
