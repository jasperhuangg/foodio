import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';

export default (props) => {
    return (
        <View>
            <Image
                source={{
                    uri: 'https://thispersondoesnotexist.com/image',
                }}
                />
             <Text>Lasagne</Text>
        </View >
    );
}


const styles = {
    postContainerStyle: { flex: 4, flexDirection: 'row', justifyContent: 'center' }
}
