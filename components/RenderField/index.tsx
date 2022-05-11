import React from 'react';
import { Text, View } from 'react-native';
import changeFieldValue from '../../functions/changeFieldValue';
import DisplayField from '../../types/displayField';
import AddressInput from '../AddressInput';
import CurrencyInput from '../CurrencyInput';
import DateInput from '../DateInput';
import MultiCheckboxInput from '../MultiCheckboxInput';
import NumberInput from '../NumberInput';
import RadioInput from '../RadioInput';
import SelectInput from '../SelectInput';
import TextInput from '../TextInput';

// import { Container } from './styles';

interface RenderFieldInterface {
    fields: DisplayField[]
    setDisplayFields: React.Dispatch<React.SetStateAction<DisplayField[]>>
}

const RenderField: React.FC<RenderFieldInterface> = ({
    fields,
    setDisplayFields
}) => {
    const renderField = (field: DisplayField) => {
        switch (field.type) {
            case 'TEXT':
                return (
                    <TextInput
                        label={field.label}
                        mask={field.mask}
                        placeholder={field.placeholder}
                        onChange={(e) => changeFieldValue(setDisplayFields, field.id, 'value', e)}
                    />
                )
            case 'RADIO':
                return (
                    <RadioInput
                        label={field.label}
                        options={field.RadioOption}
                        onSelect={(e) => changeFieldValue(setDisplayFields, field.id, "selectedSelectOption", e)}
                    />
                )
            case 'CURRENCY':
                return (
                    <CurrencyInput
                        label={field.label}
                    />
                )
            case 'MULTICHECKBOX':
                return (
                    <MultiCheckboxInput
                        options={field.SelectOption}
                        label={field.label}
                    />
                )
            case 'ADDRESS':
                return (
                    <AddressInput
                        label={field.label}
                        placeholder={field.placeholder}
                        onSelect={(e) => changeFieldValue(setDisplayFields, field.id, "value", e)}
                    />
                )
            case 'SELECT':
                return (
                    <SelectInput
                        label={field.label}
                        options={field.SelectOption}
                        placeholder={field.placeholder}
                        onSelect={(e) => changeFieldValue(setDisplayFields, field.id, "selectedSelectOption", e)}
                    />
                )
            case 'NUMBER':
                return (
                    <NumberInput
                        label={field.label}
                        placeholder={field.placeholder}
                        onChange={(e) => changeFieldValue(setDisplayFields, field.id, 'value', e)}
                    />
                )
            case 'DATE':
                return (
                    <DateInput
                        label={field.label}
                        placeholder={field.placeholder}
                        onSelect={(e) => changeFieldValue(setDisplayFields, field.id, 'value', e)}
                    />
                )
            default:
                return <></>
        }
    }

    return (
        <View>
            {fields.map(item => (
                <View
                    key={item.id}
                >
                    {renderField(item)}
                </View>
            ))}
        </View>
    )
}

export default RenderField;