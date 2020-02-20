import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

const win = Dimensions.get('window');
const NewsArticle = ({
    articleDetails
}) => (
        <View style={{ flex: 1, flexDirection: 'column', marginBottom: 20, marginLeft: 10, marginRight: 10, backgroundColor: '#E2E8E8', borderRadius: 10 }}>
            <View style={{ height: 50, paddingTop: 5 }} >
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 13 }}>{articleDetails.title}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image resizeMode='contain' style={{ width: win.width, height: 150 }} source={{ uri: "" + articleDetails.urlToImage + "" }}></Image>
            </View>
            <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                <Text>{articleDetails.description}</Text>
            </View>
        </View>
    );

export default NewsArticle;