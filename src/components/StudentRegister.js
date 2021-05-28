import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'

import { Input } from 'react-native-elements'
import { Button } from 'react-native-elements'

import firebase from 'firebase'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { db } from '../utils/firebase';

import * as Random from 'expo-random';

import { storeObjectData } from '../functions/asyncStorage'

import { Context as AuthContext } from '../context/AuthContext';

const StudentRegister = () => {

    const { login } = useContext(AuthContext)

    const [name, setName] = useState('')
    const [branch, setBranch] = useState('')
    const [sem, setSem] = useState('')
    const [shift, setShift] = useState('')
    const [year, setYear] = useState('')
    const [error, setError] = useState(null)
    const [userId, setUserId] = useState('')


    const register = () => {


        if (userId) {
            if (name.length >= 1 && branch.length >= 1 && sem.length >= 1 && shift.length >= 1 && year.length >= 1) {

                const user = {
                    userId: userId,
                    name: name,
                    branch: branch,
                    sem: sem,
                    shift: shift,
                    year: year,
                    role: 'user',
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                }

                db
                    .collection("users")
                    .doc(userId)
                    .set(user)
                    .then(() => storeObjectData('user', user))
                    .then(() => login(user))


            } else {
                setError("Data Field empty")
            }
        }


    }

    const getId = () => {
        const uuid = Random.getRandomBytes(5)
        setUserId(`${uuid[0]}-${uuid[1]}-${uuid[2]}-${uuid[3]}-${uuid[4]}`)
    }

    useEffect(() => {
        getId()
    }, [])


    return (
        <>
            <Input
                placeholder="Name"
                leftIcon={<Ionicons name="person-outline" size={24} color="black" />}
                value={name}
                onChangeText={text => setName(text)}
            />
            <Input
                placeholder="Branch"
                leftIcon={<FontAwesome5 name="school" size={24} color="black" />}
                value={branch}
                onChangeText={text => setBranch(text)}
            />
            <Input
                placeholder="Semester"
                leftIcon={<FontAwesome5 name="teeth" size={24} color="black" />}
                value={sem}
                onChangeText={text => setSem(text)}
            />
            <Input
                placeholder="Shift (morg/even)"
                leftIcon={<Feather name="sunrise" size={24} color="black" />}
                value={shift}
                onChangeText={text => setShift(text)}
            />
            <Input
                placeholder="Year"
                leftIcon={<AntDesign name="calendar" size={24} color="black" />}
                value={year}
                onChangeText={text => setYear(text)}
            />
            {error ? <Text stlye={styles.error}>{error}</Text> : null}
            <Button
                title="SUBMIT"
                type="clear"
                onPress={register}
            />
        </>
    )
}

export default StudentRegister

const styles = StyleSheet.create({
    error: {
        fontSize: 22,
        color: 'red'
    }
})
