import React, { Component } from 'react';
import { View, ScrollView, RefreshControl, AsyncStorage } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
// import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text } from 'native-base';
import { Card, Header, Content, CardItem, Button, Text, Body } from "native-base";
import NewsArticle from '../../components/news-article/article';
import { Services } from '../../services/services';


export default class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            refreshing: false,
            user: null,
            userDetails: null
        }

    }



    componentWillMount = () => {
        this.getUser();
    }

    async getUser() {
        await AsyncStorage.multiGet(['userDetails', 'firstName', 'lastName', 'email', 'userName', 'password']).then(response => {
            console.log("Response : ", response);
            this.setState({ 'user': response[0][1] });
            let userDetails = {
                firstName: response[1][1],
                lastName: response[2][1],
                email: response[3][1],
                userName: response[4][1],
                password: response[5][1],
            };

            this.setState({ 'userDetails': userDetails });
        })
    }

    async removeUser() {

        console.log("remove user");
        this.setState({ 'user': null });
        await AsyncStorage.multiSet([
            ['userDetails', ''],
            ['firstName', ''],
            ['lastName', ''],
            ['email', ''],
            ['userName', ''],
            ['password', ''],
        ],
            (err) => { console.log(err) });
    }




    render() {
        return (
            <View style={{ flex: 1 }} >
                <Header elevation={3} iosStatusbar="light-content" hasSegment
                    androidStatusBarColor='#000' transparent>
                    <View style={{ flexDirection: 'row', height: 50, paddingHorizontal: 10, paddingTop: 5 }}>
                        <View style={{ justifyContent: 'center', }}>
                            <Text style={{
                                color: '#142828',
                                fontWeight: '400', fontSize: 20,
                                alignItems: 'center',
                                alignSelf: 'center', justifyContent: 'center',
                            }}>User</Text>
                        </View>
                    </View>
                </Header>

                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />


                <View style={{ marginLeft: 15, marginRight: 15, flex: 1 }}>
                    {
                        this.state.user == null || this.state.user == '' ?
                            <View style={{ flex: 1, alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
                                {/* <Button style={{ marginBottom: 15 }} block info onPress={this.loadInBrowser}><Text> Sign In </Text></Button> */}
                                <Button block info onPress={() => {
                                    this.props.navigation.navigate('UserRegistration', {
                                        callBack: this.getUser.bind(this)
                                    })
                                }}><Text> Sign Up </Text></Button>
                            </View> :
                            <View style={{ flex: 1 }}>
                                <Content>
                                    {
                                        this.state.userDetails != null ? <Card>
                                            <CardItem>
                                                <Body>
                                                    <Text style={{ marginBottom: 5 }}>Name : {this.state.userDetails.firstName}   {this.state.userDetails.lastName}</Text>
                                                    <Text style={{ marginBottom: 5 }}>Email : {this.state.userDetails.email}</Text>
                                                    <Text style={{ marginBottom: 5 }}>User Name : {this.state.userDetails.userName}</Text>

                                                    <View style={{ marginTop: 25 }} >
                                                        <Button hasText onPress={() => {
                                                            this.removeUser();
                                                        }}><Text>Remove User</Text></Button>
                                                    </View>
                                                </Body>
                                            </CardItem>
                                        </Card> : null
                                    }
                                </Content>
                            </View>

                    }
                </View>
            </View>
        )

    };
}