import { AdapterFunction } from ".";

const fetchAdapter: AdapterFunction = async ({
  url,
  method,
  data,
  headers,
}) => {
  let body: any = data;
  const contentType: string | undefined = headers["Content-Type"];
  if (contentType === "application/json") {
    body = JSON.stringify(body);
  }
  const response = await fetch(url, {
    method,
    body,
    headers,
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(err);
  }
  let text: any = await response.text();
  if (typeof text === "string") {
    try {
      text = JSON.parse(text);
    } catch {}
  }
  return {
    data: text,
    headers: Object.fromEntries(response.headers.entries()),
    status: response.status,
  };
};

export default fetchAdapter;
