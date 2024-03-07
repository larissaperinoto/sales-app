import { getToken } from "./login";

export async function getProducts() {

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const productsPath = process.env.REACT_APP_PRODUCTS_PATH;
  const token = getToken();

  const response = await fetch(baseUrl + productsPath, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  });

  if (response.status === 401) {
    window.open('/');
  }

  if (!response.ok) {
    throw new Error('Não foi possível buscar os produtos.');
  }

  const data = await response.json();

  return data;
}

export async function createProdut(product) {

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const productsPath = process.env.REACT_APP_PRODUCTS_PATH;
  const token = getToken();

  const response = await fetch(baseUrl + productsPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(product)
  });

  if (response.status === 401) {
    window.open('/');
  }

  if (response.status !== 201) {
    throw new Error('Não foi possível cadastrar produto.');
  }

  if (response.status === 409) {
    throw new Error('O produto já existe, utilize um nome diferente.');
  }
}

export async function updateProduct(product) {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const productsPath = process.env.REACT_APP_PRODUCTS_PATH;
  const token = getToken();

  const response = await fetch(baseUrl + productsPath, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(product)
  });
  
  if (response.status === 401) {
    window.open('/');
  }

  if (!response.ok) {
    throw new Error('Não foi possível atualizar o produto.');
  }
}