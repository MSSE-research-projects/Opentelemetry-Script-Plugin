export const storeCredential = (credential) => {
  localStorage.setItem("credential", credential);
}

export const deleteCredential = () => {
  localStorage.removeItem("credential");
}

export const getCredential = () => {
  return localStorage.getItem("credential");
}
