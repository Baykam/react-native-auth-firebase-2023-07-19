import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen from './app/screens/loginScreen';
import RegisterScreen from './app/screens/register';
import styles from './app/styles/custom_styles';



const App = () => {
  const [showRegister, setShowRegister] = useState(false);

  const togglePages = () => {
    setShowRegister(prevShowRegister => !prevShowRegister);
  };

  return (
    <View style={styles.container}>
      {showRegister ? (
        <RegisterScreen togglePages={togglePages} />
      ) : (
        <LoginScreen togglePages={togglePages} />
      )}
    </View>
  );
};



export default App;



// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Login from './app/screens/login';
// import List from './app/screens/list';
// import Details from './app/screens/details';
// import { User, onAuthStateChanged } from 'firebase/auth';
// import { FIREBASE_AUTH } from './FirebaseConfig';

// const Stack = createNativeStackNavigator();

// const InsideStack = createNativeStackNavigator();

// function InsideLayout(){
//   return(
//     <InsideStack.Navigator>
//       <InsideStack.Screen name='My Todos' component={List} />
//       <InsideStack.Screen name='details' component={Details} />
//     </InsideStack.Navigator>
//   )
// }


// export default function App() {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(()=>{
//     onAuthStateChanged(FIREBASE_AUTH, (user)=>{
//       setUser(user);
//     });
//   }, []);
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName='Login'>
//         {user ? (<Stack.Screen name='Inside' component={InsideLayout} options={{ headerShown: false}} />):
//                  (<Stack.Screen name='Login' component={Login} options={{ headerShown: false}} />)}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
