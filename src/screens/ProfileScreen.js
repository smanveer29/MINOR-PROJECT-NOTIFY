import React, { useContext, useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import { Context as AuthContext } from '../context/AuthContext';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import { ImageBackground } from 'react-native';

const Stack = createStackNavigator();

const ProfileScreen = () => {

    const { logout, state } = useContext(AuthContext)

    const user = state.user

    const ProfileC = ({ navigation }) => {

        useLayoutEffect(() => navigation.setOptions({ title: "Profile", headerRight: (() => <Button type="clear" title="Logout" onPress={logout} />) }), [navigation])

        return (
            <View style={styles.container}>
                <ImageBackground source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/notify-3734c.appspot.com/o/assests%2Fbackmain.png?alt=media&token=7c193548-cbcc-4211-b17c-72ce80259495' }} style={styles.background}>
                    <View style={styles.containerInner}>
                        {user.role === "user" ?
                            <>
                                <Text h3>Name :{user.name}</Text>
                                <Text h3>Semester :{user.sem}</Text>
                                <Text h3>Branch :{user.branch}</Text>
                                <Text h3>Shift :{user.shift}</Text>
                                <Text h3>Year :{user.year}</Text>
                            </>
                            :
                            <Text h3>User Profile : {user.role}</Text>
                        }
                    </View>
                </ImageBackground>
            </View>

        )
    }
    return (
        <Stack.Navigator>
            <Stack.Screen name="ProfileC" component={ProfileC} />
        </Stack.Navigator>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        justifyContent:'center'
    },
    background: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    containerInner: {
        justifyContent:"center",
        backgroundColor: "#fff",
        alignItems:"center",
        borderRadius: 5,
        elevation: 5,
        padding: 20,
        margin:20

    },
})
