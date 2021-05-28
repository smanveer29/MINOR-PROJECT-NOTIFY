import React, { useState, useEffect, useRef } from 'react';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Text, View, Button, Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const Notification = ({ periodData }) => {

    const [expoPushToken, setExpoPushToken] = useState('');
    // const [notification, setNotification] = useState(false);
    const [subject, setSubject] = useState(null)
    // const notificationListener = useRef();
    // const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        //     setNotification(notification);
        // });

        // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        //     console.log(response);
        // });

        // return () => {
        //     Notifications.removeNotificationSubscription(notificationListener);
        //     Notifications.removeNotificationSubscription(responseListener);
        // };
    }, []);

    useEffect(() => {

        if (periodData) {
            if (periodData.subject && !subject) {
                setSubject(periodData.subject);
                schedulePushNotification(periodData);
            }
        }

    }, [periodData])

    return (
        <View style={{ alignItems: 'center', justifyContent: 'space-around', }}>
            {/* <Text>Your expo push token: {expoPushToken}</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>Title: {notification && notification.request.content.title} </Text>
                <Text>Body: {notification && notification.request.content.body}</Text>
                <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
            </View> */}
        </View>
    );
}

async function schedulePushNotification(periodData) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: `Now Period :${periodData?.subject}`,
            // body: `Venue:${periodData?.venue}`,
            // data: { data: 'goes here' },
        },
        trigger: { seconds: 1 },
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;

}

export default Notification

