import React, { useState, useEffect } from 'react';
import { Modal, ActivityIndicator } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

//controllers
import LinkController from '../../controllers/LinkController'

// Components
import StatusBarPage from '../../components/StatusBarPage'
import Menu from '../../components/Menu'
import ListItem from '../../components/ListItem'
import ModalLink from '../../components/ModalLink'

//styles
import { Container, Title, ListLinks, ContainerEmpty, WarningText } from './styles'

const MyLinks = () => {
    const isFocused = useIsFocused()

    const [links, setLinks] = useState([])
    const [data, setData] = useState({})
    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        (async () => {
            const response = await LinkController.index('links')
            setLinks(response)
            setLoading(false)
        })()

    }, [isFocused])


    // seleciona o item ativo para abrir no modal
    const handleSelectItem = (item) => {
        setData(item)
        setModalVisible(true)
    }

    // seleciona o item pelo id e deleta
    const handleDeleteItem = async (id) => {
        const response = await LinkController.delete(links, id)
        setLinks(response)
    }

    return (
        <Container>
            <StatusBarPage
                barStyle='light-content'
                backgroundColor='#132742'
            />

            <Menu />

            <Title>
                Meus links
            </Title>

            {
                //mostra o loadig na tela
                loading && (
                    <ContainerEmpty>
                        <ActivityIndicator color="#fff" size={25} />
                    </ContainerEmpty>
                )
            }
            {
                //informa ao usuario a lista vazia de links
                !loading && links.length === 0 && (
                    <ContainerEmpty>
                        <WarningText>
                            Você ainda não possui nenhum link :(
                        </WarningText>
                    </ContainerEmpty>
                )
            }


            <ListLinks
                data={links}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <ListItem data={item} selectedItem={handleSelectItem} deleteItem={handleDeleteItem} />}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />

            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
            >
                <ModalLink onClose={() => setModalVisible(false)} data={data} />
            </Modal>
        </Container>
    );
}

export default MyLinks;