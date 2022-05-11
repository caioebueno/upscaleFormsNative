import DisplayField from "../types/displayField"

const verifyRequired = (displayFields: DisplayField[]) => {
    let pass = true
    for (const field of displayFields) {
        console.log(field.label, field.value)
        if(
            field.required && 
            field.value.length === 0 &&
            field.selectedSelectOption === null
        ) {
            pass = false
        }
    }
    console.log(pass)
    return pass
}

export default verifyRequired