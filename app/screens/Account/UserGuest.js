import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";

 function UserGuest(props) {
    const { navigation } = props;

    return(
        <ScrollView style = { sytles.viewBody } centerContent={true}>
            <Image
                source={require("../../../assets/img/user_guest.jpg")}
                style={sytles.image}
                resizeMode="contain"
            />        
            <Text style={sytles.title}> Consulta tu perfil de 5 tenedores </Text>
            <Text style={sytles.description}>
                ¿como describirias tu mejor restaurante? busca y visualiza los mejores restaurantes
                de una forma sencilla, vota cual te ha gustado mas y comenta como ha sido tu experiencia. 
            </Text>
            <View style={sytles.viewBtn}>
                <Button
                    buttonStyle={sytles.btnStyle}
                    containerStyle={sytles.btnContainer}
                    title="Ver tu perfil"
                    onPress={() => navigation.navigate("Login") }
                />
            </View>
        </ScrollView>
                
    );
}

export default withNavigation (UserGuest);

const sytles = StyleSheet.create ({
    viewBody: {
        marginLeft:30,
        marginRight: 30
        },
    imagen: {
        height : 100,
        width: "50%",
        marginBottom: 10
         },
    title: {
         fontWeight: "bold",
         fontSize: 19,
         marginBottom: 10,
         textAlign:"center"
        },
    description: {
            textAlign: "center",
            marginBottom: 20
        },
        viewBtn: {
            flex: 1,
            alignItems: "center"
        },
        btnStyle : {
            backgroundColor: "#00a860"
        },
        btnContainer: {            
            width: "70%"
        }
    });
