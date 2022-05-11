import React from 'react'
import { StyleSheet, Text, View, TextInput as TextInputNative } from 'react-native'

interface CurrencyInputInterface {
    label: string
}

const CurrencyInput: React.FC<CurrencyInputInterface> = ({
    label
}) => {
    return (
        <View
            style={styles.container}
        >
            <Text
                style={styles.label}
            >{label}</Text>
            <View
                style={styles.inputRow}
            >   
                <View
                    style={styles.prefixContainer}
                >
                    <Text
                        style={styles.prefix}
                    >R$</Text>
                </View>
                <TextInputNative
                    keyboardType="decimal-pad"
                    style={styles.input}
                />
            </View>
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
        fontSize: 32,
        fontWeight: '600',
        paddingLeft: 8,
        flex: 1,
        alignSelf: 'stretch'
    },
    label: {
        fontSize: 32,
        fontWeight: '600',
        marginBottom: 8,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    prefixContainer: {
        paddingVertical: 8,
        borderBottomWidth: 2,
        borderColor: '#e9ecef',
    },
    prefix: {
        fontSize: 32,
        fontWeight: '600'
    }
})


export default CurrencyInput