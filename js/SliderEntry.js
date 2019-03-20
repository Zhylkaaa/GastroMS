import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from 'GastroMS/js/SliderEntry.style';

export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { illustration }, parallax, parallaxProps, even } = this.props;

        return parallax ? (
            <ParallaxImage
                source={{ uri: illustration }}
                containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
                style={styles.image}
                parallaxFactor={0.35}
                showSpinner={true}
                spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
                {...parallaxProps}
            />
        ) : (
            <Image
                source={{ uri: illustration }}
                style={styles.image}
            />
        );
    }

    render () {
        const { data: { title, subtitle }, even } = this.props;

        const uppercaseTitle = title ? (
            <Text
                style={[styles.title, even ? styles.titleEven : {}]}
                numberOfLines={2}
            >
                { title.toUpperCase() }
            </Text>
        ) : false;

        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.slideInnerContainer}
                onPress={() => this.props.navigation.navigate('Detail', {placeid: this.props.data.placeid,illustration: this.props.data.illustration})}
            >

                <View style={styles.shadow} />
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    { this.image }
                    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                </View>
                <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    { uppercaseTitle }
                    <Text
                        style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                        numberOfLines={2}
                    >
                        { subtitle }
                    </Text>
                </View>
                {console.log(this.props.data.placeid)}
            </TouchableOpacity>
        );
    }
}

/*import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from 'eMiasteczko/js/SliderEntry.style';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
export default class SliderEntry extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };
    get image () {
        const { data: { illustration }, parallax, parallaxProps, even } = this.props;
        return(
            <Image
              source={{ uri: illustration }}
              style={styles.image}
            />
        );
    }
    render () {
        const { data: { icon, title, subtitle }, even } = this.props;
        const icon2 = icon;
        const uppercaseTitle = title ? (
            <Text
              style={[styles.title, even ? styles.titleEven : {}]}
              numberOfLines={2}
            >
                { title.toUpperCase() }
            </Text>
        ) : false;
        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => { alert(`You've clicked '${title}'`); }}
              >
              <View style={styles.shadow} />
              <View style={styles.buttonContainer}>
                  <Icon
                    name= {icon2}
                    size={75}
                  />
              </View>
            </TouchableOpacity>
        );
    }
}*/

/*
<Image
  source={{ uri: 'https://i.imgur.com/UYiroysl.jpg' }}
  style={styles.image}
/>
*/

/*<View style={styles.shadow} />
<View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
    { this.image }
    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
</View>
<View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
    { uppercaseTitle }
    <Text
      style={[styles.subtitle, even ? styles.subtitleEven : {}]}
      numberOfLines={2}
    >
        { subtitle }
    </Text>
</View>*/
