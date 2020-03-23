import React from "react";
import { View, Text, Button } from "react-native";
import { button } from "react-native-elements";
import * as firebase from "firebase"; 

export default function UserLogged () {
    return (
    <View>
        <Text>UserLogged </Text>
        <Button
            title="Cerrar sesión"
            onPress={()=> firebase.auth().signOut()}
        />
        </View>
        );
}
