import React, { useState } from 'react';
import {
    TouchableWithoutFeedback,
    Keyboard, KeyboardAvoidingView,
    Platform,
    Modal,
    ActivityIndicator
} from 'react-native'

//controllers
import LinkController from '../../controllers/LinkController'

//services
import api from '../../services/api'

//components
import StatusBarPage from '../../components/StatusBarPage'
import Menu from '../../components/Menu'
import ModalLink from '../../components/ModalLink'

//styles
import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import {
    ContainerLogo,
    Logo,
    ContainerContent,
    Title,
    SubTitle,
    ContainerInput,
    BoxIcon,
    Input,
    ButtonLink,
    ButtonLinkText
} from './styles'

const Home = () => {
    const [input, setInput] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})

    //fechar o teclado
    const handleCloseKeyboard = () => {
        Keyboard.dismiss()
    }

    //recebe e guarda os dados do input    
    const onChangeInput = (text) => {
        setInput(text)
    }

    //func encurtar link
    const handleShortLink = async () => {
        setLoading(true)
        try {
            const response = await api.post('/shorten', {
                long_url: input
            })
            setData(response.data)
            setModalVisible(true)

            //salvando os dados offline
            LinkController.store('links', response.data)

            Keyboard.dismiss()
            setInput('')
            setLoading(false)
        } catch {
            alert('Ops parece que deu algo errado.')
            Keyboard.dismiss()
            setInput('')
            setLoading(false)
        }

        //setModalVisible(true)
    }
    return (

        //Botao sem nenhum retorno de efeito, usado para chamar a funcao
        <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
            <LinearGradient
                colors={['#1ddbb9', '#132742']}
                style={{ flex: 1, justifyContent: "center" }}
            >

                <StatusBarPage
                    barStyle='light-content'
                    backgroundColor='#1ddbb9'
                />

                <Menu />


                <KeyboardAvoidingView
                    //Controla o position do teclado aberto, referente ao botao e ao input
                    behavior={Platform.OS === 'android' ? 'padding' : 'position'}
                    enabled
                >

                    <ContainerLogo>
                        <Logo source={require('../../assets/Logo.png')} resizeMode='contain' />
                    </ContainerLogo>

                    <ContainerContent>
                        <Title>Sujeito Link</Title>
                        <SubTitle>Cole seu link para encurtar</SubTitle>

                        <ContainerInput>
                            <BoxIcon>
                                <Feather
                                    name="link"
                                    size={32}
                                    color="#fff"
                                />
                            </BoxIcon>

                            <Input
                                placeholder='Cole seu link aqui...'
                                placeholderTextColor="white"
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="url"

                                value={input}
                                onChangeText={onChangeInput}
                            />
                        </ContainerInput>

                        <ButtonLink onPress={handleShortLink}>

                            {
                                loading ? (

                                    <ActivityIndicator
                                        color='#121212'
                                        size={24}
                                    />

                                ) : (

                                    <ButtonLinkText>Gerar link</ButtonLinkText>

                                )
                            }
                        </ButtonLink>

                    </ContainerContent>

                </KeyboardAvoidingView>

                <Modal
                    visible={modalVisible}
                    transparent
                    animationType="slide"
                >
                    <ModalLink onClose={() => setModalVisible(false)} data={data} />
                </Modal>

            </LinearGradient>
        </TouchableWithoutFeedback>
    );
}

export default Home;