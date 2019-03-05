export async function callApi(url) {
  let data = {}
  try {
    const response = await fetch(url)
    data = await response.json()
  } catch ({message}) {
    throw new Error(message)
  }
  return data
}
