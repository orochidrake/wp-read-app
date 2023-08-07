
const API_URL = <string>process.env.NEXT_PUBLIC_WORDPRESS_API_ENDPOINT;

export async function fetchAPI(pathUrl: string) {
  
  const res = await fetch(API_URL+pathUrl, {
    method: "GET",
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json;
}
