import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeadTitle = ({
    title
}) => (
        <View style={style.HeadTitleView}>
            <View style={style.HeadTitleContent}>
                <Text style={style.HeadTitle}>{title}</Text>
            </View>
        </View>
    );

export default HeadTitle;

const style = StyleSheet.create({
    HeadTitleView: { flexDirection: 'row', height: 50, paddingHorizontal: 10, paddingTop: 5 },
    HeadTitleContent: { justifyContent: 'center' },
    HeadTitle: { color: '#142828', fontWeight: '400', fontSize: 20, alignItems: 'center', alignSelf: 'center', justifyContent: 'center' },

})