import React, { useLayoutEffect, useState } from 'react'
import { Button } from 'react-native-elements'
import { SafeAreaView } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native'
import Timetable from '../components/Timetable'
import getDay from '../functions/getDay'

const TimetableScreen = ({ navigation }) => {

    const [active, setActive] = useState(getDay())

    const data = [
        { dayCode: 1, day: 'mon' },
        { dayCode: 2, day: 'tues' },
        { dayCode: 3, day: 'wed' },
        { dayCode: 4, day: 'thurs' },
        { dayCode: 5, day: 'fri' },
    ]

    useLayoutEffect(() =>
        navigation.setOptions({
            title: `TimeTable • ${active.day.toUpperCase()}`,
        })
        , [navigation, active])

    return (
        <SafeAreaView>
            <ScrollView
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.days}>
                    {data.map((item) =>
                        <Button
                            key={item.day}
                            type='clear'
                            titleStyle={active.day === item.day ? styles.buttonActive : styles.button}
                            title={item.day.toUpperCase()}
                            onPress={() => setActive(item)}
                        />
                    )}
                </View>
            </ScrollView>
            <Timetable day={active} />
        </SafeAreaView>
    )
}

export default TimetableScreen

const styles = StyleSheet.create({
    days: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonActive: {
        color: 'grey',
    },
    button: {
        // color: 'grey'
    }
})
