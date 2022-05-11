import React from 'react';
import { StyleSheet, Text, View, TextInput as TextInputNative } from 'react-native'

interface SteperInterface {
    stepCount: number
    currentStep: number
}

const Steper: React.FC<SteperInterface> = ({
    stepCount,
    currentStep
}) => {
    return (
        <View
            style={styles.container}
        >
            <View 
                style={styles.steper}
            >
                <View 
                    style={{
                        backgroundColor: 'red',
                        height: 2,
                        width: (120 / stepCount) * currentStep
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    steper: {
        width: 120,
        height: 2,
        borderRadius: 100,
        backgroundColor: '#e9ecef'
    }
})

export default Steper