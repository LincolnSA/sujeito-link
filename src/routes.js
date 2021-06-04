import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'

//icons
import { Ionicons } from '@expo/vector-icons'

//pages
import Home from './pages/Home'
import MyLinks from './pages/MyLinks'

//rotas tipo drawer
const Drawer = createDrawerNavigator()

const Routes = () => {
    return (
        <Drawer.Navigator
            //styles global do drawer
            drawerContentOptions={{
                activeBackgroundColor: '#2ccbb9',
                activeTintColor: '#ffffff',
                marginTop: 16,
                labelStyle: {
                    fontSize: 19
                }
            }}
        >

            <Drawer.Screen
                //styles local de cada pagina
                name="Home"
                component={Home}
                options={{
                    title: 'Encurtar Link',
                    //rederizando um icon
                    drawerIcon: ({ focused, size, color }) => (
                        <Ionicons
                            name={focused ? 'cube' : 'cube-outline'}
                            color={color}
                            size={size}
                        />
                    )
                }}

            />

            <Drawer.Screen
                name="MyLinks"
                component={MyLinks}
                options={{
                    title: 'Meus Links',
                    //rederizando um icon
                    drawerIcon: ({ focused, size, color }) => (
                        <Ionicons
                            name={focused ? 'stats-chart' : 'stats-chart-outline'}
                            color={color}
                            size={size}
                        />
                    )
                }}
            />

        </Drawer.Navigator>
    );
}

export default Routes;