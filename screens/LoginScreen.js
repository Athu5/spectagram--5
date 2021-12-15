import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class LoginScreen extends Component {
    onSignIn = googleUser => {

        var unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
          unsubscribe();
          
          if (!this.isUserEqual(googleUser, firebaseUser)) {
            
            var credential = firebase.auth.GoogleAuthProvider.credential(
              googleUser.idToken,
              googleUser.accessToken
            );
    
            
            firebase
              .auth()
              .signInWithCredential(credential)
              .then(function(result) {
                if (result.additionalUserInfo.isNewUser) {
                  firebase
                    .database()
                    .ref("/users/" + result.user.uid)
                    .set({
                      gmail: result.user.email,
                      profile_picture: result.additionalUserInfo.profile.picture,
                      locale: result.additionalUserInfo.profile.locale,
                      first_name: result.additionalUserInfo.profile.given_name,
                      last_name: result.additionalUserInfo.profile.family_name,
                      current_theme: "dark"
                    })
                    .then(function(snapshot) {});
                }
              })
              .catch(error => {
                
                var errorCode = error.code;
                var errorMessage = error.message;
                
                var email = error.email;
                
                var credential = error.credential;
                
              });
          } else {
            console.log("User already signed-in Firebase.");
          }
        });
      };
    
      signInWithGoogleAsync = async () => {
        try {
          const result = await Google.logInAsync({
            behaviour: "web",
            androidClientId:
              "208967000434-f3jjhjmfu5je5h0tr8qi612b3rf1e9i3.apps.googleusercontent.com",
            iosClientId:
              "208967000434-3gff8n9knpsad9svuha849f1bgrujdcp.apps.googleusercontent.com",
            scopes: ["profile", "email"]
          });
    
          if (result.type === "success") {
            this.onSignIn(result);
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          console.log(e.message);
          return { error: true };
        }
      };
    
      render() {
        return (
          <View style={styles.container}>
            <Button
              title="Sign in with Google"
              onPress={() => this.signInWithGoogleAsync()}
            ></Button>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }
    });