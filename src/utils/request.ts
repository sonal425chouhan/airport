export default async function request(url: string) {

  const defaultHeaders = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept': 'application/json'
    }
  };

  const response = await fetch(url, defaultHeaders);

  return {
    body: await response.json(),
  };
}
