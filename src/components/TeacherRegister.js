import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Input } from 'react-native-elements'
import { Feather } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { db } from '../utils/firebase';
import { Context as AuthContext } from '../context/AuthContext';
import { storeObjectData } from '../functions/asyncStorage';

const TeacherRegister = ({ navigation }) => {

    const { login } = useContext(AuthContext)
    const [pin, setPin] = useState(null)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!data) {
            db.
                collection('admin')
                .doc('data')
                .get()
                .then(snapshot => setData(snapshot.data()))
        }
    }, [navigation])

    const handleSubmit = () => 
    {
        if(data)
        {
            setError(null)
            if (pin === data.pin) {
                const user = { role: 'teacher' };
                storeObjectData('user', user);
                login(user);
            } else if (pin === data.adminPin) {
                const user = { role: 'admin' };
                storeObjectData('user', user);
                login(user);
            }
            else 
            {
                setError('Pin not Valid')
            }
        }
    }

    return (
        <>
            <Input
                placeholder="Enter Pin"
                leftIcon={<Feather name="lock" size={24} color="black" />}
                value={pin}
                onChangeText={text => setPin(text)}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
            />
            {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
            <Button type="clear" title="Submit" onPress={handleSubmit} />
        </>
    )
}

export default TeacherRegister

const styles = StyleSheet.create({

})
