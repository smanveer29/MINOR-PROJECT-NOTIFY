import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'

import { createStackNavigator } from '@react-navigation/stack';
import TimetableScreen from './TimetableScreen';
import { Button } from 'react-native-elements';
import { db } from '../utils/firebase';
import getPeriods from '../functions/getPeriods';
import Notification from '../components/Notification';
import { IconButton } from 'react-native-paper';
import { Context as AuthContext } from '../context/AuthContext';

const Stack = createStackNavigator();

const HomeScreen = () => {

    const HomeC = ({ navigation }) => {
        const { state } = useContext(AuthContext)

        const user = state.user

        const [data, setData] = useState([]);
        const [period, setPeriod] = useState('');
        const [periodData, setPeriodData] = useState(null);
        const [date, setDate] = useState(new Date);
        const [notices, setNotices] = useState([]);

        // const day = 1; const hour = 10; const min = 29;
        const day = date.getDay(); const hour = date.getHours(); const min = date.getMinutes();

        useEffect(() => {
            const intervalId = setInterval(() => {
                setDate(new Date);
            }, 1000);

            return () => clearInterval(intervalId);
        }, [date]);


        useEffect(() => {
            db
                .collection('notify-data')
                .doc('timetable')
                .get()
                .then(res => setData(res.data()))

        }, [])

        useEffect(() => {
            setPeriod(getPeriods(hour, min))
        }, [hour, min])


        const resetNotice = () => {
            const ref = db.collection('notice');

            ref.get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        db.collection('noticeHistory').add(doc.data())
                            .then(() => doc.ref.delete());
                    });
                });
        }

        const todayData = data[day]

        useEffect(() => {
            (period && todayData) ? setPeriodData(todayData[period]) : setPeriodData([])
        }, [period, data])

        useLayoutEffect(() => {
            navigation.setOptions({
                title: "Home",
                headerRight: (() =>
                    <Button type="clear" title="Time Table" onPress={() => navigation.navigate("Timetable")} />
                )
            })
        }, [navigation])

        useEffect(() => {
            db.collection('notice').orderBy('timestamp', 'desc').onSnapshot(snapshot => setNotices(snapshot.docs.map(doc => doc.data())));
        }, [navigation]);

        // console.log(periodData, period)
        return (
            <View style={styles.container}>
                <Text h3>{date.toDateString()}</Text>
                <Text h3>{date.toTimeString().substr(0, 8)}</Text>
                {period !== 'p5' ?
                    (period === 0
                        ?
                        <>
                            <Text h3>No Class</Text>
                        </>
                        :
                        (periodData?.subject === null ?
                            <>
                                <Text h3>Free Period Enjoy!</Text>
                            </>
                            :
                            <>
                                <Text h4>Subject :{periodData?.subject}</Text>
                                <Text h4>Venue :{periodData?.venue}</Text>
                            </>
                        )
                    )
                    :
                    <>
                        <Text style={styles.recess} h4>{data.recessComment}</Text>
                    </>
                }
                {notices.length !== 0 ?
                    <View style={styles.notices}>
                        <Text h2 style={{ flexDirection: "row", alignItems: "center" }}>
                            Notice
                            {user.role === 'admin' ?
                                <IconButton
                                    icon="rotate-left"
                                    color="red"
                                    size={30}
                                    onPress={resetNotice}
                                />
                                : null}
                        </Text>
                        {notices.map((notice, i) =>
                            <>
                                <Text h4 key={notice.teacher, i, notice.teacher}>
                                    {notice.teacher}
                                    <Text style={{ fontSize: 21, fontWeight: '600' }}>[{notice?.timestamp?.toDate().toTimeString().substr(0, 5)}]:</Text>
                                    <Text style={{ fontSize: 21, fontWeight: '400' }}>{notice.message}</Text>
                                </Text>
                            </>
                        )}
                    </View>
                    : null}
                {periodData ? <Notification periodData={periodData} /> : null}
            </View>
        )
    }
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeC" component={HomeC} />
            <Stack.Screen name="Timetable" component={TimetableScreen} />
        </Stack.Navigator>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 22
    },
    notices: {
        width: '100%',
        padding: 10,
        margin: 10,
        borderTopWidth: 1,
        borderColor: 'black'
    },
    recess: {
        paddingTop: 20,
        fontSize: 30,
    }

})
