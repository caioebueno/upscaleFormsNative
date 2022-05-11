import axios from "axios"
import MapSearchResponse from "../types/mapSearchResponse"

const searchAddress = (query: string) => {
    const url = encodeURI(`https://forms.clubhub.vip/map/${query}`)
    return axios.get<MapSearchResponse[]>(url)
}

export default searchAddress