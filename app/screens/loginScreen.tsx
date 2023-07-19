import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,  Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import HomeScreen from './homeScreen';
import styles from '../styles/custom_styles';

const auth = FIREBASE_AUTH;

const LoginScreen = ({togglePages}:{togglePages: () => void}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const signIn = async () => {
    setLoading(true);
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);
        setLoggedIn(true);
    } catch (error:  any) {
        console.log(error);
        Alert.alert('Sign In failed: ' + error.message);
    }finally{
        setLoading(false);
    }
  }

  if (loggedIn) {
    return (
     <HomeScreen togglePages={togglePages}/>
    );
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='padding'>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>🔒</Text>
      </View>

      {/* Welcome back message */}
      <Text style={styles.welcomeText}>Welcome back, you have been missed!</Text>

      {/* Email textfield */}
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoComplete="email"
      />

      {/* Password textfield */}
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry = {true}
      />

      { loading ? <ActivityIndicator size="large" color= "#0000ff"/> :
      <TouchableOpacity onPress={signIn} style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
}
      {/* Go to SignIn page */}
      <View style={styles.registerContainer}>
        <Text>Not A Member? </Text>
          <TouchableOpacity onPress={togglePages}>
            <Text style={styles.registerText}>Register Now</Text>
          </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </View>
  );
};


export default LoginScreen;


