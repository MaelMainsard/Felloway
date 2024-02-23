export function getLoggedUser() {
  const user = JSON.parse(sessionStorage.getItem('loggedUser'));
  return user;
}