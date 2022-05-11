import DisplayField from "../types/displayField"
import Step from "../types/step"

const convertFieldsToDisplayFields = (steps: Step[]): DisplayField[] => {
    const displayFieldsArray: DisplayField[] = []
    for (const step of steps) {
        for (const row of step.Row) {
            for (const field of row.Field) {
                displayFieldsArray.push({
                    id: field.id,
                    value: '',
                    error: false,
                    type: field.type,
                    label: field.label,
                    placeholder: field.placeholder,
                    index: field.index,
                    key: field.key,
                    errorMessage: field.errorMessage,
                    required: field.required,
                    SelectOption: field.SelectOption,
                    RadioOption: field.RadioOption,
                    rowId: field.rowId,
                    selectedRadioOption: null,
                    variantId: field.variantId,
                    helper: field.helper,
                    selectedSelectOption: null,
                    mask: field.mask,
                    stepId: step.id,
                    keyboard: field.keyboard,
                    regex: field.regex,
                    content: field.content ? field.content : '',
                    Action: field.Action,
                    files: [],
                    maxDate: field.maxDate,
                    minDate: field.minDate,
                    multi: field.multi,
                    selectedMultiOptions: []
                })
            }
        }
    }
    return displayFieldsArray
}

export default convertFieldsToDisplayFields