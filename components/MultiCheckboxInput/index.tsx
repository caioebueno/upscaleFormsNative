import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput as TextInputNative, Pressable, Animated } from 'react-native'
import RadioOption from '../../types/radioOption'

interface CheckboxInterface {
    active: boolean,
    onSelect: () => void,
    label: string
}

const Checkbox: React.FC<CheckboxInterface> = ({
    active,
    onSelect,
    label
}) => {
    return (
        <Pressable
            onPress={onSelect}
        >
            <View
                style={styles.radioContainer}
            >
                <View
                    style={[styles.radioOutter, { borderColor: active ? 'red' : '#495057' }]}
                >
                    <Animated.View
                        style={[styles.radioInner, { backgroundColor: active ? 'red' : 'transparent', maxHeight: active ? new Animated.Value(13) : new Animated.Value(0), maxWidth: active ? new Animated.Value(13) : 0 }]}
                    />
                </View>
                <Text
                    style={styles.radioLabel}
                >
                    {label}
                </Text>
            </View>
        </Pressable>
    )
}

interface MultiCheckboxInputInterface {
    label: string
    options: RadioOption[]
}

const MultiCheckboxInput: React.FC<MultiCheckboxInputInterface> = ({
    label,
    options
}) => {
    const [active, setActive] = useState(0)

    return (
        <View
            style={styles.container}
        >
            <Text
                style={styles.label}
            >{label}</Text>
            {options.map(item => (
                <Checkbox
                    key={item.id}
                    active={active === 1}
                    onSelect={() => setActive(1)}
                    label={item.label}
                />
            ))}


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
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
        paddingHorizontal: 32,

    },
    radioOutter: {
        width: 27,
        height: 27,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#495057'

    },
    radioInner: {
        width: 13,
        height: 13,
        borderRadius: 100
    },
    radioContainer: {
        paddingVertical: 22,
        borderBottomColor: '#e9ecef',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 32
    },
    radioLabel: {
        fontSize: 17,
        fontWeight: '500',
        marginLeft: 16
    }
})


export default MultiCheckboxInput