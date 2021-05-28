
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    try {
        // console.log('Storing key:', key, ", Value: ", value)
        await AsyncStorage.setItem(key, value)
    } catch (err) {
        // console.log("Async Storage Error : ", err)
    }
}


const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return value
        }
        // console.log("Getting key value: ", key, ", Value: ", value)
    } catch (err) {
        // console.log("Async Storage Error : ", err)
    }
}

const storeObjectData = async (key, value) => {
    try {

        // console.log('Storing key:', key, ", Value: ", value)
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        // console.log("Async Storage Error : ", err)
    }
}



const getObjectData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        // console.log("Getting key value: ", key, ", Value: ", jsonValue)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // console.log("Async Storage Error : ", e)
    }
}

const clearAsyncStorage = async () => {
    AsyncStorage.clear();
}


export { storeData, getData, storeObjectData, getObjectData, clearAsyncStorage }