import { getToken } from "./login";

export async function getProducts() {

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const productsPath = process.env.REACT_APP_PRODUCTS_PATH;
  const token = getToken();

  console.log(token)

  const response = await fetch(baseUrl + productsPath, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  });

  if (!response.ok) {
    throw new Error('Não foi possível buscar os produtos.');
  }

  const data = await response.json();

  return data;
}