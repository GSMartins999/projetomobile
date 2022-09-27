import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import {apiUser} from '../';

export async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if(finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    await apiUser.updateToken(token)
}else{
    alert('Must use physical device for push Notifications');
}

if (Platform.OS == 'android') {
    await Notifications.setNotificationChannelAsync('default',{
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0,250,250,250],
        lightColor: '#ff231f7c'
    });
}

return token;
}