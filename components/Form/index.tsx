import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Dimensions, Pressable, Animated, Keyboard, TouchableOpacity } from 'react-native';

import TextInput from '../TextInput';
import Steper from '../Steper';
import Button from '../Button';
import RadioInput from '../RadioInput';
import Constants from 'expo-constants'
import RenderField from '../RenderField';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useEffect, useRef, useState } from 'react';
import getSteps from '../../functions/getSteps';
import convertFieldsToDisplayFields from '../../functions/convetFieldsToDisplayFields';
import DisplayField from '../../types/displayField';
import Step from '../../types/step';
import verifyRequired from '../../functions/verifyRequired';

const windowWidth = Dimensions.get('window').width;


interface FormInterface {
    id: number
}

const Form: React.FC<FormInterface> = ({
    id
}) => {
    const [stepCount, setStepCount] = useState(2)
    const [steps, setSteps] = useState<Step[]>([])
    const [step, setStep] = useState(1)
    const [canSubmit, setCanSubmit] = useState(false)
    const [displayFields, setDisplayFields] = useState<DisplayField[]>([])

    const next = () => {
        if (step === stepCount) return
        Keyboard.dismiss()
        setStep(prevStep => {
            const newStep = prevStep + 1
            Animated.timing(x, {
                useNativeDriver: true,
                toValue: (windowWidth * -1) * (newStep - 1),
                duration: 300
            }).start()
            return newStep
        })
    }

    const back = () => {
        if (step === 1) return
        Keyboard.dismiss()
        setStep(prevStep => {
            const newStep = prevStep - 1
            Animated.timing(x, {
                useNativeDriver: true,
                toValue: (windowWidth * -1) * (newStep - 1),
                duration: 300
            }).start()
            return newStep
        })
    }

    useEffect(() => {
        const can = verifyRequired(displayFields.filter(item => item.stepId === steps[step - 1].id))
        setCanSubmit(can)
    }, [displayFields, step])

    useEffect(() => {
        if (id) {
            getSteps(id)
                .then(({ data }) => {
                    setStepCount(data.length)
                    setSteps(data)
                    const displayFieldsArray = convertFieldsToDisplayFields(data)
                    setDisplayFields(displayFieldsArray)
                })
        }
    }, [id])

    const x = useRef(new Animated.Value(0)).current

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View
                style={styles.topbar}
            >
                <TouchableOpacity
                    onPress={back}
                    activeOpacity={0.8}
                >
                    <Icon
                        name="arrow-back-ios"
                        size={24}
                        color="#495057"
                    />
                </TouchableOpacity>
                <Steper
                    stepCount={stepCount}
                    currentStep={step}
                />
                <View
                    style={styles.topbarSpacer}
                />
            </View>
            <Animated.View
                style={[styles.stepScroll, { transform: [{ translateX: x }], width: windowWidth * stepCount, }]}
            >
                {steps.map(item => (
                    <KeyboardAvoidingView
                        behavior="padding"
                        keyboardVerticalOffset={50}
                        key={item.id}
                    >
                        <ScrollView
                            style={styles.fieldsContainer}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps='handled'
                            contentContainerStyle={{ paddingBottom: 100 }}
                        >
                            <RenderField
                                fields={displayFields.filter(field => field.stepId === item.id)}
                                setDisplayFields={setDisplayFields}
                            />

                        </ScrollView>
                    </KeyboardAvoidingView>
                ))}
            </Animated.View>


            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={16}
                style={styles.buttonContainer}
            >

                <Button
                    disabled={!canSubmit}
                    onPress={next}
                />
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: Constants.statusBarHeight,
        // justifyContent: 'center',
    },
    topbar: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 32,
    },
    topbarSpacer: {
        width: 24,
        height: 2
    },
    buttonContainer: {
        bottom: 24,
        right: 32,
        width: 50,
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
        position: 'absolute'
    },
    stepScroll: {
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    fieldsContainer: {
        width: windowWidth,
        // paddingBottom: 100
    }
});

export default Form