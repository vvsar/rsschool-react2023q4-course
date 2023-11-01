const PER_PAGE = 4;
const CLIENT_ID = "cfdYGk4NiOtEue__iSqawbVIwnqHm03dnyVqT6cLXLg";
const currentPageNumber = 1;
const basicUrl = "https://api.unsplash.com";

async function getResults<T>(query: string): Promise<T> {
  let url = "";
  if (query === "") {
    url = `${basicUrl}/photos/random?count=${PER_PAGE}&client_id=${CLIENT_ID}`;
  } else {
    url = `${basicUrl}/search/photos?query=${query}&page=${currentPageNumber}&per_page=${PER_PAGE}&client_id=${CLIENT_ID}`;
  }
  return await fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export default getResults;
