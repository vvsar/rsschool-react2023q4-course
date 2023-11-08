const CLIENT_ID = "cfdYGk4NiOtEue__iSqawbVIwnqHm03dnyVqT6cLXLg";
const basicUrl = "https://api.unsplash.com";

export async function getResults<T>(
  query: string,
  perPage: string,
  currentPage: string,
): Promise<T> {
  let url = "";
  if (query === "") {
    url = `${basicUrl}/photos/random?count=${perPage}&client_id=${CLIENT_ID}`;
  } else {
    url = `${basicUrl}/search/photos?query=${query}&page=${currentPage}&per_page=${perPage}&client_id=${CLIENT_ID}`;
  }
  return await fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export async function getPhoto<T>(id: string): Promise<T> {
  const url = `${basicUrl}/photos/${id}/?client_id=${CLIENT_ID}`;
  return await fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
