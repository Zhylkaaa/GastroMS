import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Animated,
    Image,
    Dimensions,
    TouchableOpacity,
    Platform
} from "react-native";

import Carousel, { Pagination } from 'react-native-snap-carousel';
import MapView from "react-native-maps";
import {ENTRIES1, CATEGORIES} from 'GastroMS/db/db'
import SliderEntry from 'GastroMS/js/SliderEntry';
import {sliderWidth, itemWidth} from 'GastroMS/js/SliderEntry.style';

const Images = [
    { uri: "https://www.agh.edu.pl/typo3temp/_processed_/csm_1._STUDIO_7857b30b7f.jpg" },
    { uri: "https://i.imgur.com/N7rlQYt.jpg" },
    { uri: "https://i.imgur.com/UDrH0wm.jpg" },
    { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]

const { width, height } = Dimensions.get("window");
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

import { ProviderPropType, Marker, AnimatedRegion } from 'react-native-maps';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        indexOfCurrentMarked: 0,
        markers: [
            {
                coordinate: {
                    latitude: 50.0688441,
                    longitude: 19.9020541,
                },
                title: "Best Place",
                description: "This is the best place in Portland",
                image: Images[0],
            },
            {
                coordinate: {
                    latitude: 50.0686441,
                    longitude: 19.9040541,
                },
                title: "Second Best Place",
                description: "This is the second best place in Portland",
                image: Images[1],
            },
            {
                coordinate: {
                    latitude: 50.0684441,
                    longitude: 19.9060541,
                },
                title: "Third Best Place",
                description: "This is the third best place in Portland",
                image: Images[2],
            },
            {
                coordinate: {
                    latitude: 50.0682441,
                    longitude: 19.9080541,
                },
                title: "Fourth Best Place",
                description: "This is the fourth best place in Portland",
                image: Images[3],
            },
        ],
        region: {
            latitude: 50.0684441,
            longitude: 19.9090541,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
        },
    };

    _renderItem ({item, index}) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0} context={this.props} />;
    }

    _renderItemWithParallax = ({item, index}, parallaxProps) => {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
                navigation={this.props.navigation}
            />
        );
    }

    _renderLightItem ({item, index}) {
        return <SliderEntry data={item} even={false} context={this.props}/>;
    }

    _renderDarkItem ({item, index}) {
        return <SliderEntry data={item} even={true} context={this.props} />;
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    ref={map => this.map = map}
                    initialRegion={this.state.region}
                    style={styles.container}
                >
                    {this.state.markers.map((marker, index) => {
                        const scaleStyle = {
                            transform: [
                                {
                                    scale: index == this.state.indexOfCurrentMarked ? 1 : 0.5
                                },
                            ],
                        };
                        const opacityStyle = {
                            opacity: index == this.state.indexOfCurrentMarked ? 1 : 0.5
                        };
                        return (
                            <MapView.Marker key={index} coordinate={marker.coordinate}>
                                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                    <Image style={[styles.marker, scaleStyle]}
                                           source={require('./../marker.png')}
                                           />
                                </Animated.View>
                            </MapView.Marker>
                        );
                    })

                    }
                </MapView>

                <View style={{position: 'absolute', bottom: 0, lef: 0, right: 0}}>
                    <Carousel
                        ref={c => this._slider1Ref = c}
                        data={ENTRIES1}
                        renderItem={this._renderItemWithParallax}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                        hasParallaxImages={true}
                        firstItem={this.state.indexOfCurrentMarked}
                        inactiveSlideScale={0.94}
                        inactiveSlideOpacity={0.7}
                        containerCustomStyle={styles2.slider}
                        contentContainerCustomStyle={styles2.sliderContentContainer}
                        loop={false}
                        loopClonesPerSide={3}
                        autoplay={false}
                        autoplayDelay={500}
                        autoplayInterval={3000}
                        onSnapToItem={(index) => {markerIndex = index < 4 ? index : 0; this.setState({ indexOfCurrentMarked: markerIndex });
                            const { coordinate } = this.state.markers[markerIndex];
                            this.map.animateToRegion(
                                {
                                    ...coordinate,
                                    latitudeDelta: this.state.region.latitudeDelta,
                                    longitudeDelta: this.state.region.longitudeDelta,
                                },
                                350
                            ) }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
    },
    cardtitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50
    },
    marker: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(130,4,150, 0.5)",
    },
});

const styles2 = StyleSheet.create({
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
    slider: {
        marginTop: 15,
        overflow: 'visible' // for custom animations
    },
    container: {
        flex: 1
    },
    mapView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    searchBar: {
        position: 'absolute',
        top: 20,
        left: 10,
        right: 10,
        height: viewportHeight*0.07,
        borderRadius: viewportHeight*0.07/2,
        backgroundColor: "white",
        justifyContent: 'center',
        elevation: 10,
    },
    iconButton: {
        left: viewportHeight*0.07/2.3,
        //alignSelf: 'center'
    }
});
