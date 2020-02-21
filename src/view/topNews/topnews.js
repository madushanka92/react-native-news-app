import React, { Component } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { Header, Body } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

import { Services } from '../../services/services';
import NewsArticle from '../../components/news-article/article';

export default class TopNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articleData: false,
            articles: [],
            spinner: false,
            refreshing: false,
        }

        this.setServices = new Services();

    }

    componentDidMount = () => {
        this.setState({ 'spinner': true });
        this.getNews();
    }

    getNews = () => {
        this.setServices.getService("top-headlines?country=us", "")
            .then((responseData) => {
                console.log("responseData :", responseData);
                this.setState({ "articles": responseData.articles });
                this.setState({ "articleData": true });
                console.log("responseData :", this.state.articleData);
                this.setState({ 'spinner': false });
                this.setState({ 'refreshing': false });
            }, (error) => {

                console.log("error Data :", error);
                this.setState({ 'spinner': false });
                this.setState({ 'refreshing': false });
            })
    }

    _onRefresh = () => {
        this.setState({ "articles": [] });
        this.setState({ 'refreshing': true });
        this.getNews();
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                <Header elevation={3} iosStatusbar="light-content"
                    androidStatusBarColor='#000' transparent>
                    <View style={{ flexDirection: 'row', height: 50, paddingHorizontal: 10, paddingTop: 5 }}>
                        <View style={{ justifyContent: 'center', }}>
                            <Text style={{
                                color: '#142828',
                                fontWeight: '400', fontSize: 20,
                                alignItems: 'center',
                                alignSelf: 'center', justifyContent: 'center',
                            }}>Top News</Text>
                        </View>
                    </View>
                </Header>

                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />

                <View style={{ marginLeft: 15, marginRight: 15, flex: 1 }}>
                    <ScrollView style={{ paddingTop: 10, }} refreshControl={
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