import React from 'react'
import { StyleSheet, View } from 'react-native'

import Spinner from 'react-native-loading-spinner-overlay';

const CircularProgress = () => {
    return (
        <View style={styles.loading}>
            <Spinner
                visible={true}
            // textContent={'Loading...'}
            // textStyle={styles.spinnerTextStyle}
            />
        </View>
    )
}

export default CircularProgress

const styles = StyleSheet.create({

    loading: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 30,
        backgroundColor: '#ecf0f1',
        padding: 8,

    },
    spinnerTextStyle: {
        color: '#FFF',
    },
})
