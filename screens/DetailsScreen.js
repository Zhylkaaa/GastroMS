/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator, Image} from 'react-native';
import {Place} from 'GastroMS/js/Place.js'

export class DetailsScreen extends Component {

    constructor(props){
        super(props);
        this.state = {isLoading: true}
        this._loadDetails();
    }

    _loadDetails(){
        console.log(`placeid: ${this.props.navigation.state.params.placeid}`);
        fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${this.props.navigation.state.params.placeid}&key=AIzaSyBjHuyAAMx8HYFBuFxMxnzUmfRUa737ues&fields=rating,website,formatted_phone_number,opening_hours`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    rating: responseJson.result.rating,
                    status: responseJson.status,
                    website: responseJson.result.website,
                    phone_number: responseJson.result.formatted_phone_number,
                    opening_hours: responseJson.result.opening_hours
                })
            }).catch((error) => {
            alert(error);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex:2, alignItems: 'stretch', flexDirection: 'row'}}>
                    <Image style={{width: "100%", height: "100%"}} source={{uri: this.props.navigation.state.params.illustration}}/>
                </View>
                <View style={{flex:5}}>
                    {this.state.isLoading ? <ActivityIndicator size={'small'} color={'rgba(0, 55, 167, 0.6)'}/>
                        : this.state.status === "OK" ? <Place data={this.state}/> : <Text>Error loading data!</Text>}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
