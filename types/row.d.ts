import Field from "./field";

interface Row {
    id: number
    index: number
    Field: Field[]
    stepId: number
}

export default Row