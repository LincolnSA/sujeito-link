import React from 'react';
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native'


const StatusBarPage = (props) => {
    //verifica se a rota drawer esta ativa
    const isFocused = useIsFocused()

    /**
     * se tiver ativa retona um component status bar com
    * a configuracao de acordo com as props passada
     */
    return isFocused ? <StatusBar {...props} /> : null;
}

export default StatusBarPage;