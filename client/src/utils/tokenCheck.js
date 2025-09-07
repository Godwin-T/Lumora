export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(atob(payloadBase64));
    const now = Math.floor(Date.now() / 1000);

    return payload.exp && payload.exp < now;
  } catch (err) {
    console.error("Invalid token", err);
    return true;
  }
};
