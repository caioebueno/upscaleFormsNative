import ActionDisplay from "./actionDisplay";
import KeyboardType from "./keyboardTypeEnum";
import RadioOption from "./radioOption";
import SelectOption from "./selectOption";

interface Field {
    id: number
    type: string
    required: boolean
    index: number
    label: string
    mask: string
    regex: string
    stepId: number
    helper?: string
    SelectOption: SelectOption[]
    RadioOption: RadioOption[]
    errorMessage: string
    rowId: number
    key: string
    content?: string
    placeholder: string
    keyboard: KeyboardType
    Action:  ActionDisplay | null
    minDate?: string
    maxDate?: string
    multi?: booelan
    variantId: number | null
}

export default Field