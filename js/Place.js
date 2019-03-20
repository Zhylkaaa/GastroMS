import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator, Image, TouchableHighlight, Linking} from 'react-native';
import Communications from 'react-native-communications';
import StarRating from 'react-native-star-rating'

export class Place extends Component {


    render() {
        return (
            <View>
                <View>
                    <Text>Rating: </Text>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={this.props.data.rating}
                        fullStarColor={'red'}
                    />
                </View>
                <Text>Contact: </Text>
                <View style={{flexDirection: "row"}}>
                    <Text>Website: </Text>
                    <TouchableHighlight onPress={() => Linking.openURL(this.props.data.website)}><Text>{this.props.data.website}</Text></TouchableHighlight>
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text>Phone number: </Text>
                    <TouchableHighlight onPress={() => Communications.phonecall(this.props.data.phone_number)}><Text>{this.props.data.phone_number}</Text></TouchableHighlight>
                </View>
                <View>
                    {console.log(this.props.data.opening_hours)}
                    <Text>Information: </Text>
                    {this.props.data.opening_hours.open_now ? <Text>Google: open</Text> : <Text>Google: close</Text>}
                    {this.props.data.opening_hours.weekday_text.map(day =>
                        <Text>{day}</Text>
                    )}
                </View>
            </View>
        )
    }
}
