import axios from "axios"
import Step from "../types/step"

const getSteps = (formId: number) => {
    return axios.get<Step[]>(`https://forms.clubhub.vip/form/${formId}/step`)
}

export default getSteps