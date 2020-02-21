import React, { Component } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { Header, Body } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

import { Services } from '../../services/services';
import NewsArticle from '../../components/news-article/article';
import HeadTitle from '../../components/header-title/headerTitle';

export default class TopNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
                this.setState({ "articles": responseData.articles });
                this.setState({ 'spinner': false });
                this.setState({ 'refreshing': false });
            }, (error) => {
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
                    <HeadTitle title={'Top News'}/>
                </Header>

                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />

                <View style={topNewsStyle.ContentView}>
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

const topNewsStyle = StyleSheet.create({
    ContentView: { marginLeft: 15, marginRight: 15, flex: 1 }
})