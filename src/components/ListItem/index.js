import React from 'react';
import { View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable'

//styles
import { Feather } from '@expo/vector-icons'
import { ContainerButton, TextButton, ActionContainer } from './styles';

const ListItem = ({ data, selectedItem, deleteItem }) => {

    //func apos arrastar pro lado direito
    const handleRightActions = () => {
        return (
            <ActionContainer onPress={() => deleteItem(data.id)}>
                <Feather
                    name="trash"
                    color="#fff"
                    size={24}
                />
            </ActionContainer>
        )
    }

    return (
        <View>
            {/* 
                gesto de arrastar pro lado, e executando uma função logo em seguida
            */}
            <Swipeable renderRightActions={handleRightActions}>
                <ContainerButton activeOpacity={0.9} onPress={() => selectedItem(data)}>
                    <Feather
                        name="link"
                        color="#fff"
                        size={24}
                    />

                    <TextButton numberOfLines={1}>{data.long_url}</TextButton>
                </ContainerButton>
            </Swipeable>
        </View>
    );
}

export default ListItem;