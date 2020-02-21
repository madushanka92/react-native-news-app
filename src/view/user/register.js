import React, { Component } from 'react';
import { View, ScrollView, RefreshControl, AsyncStorage, TextInput } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import DropdownAlert from 'react-native-dropdownalert';
// import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text } from 'native-base';
import { Container, Header, Content, Picker, Button, Text, Left, Icon, Body, Right } from "native-base";
import NewsArticle from '../../components/news-article/article';
import { Services } from '../../services/services';


export default class UserRegister extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            firstName: null,
            lastName: null,
            email: null,
            userName: null,
            password: null
        }
    }
    componentDidMount = async () => {
        // this.setState({ 'spinner': true });
        await AsyncStorage.multiGet(['userDetails','firstName','lastName','email','userName','password' ]).then(response => {
            console.log("Response : ", response);
            this.setState({ 'user': response[0][1] });
        })
    }

    async submitUser() {
        if (this.state.firstName == null)
            this.dropDownAlertRef.alertWithType('error', 'Error', "First Name can not be blank");
        if (this.state.lastName == null)
            this.dropDownAlertRef.alertWithType('error', 'Error', "Last Name can not be blank");
        if (this.state.email == null)
            this.dropDownAlertRef.alertWithType('error', 'Error', "Email can not be blank");
        if (this.state.userName == null)
            this.dropDownAlertRef.alertWithType('error', 'Error', "User Name can not be blank");
        if (this.state.password == null)
            this.dropDownAlertRef.alertWithType('error', 'Error', "Password can not be blank");
        else {

            let user = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                userName: this.state.userName,
                password: this.state.password
            }

            console.log("User Data :", JSON.stringify(user));
            await AsyncStorage.multiSet([
                ['userDetails', JSON.stringify(true)],
                ['firstName', this.state.firstName],
                ['lastName', this.state.lastName],
                ['email', this.state.email],
                ['userName', this.state.userName],
                ['password', this.state.password], 
            ],
                (err) => { console.log(err) });

            this.props.navigation.state.params.callBack();
            this.props.navigation.goBack();
        }
    }




    render() {
        return (
            <View style={{ flex: 1 }} >
                <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
                <Header elevation={3} iosStatusbar="light-content" hasSegment
                    androidStatusBarColor='#000' transparent>
                    <Left>
                        <Button style={{ height: 15 }} hasText transparent onPress={() => { this.props.navigation.goBack() }}>
                            <Icon name='arrow-back' style={{ fontSize: 30, color: 'black' }} />
                        </Button>

                    </Left>
                    <Body>
                        <View style={{ flexDirection: 'row', height: 50, paddingHorizontal: 10, paddingTop: 5 }}>
                            <View style={{ justifyContent: 'center', }}>
                                <Text style={{
                                    color: '#142828',
                                    fontWeight: '400', fontSize: 20,
                                    alignItems: 'center',
                                    alignSelf: 'center', justifyContent: 'center',
                                }}>User Registration</Text>
                            </View>
                        </View>
                    </Body>
                </Header>

                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />


                <View style={{ marginLeft: 15, marginRight: 15, marginTop: 20, flex: 1 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ width: 100 }}>First Name : </Text>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                style={{ height: 40, width: '90%', borderColor: 'gray', borderBottomWidth: 1 }}
                                onChangeText={(text) => this.setState({ "firstName": text })}
                                value={this.state.text}
                            /></View>
                    </View>


                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ width: 100 }}>Last Name : </Text>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                style={{ height: 40, width: '90%', borderColor: 'gray', borderBottomWidth: 1 }}
                                onChangeText={(text) => this.setState({ "lastName": text })}
                                value={this.state.text}
                            /></View>
                    </View>


                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ width: 100 }}>Email : </Text>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                style={{ height: 40, width: '90%', borderColor: 'gray', borderBottomWidth: 1 }}
                                onChangeText={(text) => this.setState({ "email": text })}
                                value={this.state.text}
                            /></View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ width: 100 }}>User Name : </Text>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                style={{ height: 40, width: '90%', borderColor: 'gray', borderBottomWidth: 1 }}
                                onChangeText={(text) => this.setState({ "userName": text })}
                                value={this.state.text}
                            /></View>
                    </View>


                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ width: 100 }}>Password : </Text>
                        <View style={{ flex: 1 }}>
                            <TextInput secureTextEntry={true}
                                style={{ height: 40, width: '90%', borderColor: 'gray', borderBottomWidth: 1 }}
                                onChangeText={(text) => this.setState({ "password": text })}
                                value={this.state.text}
                            /></View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: 'red', fontSize: 12 }}>* All the fields are required</Text>
                    </View>

                    <View style={{ marginTop: 25 }}>
                        <Button hasText onPress={() => {
                            this.submitUser();
                        }}><Text>Register</Text></Button>
                    </View>
                </View>
            </View>
        )

    };
}