
const request = async (domain: string, path: string, data: RequestInit, count: number = 5): Promise<Response> => {
    return new Promise(async (resolve, reject) => {
        if (count === 0) {
            return reject();
        }

        const url = `https://${domain}${path}`;
        const res = await fetch(url, data);

        if (res.ok) {
            return resolve(res);
        }

        return resolve(await request(domain, path, data, count - 1));
    });
}

export default request;