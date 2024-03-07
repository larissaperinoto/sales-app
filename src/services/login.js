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

  const now = new Date().getTime();

  const expiration = now + data.expirationTime * 1000;

  localStorage.setItem('accessToken', data.token);
  localStorage.setItem('expiresIn', expiration);
}

export function getToken() {
  const token = localStorage.getItem('accessToken');
  return token;
}

export async function isUserLogged() {
  const now = new Date().getTime();
  const expiresIn = localStorage.getItem('expiresIn');
  if (now > +expiresIn) {
    return false;
  } else {
    return true;
  }
}