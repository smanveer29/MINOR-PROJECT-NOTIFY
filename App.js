import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashScreen from './src/screens/SplashScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Context as AuthContext } from './src/context/AuthContext';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { getObjectData } from './src/functions/asyncStorage';
import TeacherScreen from './src/screens/TeacherScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {

  const { login, state } = useContext(AuthContext)

  const user = state.user

  useEffect(() => 
  {
    getObjectData('user').then(res => login(res))
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {!user ?
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
        :
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              } else if (route.name === 'Teacher') {
                iconName = focused ? 'exchange-alt' : 'chalkboard-teacher';
              }

              return route.name !== 'Teacher' ?
                <Ionicons name={iconName} size={size} color={color} />
                : <FontAwesome5 name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          {user.role !== "user" ? <Tab.Screen name="Teacher" component={TeacherScreen} /> : null}
        </Tab.Navigator>
      }

    </NavigationContainer>

  );
}

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
};
