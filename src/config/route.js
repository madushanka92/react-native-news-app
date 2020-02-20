import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import React, { Component } from 'react';

import { Image, View, Text, StyleSheet } from 'react-native';
import TopNews from "../view/topNews/topnews";
import CustomNews from "../view/custom/custom";
import User from "../view/user/user";

const MainNavigation = createBottomTabNavigator(
    {
        TopNews: {
            screen: TopNews,
            navigationOptions: {
                tabBarLabel: "Top News",
            }
        },
        Custom: {
            screen: CustomNews,
            navigationOptions: {
                tabBarLabel: "Custom",
            }
        },
        User: {
            screen: User,
            navigationOptions: {
                tabBarLabel: "User",
            }
        },
    },
    {
        initialRouteName: "TopNews",
        order: ['TopNews', 'Custom', 'User'],
        navigationOptions: {
            gesturesEnabled: false,
        },
        tabBarOptions: {
            // showIcon: true,
            // showLabel: true,
            // activeTintColor: '#F8F8F8',
            // inactiveTintColor: '#e8eaef',
            style: {
                marginBottom: 10,
                height: 30,
            },
            labelStyle: {
                fontSize: 15,
              },
        },
        swipeEnabled: true,
        animationEnabled: true
    }
);


const LaunchNavigate = createStackNavigator(
    {
        Luncher: {
            screen: MainNavigation,
            navigationOptions: {
                header: null
            }
        },
        NewsArticle: {
            screen: "NewsArticle",
            navigationOptions: {
                header: null,
                headerBackTitle: "Back"
            }
        }
    },
    {
        initialRouteName: "Luncher",
        // headerMode: "screen",
        headerBackTitleVisible: true,
        headerLayoutPreset: 'center'
        // navigationOptions: { gesturesEnabled: false }
    }
);

export const AppNavigator = createAppContainer(LaunchNavigate);

const menuStyles = StyleSheet.create({

})
