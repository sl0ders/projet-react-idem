export function getInstrumentsFromApiWithSearchedText(text, page) {
    const url = "http://127.0.0.1:8000/api/music_instruments?name="+ text +"&page=" + page
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}
