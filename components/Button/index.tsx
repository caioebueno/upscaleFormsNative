import React from 'react';
import { StyleSheet, Text, View, TextInput as TextInputNative, Pressable, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Octicons'

// import { Container } from './styles';

interface ButtonInterface {
    onPress: () => void
    disabled?: boolean
}

const Button: React.FC<ButtonInterface> = ({
    onPress,
    disabled
}) => {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabled]}
            activeOpacity={0.8}
            onPress={!disabled ? onPress : undefined}
            disabled={disabled}
        >
            <Icon 
                name="arrow-right"
                color="white"
                size={24}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 48
    },
    disabled: {
        backgroundColor: 'grey'
    }
})

export default Button;