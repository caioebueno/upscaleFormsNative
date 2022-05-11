import ActionDisplay from "./actionDisplay";
import KeyboardType from "./keyboardTypeEnum";

interface DisplayField {
    id: number
    value: string
    error: boolean
    errorMessage: string
    label: string
    index: number
    type: string
    stepId: number
    mask: string
    helper?: string
    placeholder: string
    key: string
    required: boolean
    SelectOption: SelectOption[]
    RadioOption: RadioOption[]
    files: any[]
    rowId: number
    keyboard: KeyboardType
    content?: string
    regex?: string
    selectedRadioOption: {
        connect: {
            id: number
        }
    } | null
    selectedSelectOption: {
        connect: {
            id: number
        }
    } | null
    Action: ActionDisplay | null
    maxDate: string | undefined
    minDate: string | undefined
    multi: boolean | undefined
    selectedMultiOptions?: string[]
    variantId: null | number
}

export default DisplayField