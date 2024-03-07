export async function login({ email, password }) {

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const loginPath = process.env.REACT_APP_LOGIN_PATH;

  const response = await fetch(baseUrl + loginPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error('Não foi possível realizar o login.');
  }

  const data = await response.json();

  localStorage.setItem('accessToken', data.token);
  localStorage.setItem('expiresIn', data.expirationTime);

}