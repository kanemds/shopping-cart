export const api = "http://localhost:6001"


export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": localStorage.getItem("token")
    }
  }
  return headers
}