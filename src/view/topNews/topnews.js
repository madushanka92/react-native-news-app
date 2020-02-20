import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Header, Body } from 'native-base';

import { Services } from '../../services/services';
import NewsArticle from '../../components/news-article/article';

export default class TopNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articleData: false,
            articles: []
        }

        this.setServices = new Services();
    }

    componentDidMount = () => {
        this.setServices.getService("top-headlines?country=us", "")
            .then((responseData) => {
                console.log("responseData :", responseData); 
                this.setState({ "articles": responseData.articles });
                this.setState({ "articleData": true });
                console.log("responseData :", this.state.articleData);
            }, (error) => {

                console.log("error Data :", error);
            })
    }

    render() {
        return (
            <View>
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

                {
                    this.state.articleData == true ? <View style={{ marginLeft: 15, marginRight: 15 }}>
                        <ScrollView style={{  paddingTop: 10, marginBottom: 80, }}>
                            {
                                this.state.articles.map((data , index) => {
                                    return (
                                        <NewsArticle key={index}  articleDetails={data} />
                                    )
                                })
                            }
                        </ScrollView>
                    </View> : null
                }
            </View>
        )

    };
}