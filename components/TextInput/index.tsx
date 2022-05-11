import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput as TextInputNative } from 'react-native'

interface TextInputInterface {
    label: string
    mask?: string
    placeholder?: string
    onChange: (value: string) => void
}

const TextInput: React.FC<TextInputInterface> = ({
    label,
    mask,
    placeholder,
    onChange
}) => {
    const [value, setValue] = useState('')

    return (
        <View
            style={styles.container}
        >
            <Text
                style={styles.label}
            >{label}</Text>
            <TextInputNative
                style={styles.input}
                placeholder={placeholder}
                onChangeText={onChange}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 32,
        marginVertical: 16
    },
    input: {
        marginTop: 24,
        paddingVertical: 8,
        borderBottomWidth: 2,
        borderColor: '#e9ecef',
        borderRadius: 4,
        fontSize: 24,
        width: '100%',
        alignSelf: 'stretch'
    },
    label: {
        fontSize: 32,
        fontWeight: '600',
        marginBottom: 8,
    }
})


export default TextInput