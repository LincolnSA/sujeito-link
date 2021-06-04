import React from 'react';
import { useNavigation } from '@react-navigation/native'

//styles
import { Feather } from '@expo/vector-icons'
import { ButtonMenu } from './styles';

const Menu = () => {
    const navigation = useNavigation()

    //abrir menu drawer
    const handleOpenDrawer = () => {
        navigation.openDrawer()
    }
    return (
        <ButtonMenu
            onPress={handleOpenDrawer}
        >
            <Feather
                name="menu"
                size={40}
                color='#fff'
            />
        </ButtonMenu>
    );
}

export default Menu;