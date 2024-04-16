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
  let text: string = await response.text();
  try {
    text = JSON.parse(text);
    // eslint-disable-next-line no-empty
  } catch {}
  return {
    data: text as any,
    headers: Object.fromEntries(response.headers.entries()),
    status: response.status,
  };
};

export default fetchAdapter;
