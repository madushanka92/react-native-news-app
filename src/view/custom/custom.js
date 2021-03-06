import React, { Component } from 'react';
import { View, ScrollView, RefreshControl, AsyncStorage, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
// import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text } from 'native-base';
import { Container, Header, Content, Picker, Form, Text } from "native-base";
import NewsArticle from '../../components/news-article/article';
import { Services } from '../../services/services';
import HeadTitle from '../../components/header-title/headerTitle';


export default class CustomNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            selected: "bitcoin",
            articles: [],
            spinner: false,
            refreshing: false,
        }


        this.setServices = new Services();
    }

    async onValueChange(value) {
        this.setState({
            selected: value
        });


        await this.setState({ 'spinner': true });
        await this.setState({ "articles": [] });
        await this.getNews();
    }


    componentDidMount = async () => {
        this.setState({ 'spinner': true });
        this.getNews();


        await AsyncStorage.multiSet([
            ['userDetails', null],
        ],
            (err) => { console.log(err) });
    }

    _onRefresh = () => {
        this.setState({ "articles": [] });
        this.setState({ 'refreshing': true });
        this.getNews();
    }

    getNews = () => {
        this.setServices.getService("everything?q=" + this.state.selected, "")
            .then((responseData) => {
                this.setState({ "articles": responseData.articles });
                this.setState({ 'spinner': false });
                this.setState({ 'refreshing': false });
            }, (error) => {
                console.log("error Data :", error);
                this.setState({ 'spinner': false });
                this.setState({ 'refreshing': false });
            })
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                <Header elevation={3} iosStatusbar="light-content" hasSegment
                    androidStatusBarColor='#000' transparent>
                    <HeadTitle title={'News'} />
                </Header>

                <Spinner visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }} />

                <View style={customNewsStyle.CategoryView}>
                    <View>
                        <Text>Category : </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Form >
                            <Picker
                                note
                                mode="dropdown"
                                style={{ width: '100%' }}
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                <Picker.Item label="Bitcoin" value="bitcoin" />
                                <Picker.Item label="Apple" value="apple" />
                                <Picker.Item label="Earthquake" value="earthquake" />
                                <Picker.Item label="Animal" value="animal" />
                            </Picker>
                        </Form>
                    </View>

                </View>

                <View style={{ marginLeft: 15, marginRight: 15, flex: 1 }}>
                    <ScrollView style={customNewsStyle.ScrollView} refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />}
                    >
                        {
                            this.state.articles.map((data, index) => {
                                return (
                                    <NewsArticle key={index} articleDetails={data} navigationData={this.props.navigation} />
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        )

    };
}

const customNewsStyle = StyleSheet.create({
    CategoryView: { flexDirection: 'row', alignItems: 'center', marginLeft: 10 },
    ScrollView: { paddingTop: 10, }
});