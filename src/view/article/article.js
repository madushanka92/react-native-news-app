import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Image, Linking, StyleSheet } from 'react-native';
import { Header, Left, Button, Icon, Body, Right } from 'native-base';

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
    }

    loadInBrowser = () => {
        Linking.openURL(this.state.articleData.url).catch(err => console.error("Couldn't load page", err));
    };

    render() {

        return (
            <View style={{ flex: 1 }} >
                <Header elevation={1} transparent>
                    <Left>
                        <Button style={articleStyle.BackBtn} hasText transparent onPress={() => { this.props.navigation.goBack() }}>
                            <Icon name='arrow-back' style={articleStyle.BackIcon} />
                        </Button>
                    </Left>
                    <Body>
                    </Body>
                    <Right>
                    </Right>
                </Header>

                <ScrollView style={articleStyle.ScrollView}>
                    <View >
                        <Text style={articleStyle.TitleText}>
                            {this.state.articleData.title}
                        </Text>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text>{this.state.articleData.description}</Text>
                    </View>


                    <View style={articleStyle.ImageView}>
                        <Image resizeMode='contain' style={{ width: win.width, height: 150 }} source={{ uri: "" + this.state.articleData.urlToImage + "" }}></Image>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text> {this.state.articleData.content}</Text>
                    </View>
                    <View style={articleStyle.ReadMoreBtnView}>
                        <Button block info onPress={this.loadInBrowser}><Text> Read More . . . </Text></Button>
                    </View>
                </ScrollView>
            </View>
        )

    };
}

const win = Dimensions.get('window');
const articleStyle = StyleSheet.create({
    BackBtn: { height: 15 },
    BackIcon: { fontSize: 30, color: 'black' },
    ScrollView: { margin: 10, height: win.height },
    TitleText: { fontSize: 22, fontWeight: 'bold' },
    ImageView: { justifyContent: 'center', alignItems: 'center', marginTop: 20 },
    ReadMoreBtnView: { marginTop: 15, paddingBottom: 10 }

})