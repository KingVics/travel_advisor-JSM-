import axios from "axios"




export const getPlacesData = async(type,sw, ne) => {
    try {
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng
                },
                headers: {
                'x-rapidapi-key': '663ed16467msh1ed53f20c93dbe0p108d40jsn4109711d33eb',
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
                }
            
            }
        )
        return data
    } catch (error) {
        console.log(error)
    }
}