import React, {Component} from 'react';
import {TouchableOpacity, Text, View,StyleSheet} from "react-native";

class InstrumentItem extends Component {
    render() {
        const {instrument, displayDetailForInstrument} = this.props
        return (
            <TouchableOpacity
                style={Styles.main_container}
                onPress={() => displayDetailForInstrument(instrument.id)}>
                <View style={Styles.content_container}>
                    <View style={Styles.header_container}>
                        <Text style={Styles.name_text}>{instrument.name}</Text>
                        <Text style={Styles.seller_text}>{instrument.seller}</Text>
                        <Text style={Styles.price_number}>{instrument.price}</Text>
                    </View>
                    <View style={Styles.description_container}>
                        <Text style={Styles.description_text} numberOfLines={6}>{instrument.description}</Text>
                    </View>
                    <View style={Styles.date_container}>
                        <Text style={Styles.date_text}>Sortie le {instrument.age}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
const Styles = StyleSheet.create({
    main_container: {
        height: 190,
        marginTop: 20,
        flexDirection: 'row'
    },
    seller_text:{
      flex: 1
    },
    image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'gray'
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 3,
        flexDirection: 'row'
    },
    name_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    price_number: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    description_container: {
        flex: 7
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    }
})
export default InstrumentItem;
