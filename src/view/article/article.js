import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Image, Linking } from 'react-native';
import { Header, Left, Button, Icon, Body, Right } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Services } from '../../services/services';
import NewsArticle from '../../components/news-article/article';

export default class Article extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articleData: null
        }
        console.log("Article");
    }

    componentWillMount() {
        this.setState({ articleData: this.props.navigation.getParam('articleData') });
        console.log("Article Details : ", this.props.navigation.getParam('articleData'));
    }

    loadInBrowser = () => {
        Linking.openURL(this.state.articleData.url).catch(err => console.error("Couldn't load page", err));
    };

    render() {

        const win = Dimensions.get('window');
        return (
            <View style={{ flex: 1 }} >
                <Header elevation={1} transparent>
                    <Left>
                        <Button style={{ height: 15 }} hasText transparent onPress={() => { this.props.navigation.goBack() }}>
                            <Icon name='arrow-back' style={{ fontSize: 30, color: 'black' }} />
                            {/* <FontAwesome name='arrow-left' size={15} color='#000'></FontAwesome> */}
                            {/* <Text style={{ height: 15 ,backgroundColor: 'blue' , fontSize: 13, color: 'black' }}>  Back</Text> */}
                        </Button>

                    </Left>
                    <Body>
                    </Body>
                    <Right>
                    </Right>
                </Header>

                <ScrollView style={{ margin: 10, height: win.height }}>
                    <View >
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                            {this.state.articleData.title}
                        </Text>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text>{this.state.articleData.description}</Text>
                    </View>


                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <Image resizeMode='contain' style={{ width: win.width, height: 150 }} source={{ uri: "" + this.state.articleData.urlToImage + "" }}></Image>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text> {this.state.articleData.content}</Text>
                    </View>
                    <View style={{ marginTop: 15 , paddingBottom : 10 }}>
                        {/* <Button hasText style={{ height: 50 }} title="Open in Browser" onPress={this.loadInBrowser} /> */}
                        <Button block info onPress={this.loadInBrowser}><Text> Read More . . . </Text></Button>
                    </View>
                </ScrollView>
            </View>
        )

    };
}