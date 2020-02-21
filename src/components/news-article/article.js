import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';

const win = Dimensions.get('window');
const NewsArticle = ({
    articleDetails, navigationData
}) => (
        <View style={newsArticleStyle.ArcticleView}>
            <TouchableOpacity onPress={() => { navigationData.navigate('NewsArticle', { articleData: articleDetails }) }}>
                <View style={newsArticleStyle.TitleHead} >
                    <Text style={newsArticleStyle.TitleText}>{articleDetails.title}</Text>
                </View>
                <View style={newsArticleStyle.ImageView}>
                    <Image resizeMode='contain' style={newsArticleStyle.Image} source={{ uri: "" + articleDetails.urlToImage + "" }}></Image>
                </View>
                <View style={newsArticleStyle.DescriptionView}>
                    <Text>{articleDetails.description}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

export default NewsArticle;

const newsArticleStyle = StyleSheet.create({
    ArcticleView: { flex: 1, flexDirection: 'column', marginBottom: 20, marginLeft: 10, marginRight: 10, backgroundColor: '#E2E8E8', borderRadius: 10 },
    TitleHead: { height: 50, paddingTop: 5 },
    TitleText: { textAlign: 'center', fontWeight: 'bold', fontSize: 13 },
    ImageView: { justifyContent: 'center', alignItems: 'center' },
    Image: { width: win.width, height: 150 },
    DescriptionView: { marginLeft: 10, marginRight: 10, marginBottom: 10 }
});