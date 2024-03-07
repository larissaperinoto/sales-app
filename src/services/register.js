export async function register({ email, password, phone, name }) {

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const registerPath = process.env.REACT_APP_REGISTER_PATH;

  const response = await fetch(baseUrl + registerPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, phone, name })
  });
  
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message ?? 'Não foi possível realizar cadastrar o usuário.');
  }
}