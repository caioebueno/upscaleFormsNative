import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, Animated, Modal, ScrollView } from 'react-native'
import RadioOption from '../../types/radioOption'
import Constants from 'expo-constants'
import Icon from 'react-native-vector-icons/MaterialIcons'
import SelectOption from '../../types/selectOption'

interface SelectInterface {
    active: boolean,
    onSelect: () => void,
    label: string
}

const Select: React.FC<SelectInterface> = ({
    active,
    onSelect,
    label,
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

interface SelectInputInterface {
    label: string
    options: RadioOption[]
    placeholder?: string
    onSelect: (id: number) => void
}

const SelectInput: React.FC<SelectInputInterface> = ({
    label,
    options,
    placeholder,
    onSelect
}) => {
    const [search, setSearch] = useState('')
    const [active, setActive] = useState(0)
    const [open, setOpen] = useState(false)
    const [option, setOption] = useState<SelectOption | null>(null)

    useEffect(() => {
        if(option) onSelect(option.id)
    }, [option])

    return (
        <View
            style={styles.container}
        >
            <Text
                style={styles.label}
            >{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                onFocus={() => setOpen(true)}
                value={option ? option.label : ''}
            />
            <Modal
                visible={open}
                animationType="slide"
            >
                <View
                    style={styles.modal}
                >
                    <View
                        style={styles.modalHeader}
                    >
                        <Pressable
                            onPress={() => setOpen(false)}
                        >
                            <Icon
                                name="close"
                                size={24}
                                color="#495057"
                            />

                        </Pressable>
                        <TextInput
                            // autoFocus={true}
                            style={styles.modalInput}
                            placeholder="Rua principal"
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        // keyboardShouldPersistTaps='handled'
                        contentContainerStyle={{ paddingBottom: 100 }}
                    >
                        {options.filter(item => item.label.includes(search)).map(item => (
                            <Select
                                key={item.id}
                                active={active === item.id}
                                onSelect={() => {
                                    setActive(item.id)
                                    setOption(item)
                                    setOpen(false)
                                }}
                                label={item.label}
                            />
                        ))}
                    </ScrollView>
                </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        paddingHorizontal: 32,
    },
    input: {
        marginTop: 24,
        paddingVertical: 8,
        borderBottomWidth: 2,
        borderColor: '#e9ecef',
        fontSize: 24,
        width: '100%',
        alignSelf: 'stretch'
    },
    label: {
        fontSize: 32,
        fontWeight: '600',
        marginBottom: 8,
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
    },
    modalHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 32,
    },
    modalInput: {
        flex: 1,
        marginLeft: 16,
        fontSize: 22
    },
    modal: {
        marginTop: Constants.statusBarHeight
    }
})


export default SelectInput