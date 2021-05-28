import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Input } from 'react-native-elements';
import { TextInput } from 'react-native';
import { IconButton } from 'react-native-paper';
import { db } from '../utils/firebase';
import firebase from 'firebase'
const Stack = createStackNavigator();

const TeacherScreen = () => {

    const TeacherC = ({ navigation }) => {
        const [teacher, setTeacher] = useState("");
        const [message, setMessage] = useState("");
        const [error, setError] = useState(null);

        const handleSend = () => {
            setError(null)
            if (teacher && message) {
                db.collection('notice').add({
                    teacher: teacher,
                    message: message,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => handleNext())
            } else {
                !message && setError("Message Field is Empty")
                !teacher && setError("Teacher Name can`t be empty")
            }
        }

        const handleNext = () => { navigation.navigate("Home"); setTeacher(""); setMessage(""); }

        useLayoutEffect(() => { navigation.setOptions({ title: "Teacher" }) }, [navigation]);

        return (
            <View style={styles.container}>
                <View style={styles.containerInner}>
                    <Text h3>Type Notice About Reschedule of lecture</Text>
                    {error ? <Text h4 style={{ color: "red" }}>{error}</Text> : null}
                    <Input
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Subject Name"
                        placeholderTextColor="grey"
                        value={teacher}
                        onChangeText={text => setTeacher(text)}
                    />
                    <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder="Type Message Here!"
                        placeholderTextColor="grey"
                        numberOfLines={3}
                        multiline={true}
                        value={message}
                        onChangeText={text => setMessage(text)}
                    />
                    <IconButton
                        disabled={(teacher.length === 0 && message.length === 0) ? true : false}
                        icon="send"
                        size={26}
                        style={styles.button}
                        onPress={handleSend}
                    />
                </View>
            </View>
        )
    }

    return (
        <Stack.Navigator>
            <Stack.Screen name="TeacherC" component={TeacherC} />
        </Stack.Navigator>
    )
}

export default TeacherScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    containerInner: {
        padding: 10,
        margin: 10,
        elevation: 5,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 10,
        padding: 5,
        fontSize: 18
    },
    button: {
        alignSelf: 'center'
    }
})
