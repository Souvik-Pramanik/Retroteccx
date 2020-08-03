import React from 'react';
import {StyleSheet, Dimensions, View, Text, } from 'react-native';
import ReadMore from 'react-native-read-more-text';
import { Surface, Button } from 'react-native-paper';
import StarRating from 'react-native-star-rating';

const { height, width } = Dimensions.get('window');

export default  ({ report }) => {

    const _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={ { color: 'rgba(88,88,244,1)', marginTop: 5 } } onPress={ handlePress }>
                Read more
            </Text>
        );
    }
    const _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={ { color: 'rgba(88,88,244,1)', marginTop: 5 } } onPress={ handlePress }>
                Show less
            </Text>
        );
    }

    return (
        <Surface style = {styles.itemContainer}>
            <View style={{margin: 5}}>
                <Text>Bribery in {report.gov_admin}</Text>
            </View>
            <View style={styles.rating}>
                <Text style={{marginVertical: 5}}>
                    User rating: 
                </Text>
                <StarRating
                    starSize={25}
                    emptyStar={ 'star-border' }
                    fullStar={ 'star' }
                    halfStar={ 'star-half' }
                    iconSet={ 'MaterialIcons' }
                    maxStars={ 5 }
                    rating={ report.user_rating }
                    fullStarColor={ 'rgba(147,12,178,1)' }
                />
            </View>
            <View style={ styles.itemBody }>
                <Text style={ { marginVertical: 5 } }>
                    User Feedback: 
                </Text>
                <ReadMore numberOfLines={ 4 } renderTruncatedFooter={ _renderTruncatedFooter }
                    renderRevealedFooter={ _renderRevealedFooter }>
                    <Text style={ { fontSize: 16, lineHeight: 20, fontWeight: '700' } }>
                        { report.user_feedback }
                    </Text>
                </ReadMore>
            </View>
        </Surface>
    );
}

const styles = StyleSheet.create({

    itemContainer: {
        width: width * 0.95,
        elevation: 9,
        flexDirection: 'column',
        padding: 15,
        marginVertical: 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(255,255,255,1)',
    },
    rating: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingBottom: 10,
        borderBottomWidth: 0.4,
    },
    itemBody: {
        flex: 2,
        alignItems: 'flex-start',
        paddingBottom: 20,
        width: width * 0.95
    },
    userfeedback: {
        padding: 10,
        borderBottomWidth: 0.4
    }
});