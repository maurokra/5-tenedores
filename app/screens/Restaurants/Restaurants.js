import React, { useState, useEffect } from "react";
import {StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import { CONTACTS } from "expo-permissions";


export default function Restaurants (props) {
const { navigation } = props;
const [user, setUser] = useState(null);

console.log(props);

useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
        console.log(userInfo);
        setUser(userInfo)
    })
}, [])

    return(
        <View style= {styles.viewBody}>
            <Text>estamos en restaurantes!</Text>
            
            <Icon
                reverse
                type="material-community"
                name="plus"
                color="#00a680"
                containerStyle={styles.btnContainer}
                onPress={()=> navigation.navigate("AddRestaurant")}
               
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"

    },
    btnContainer: {
        position:"absolute",
        bottom:10,
        right:10,
        shadowColor:"black",
        shadowOffset: {width: 2, height: 2}, 
        shadowOpacity: 0.5
    }
});