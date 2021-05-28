import React, { useEffect, useState } from 'react'
import { db } from '../utils/firebase';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import CircularProgress from './CircularProgress';
import Table from './Table';

const Timetable = ({ day }) => {
    const [data, setData] = useState([]);
    const [todayData, setTodayData] = useState(null);

    useEffect(() => { db.collection('notify-data').doc('timetable').get().then(res => setData(res.data())) }, []);

    useEffect(() => { setTodayData(data[day.dayCode]) }, [data, day])

    return (
        <SafeAreaView><ScrollView>{todayData ? <Table todayData={todayData} /> : <CircularProgress />}</ScrollView></SafeAreaView>
    )
}
export default Timetable