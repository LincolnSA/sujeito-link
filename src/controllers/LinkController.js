import AsyncStorage from '@react-native-async-storage/async-storage'

export default LinkController = {

    //todos os links salvos
    async index(key) {
        const allLinks = await AsyncStorage.getItem(key)
        const linksInJson = JSON.parse(allLinks) || []

        return linksInJson
    },

    //salva um novo link no storage
    async store(key, newLink) {
        let allLinks = await index(key)

        const hasLink = allLinks.some(link => link.id === newLink.id)

        if (hasLink) {
            console.log("Esse link já existe!")
            return
        }

        allLinks.push(newLink)

        const linksInString = JSON.stringify(allLinks)

        await AsyncStorage.setItem(key, linksInString)

        console.log("Link salvo com sucesso!")

    },

    //deleta um link
    async delete(links, id) {
        const filteredLinks = links.filter((item) => {
            return (item.id !== id)
        })

        const linksInString = JSON.stringify(filteredLinks)

        await AsyncStorage.setItem('links', linksInString)

        console.log("Link deletado com sucesso!")

        return filteredLinks
    }
}