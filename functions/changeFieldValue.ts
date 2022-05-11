import DisplayField from "../types/displayField"


const changeFieldValue = (
    setDisplayFields: React.Dispatch<React.SetStateAction<DisplayField[]>>,
    fieldId: number,
    property: 'selectedRadioOption' | 'selectedSelectOption' | 'value' | 'selectedMultiOptions',
    value: any
) => {
    setDisplayFields(fields => {
        const newState = [...fields]
        const fieldIndex = newState.findIndex(item => item.id === fieldId)
        newState[fieldIndex][property] = value
        return newState
    })
}

export default changeFieldValue