import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import RestaurantsScreenStacks from "./RestaurantsStacks";
import TopListScreenStack from "./TopListsStack";
import SearchScreenStacks from "./SearchStack";
import AccountScreenStack from "./AccountStack";

const NavigationsStacks = createBottomTabNavigator({
        Restaurants: {
            screen: RestaurantsScreenStacks,
            navigationOptions: () => ({
                tabBarLabel: "Restaurantes",
                tabBarIcon: ({ tintColor  }) => (
                    <Icon
                        type="material-community"
                        name="compass-outline"
                        size = {22}
                        color={tintColor}
                    />        
                )
            })
        },
        TopLists: {
            screen: TopListScreenStack,
            navigationOptions: () => ({
                tabBarLabel: "Ranking",
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        type="material-community"
                        name="star-outline"
                        size = {22}
                        color={tintColor}
                    />     
                )
            }) 
        },
        Search: {
            screen: SearchScreenStacks,
            navigationOptions: () => ({
                tabBarLabel: "Buscar",
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        type="material-community"
                        name="magnify"
                        size = {22}
                        color={tintColor}
                    />     
                )
            }) 
        },
        Account: {
            screen: AccountScreenStack,
            navigationOptions: () => ({
                tabBarLabel: "Cuenta",
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        type="material-community"
                        name="home-outline"
                        size = {22}
                        color={tintColor}
                    />     
                )
            }) 
        }
    },
    {
        initialRouteName: "Restaurants",   
        order: ["Restaurants", "TopLists" , "Search" , "Account"] ,
        tabBarOptions: {
            inactiveTintColor: "#646464",
            activeTintColor: "#00a680"
        }
    }
    );
export default createAppContainer(NavigationsStacks);
