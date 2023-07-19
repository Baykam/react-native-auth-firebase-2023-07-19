import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import styles from "../styles/custom_styles";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const auth = FIREBASE_AUTH;

const HomeScreen = ({ togglePages }: { togglePages: () => void }) => {
  const [loading, setLoading] = useState(false);

  const logOut = async () => {
    setLoading(true);
    try {
      const response = await auth.signOut();
      console.log(response);
      togglePages(); // togglePages fonksiyonunu çağır
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loggedInText}>You are logged in!</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={logOut}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HomeScreen;
