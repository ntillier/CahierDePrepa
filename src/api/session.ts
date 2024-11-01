import request, { getCookie } from "@/core/request";

/**
 * Log in to a Cahier
 */
export const logIn = async (
  instance: InstanceSession,
  credentials: InstanceCredentials,
): Promise<InstanceSession> => {
  const form = new FormData();

  form.append("login", credentials.username);
  form.append("motdepasse", credentials.password);
  form.append("permconn", "1");
  form.append("connexion", "1");

  const res = await request(instance, "/ajax.php", {
    method: "POST",
    body: form,
  });

  if (res.ok) {
    const cookies = String(res.headers.get("Set-Cookie"));

    const token = getCookie(cookies, "CDP_SESSION");
    const cookie = getCookie(cookies, "CDP_SESSION_PERM");

    return {
      ...instance,
      token,
      cookie,
      loggedIn: Boolean(token),
    };
  }

  instance.loggedIn = false;
  return instance;
};
