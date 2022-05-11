interface MapItem {
    description: string
    geometry: {
        location: {
            lat: number
            lng: number
        }
    },
    structured_formatting: {
        main_text: string
        secondary_text: string
    }
    address_components: any[]
}

interface MapSearchResponse {
    results: MapItem[]
}

export default MapItem