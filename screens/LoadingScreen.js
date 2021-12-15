import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase";
import { ActivityIndicator } from "react-native-paper";

export default class LoadingScreen extends Component {
  
  componentDidMount() {
    this.checkIfLoggedIn();
  };

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("DashboardScreen");
      } else {
        this.props.navigation.navigate("LoginScreen");
      };
    });
  };

  render() {
    return (
      <View 
      styles = {{

      flex: 1,
      justifyContent: "center",
      alignItems: "center"
      
      }}>
        <ActivityIndicator size="large"/>
      </View>
    );
  };
};