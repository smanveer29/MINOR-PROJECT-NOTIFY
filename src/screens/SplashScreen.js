import React, { useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { BackgroundImage } from 'react-native-elements/dist/config'
// import { Text } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreen = ({ navigation }) => {
    useLayoutEffect(() => {
        setTimeout(() => navigation.navigate('Register'), 2500);
    }, []);
    return (
        <View style={styles.container}>
            <BackgroundImage source={'https://firebasestorage.googleapis.com/v0/b/notify-3734c.appspot.com/o/assests%2Fbacknotify.png?alt=media&token=c3b9f93d-c84e-4921-a9fa-04aa2321ecdf'} style={styles.splash}>
                <LinearGradient
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                >
                    {/* <Text h1 style={styles.title}>Notify</Text> */}
                </LinearGradient>
            </BackgroundImage>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    splash: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
    }
})
