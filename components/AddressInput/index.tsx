import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput as TextInputNative, Pressable, Modal, Button, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Constants from 'expo-constants'
import { debounce } from "lodash"
import searchAddress from '../../functions/searchAddress'
import MapItem from '../../types/mapSearchResponse'

interface AddressItemInterface {
    label: string
    helper: string
    onPress: () => void
}

const AddressItem: React.FC<AddressItemInterface> = ({
    label,
    helper,
    onPress
}) => {
    return (
        <Pressable
            onPress={onPress}
        >
            <View
                style={styles.addressItemContainer}
            >
                <View
                    style={styles.addressItemRow}
                >
                    <View
                        style={styles.addressItemTextContainer}
                    >
                        <Text
                            style={styles.addressItemLabel}
                        >{label}</Text>
                        <Text
                            style={styles.addressItemHelper}
                        >{helper}</Text>
                    </View>
                    <Icon
                        name="navigate-next"
                        size={24}
                        color="#495057"
                    />
                </View>
            </View>
        </Pressable>
    )
}

interface AddressInputInterface {
    label: string
    placeholder?: string
    onSelect: (value: string) => void
}

const AddressInput: React.FC<AddressInputInterface> = ({
    label,
    placeholder,
    onSelect
}) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [options, setOptions] = useState<MapItem[]>([])
    const [search, setSearch] = useState('')
    const [address, setAddress] = useState<MapItem | null>(null)


    useEffect(() => {
        if(address) onSelect(JSON.stringify(address))
    }, [address])


    const handleSearch = (query: string) => {
        searchAddress(query)
            .then(({ data }) => {
                setOptions(data)
                setLoading(false)
            })
    }

    const debbounce = useCallback(debounce(handleSearch, 1000), []);

    const handleInput = (e: string) => {
        setSearch(e)
        if (e.length > 2) {
            setLoading(true)
            debbounce(e)
        }
    }

    return (
        <View
            style={styles.container}
        >
            <Text
                style={styles.label}
            >{label}</Text>

            <TextInputNative
                placeholder={placeholder}
                style={styles.input}
                value={address ? address.description : ''}
                onFocus={() => setOpen(true)}
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
                        <TextInputNative
                            autoFocus={true}
                            style={styles.modalInput}
                            placeholder="Rua principal"
                            value={search}
                            onChangeText={handleInput}
                        />
                    </View>
                    {
                        search.length < 3
                            ? (
                                <View
                                    style={styles.characterContainer}
                                >
                                    <Text
                                        style={styles.character}
                                    >Insira 3 caracteres</Text>
                                </View>
                            ) : (
                                <>
                                    {
                                        loading
                                            ? (
                                                <View
                                                    style={styles.characterContainer}
                                                >
                                                    <ActivityIndicator />
                                                </View>
                                            ) : (
                                                <View>
                                                    {options.map(item => (
                                                        <AddressItem
                                                            key={item.description}
                                                            label={item.structured_formatting.main_text}
                                                            helper={item.structured_formatting.secondary_text}
                                                            onPress={() => {
                                                                setAddress(item)
                                                                setOpen(false)
                                                            }}
                                                        />
                                                    ))}
                                                </View>
                                            )
                                    }
                                </>
                            )
                    }
                </View>
            </Modal>

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
    },
    modal: {
        marginTop: Constants.statusBarHeight
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
    characterContainer: {
        paddingTop: 60,
        alignItems: 'center'
    },
    character: {
        color: '#C7C7CD',
        fontSize: 18
    },
    addressItemLabel: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 4
    },
    addressItemHelper: {
        fontSize: 14,
        fontWeight: '500'
    },
    addressItemContainer: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderBottomColor: '#e9ecef',
        borderBottomWidth: 1,
    },
    addressItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    addressItemTextContainer: {
        flex: 1,
        paddingRight: 16
    }
})


export default AddressInput