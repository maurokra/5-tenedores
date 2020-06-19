import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button } from "react-native";
import { button } from "react-native-elements";
import Toast from "react-native-easy-toast";
import * as firebase from "firebase"; 
import InfoUser from "../../commponents/Account/InfoUser";
import Loading from "../../commponents/Loading";
import AccountOptions from "../../commponents/Account/AccountOptions";

export default function UserLogged() {
    const toastRef = useRef();
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [realoadUserInfo, setRealoadUserInfo] =useState (false);

    useEffect(() => {
        (async() => {
            const user = await firebase.auth().currentUser;
            //console.log(user);
            setUserInfo(user.providerData[0]);
        })();
        setRealoadUserInfo(false);
    }, [realoadUserInfo]);

    return (
        
    <View>
        <InfoUser userInfo={userInfo} 
                  toastRef={toastRef}
                  setLoading={setLoading}
                  setLoadingText={setLoadingText}
                  />
        <AccountOptions userInfo={userInfo} toastRef={toastRef} setRealoadUserInfo={setRealoadUserInfo}/>
        <Button
            title="Cerrar sesión"
            onPress={()=> firebase.auth().signOut()}
        />
        <Toast ref={toastRef} position="center" opacity={0.9}/>
        <Loading text={loadingText} isVisible={loading}/>
        </View>
        );
}
