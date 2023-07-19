import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import styles from '../styles/custom_styles';

const RegisterScreen = ({togglePages}:{togglePages: () => void}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  

  const signUp = async () => {
    setLoading(true);
    if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match. Please try again.');
        setLoading(false);
        return;
      }


    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log(response); 
    } catch (error: any) {
        console.log(error);
        Alert.alert('Registration failed: ' + error.message);
    }finally{
        setLoading(false);
    }
  }



  return (
    <View style={styles.container}>
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
        onChangeText={(text) => setEmail(text)}
        autoComplete="email"
      />

      {/* Password textfield */}
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry = {true}
      />

      {/* CurrentPassword textfield */}
      <TextInput
      style= {styles.textInput}
      placeholder='Confirm Password'
      value={confirmPassword}
      onChangeText={setConfirmPassword}
      secureTextEntry = {true}
      />

      {
        loading ? <ActivityIndicator size="large" color= "#0000ff"/>
        :    
      <TouchableOpacity onPress={signUp} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
}
   
      {/* Go to SignIn page */}
      <View style={styles.registerContainer}>
        <Text>Already have account </Text>
        <TouchableOpacity onPress={togglePages}>
          <Text style={styles.registerText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;


