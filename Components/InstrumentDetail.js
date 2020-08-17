// Components/InstrumentDetail.js

import React from 'react'
import {StyleSheet, View, Text, ActivityIndicator, ScrollView, Image,TouchableOpacity} from 'react-native'
import {getInstrumentsFromApiWithSearchedText} from '../Api/UnlistedApi'
import moment from 'moment'
import numeral from 'numeral'
import {connect} from 'react-redux'

class InstrumentDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            instrument: undefined,
            isLoading: true
        }
    }

    componentDidMount() {
        getInstrumentsFromApiWithSearchedText(this.props.route.params.idInstrument).then(data => this.setState({
            instrument: data,
            isLoading: false
        }))
    }

    _toogleFavorite() {
        const action = {type: "TOOGLE_FAVORITE", value: this.state.instrument}
        this.props.dispatch(action)
    }

    componentDidUpdate() {
        console.log(this.props.favoritesInstrument)
    }

    _displayInstrument() {
        const {instrument} = this.state
        if (instrument !== undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Text style={styles.title_text}>{instrument.title}</Text>
                    <Text style={styles.description_text}>{instrument.description}</Text>
                    <Text style={styles.default_text}>Mis en vente le {moment(new Date(instrument.saleDate)).format('DD/MM/YYYY')}</Text>
                    <Text style={styles.default_text}>état : {instrument.state}</Text>
                    <Text style={styles.default_text}>Age : {moment(new Date(instrument.age)).format('DD/MM/YYYY')}</Text>
                    <Text style={styles.default_text}>Prix : {numeral(instrument.price).format('0,0[.]00 $')}</Text>
                    <Text style={styles.default_text}>Famille(s) : {instrument.family}</Text>
                    <Text style={styles.default_text}>Vendeur(e) : {instrument.seller}</Text>
                </ScrollView>
            )
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    render() {
        console.log(this.props)
        return (
            <View style={styles.main_container}>
                {this._displayInstrument()}
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image: {
        height: 169,
        margin: 5
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    favorite_container: {
        alignItems: 'center'
    },
    favorite_image: {
        width:40,
        height: 40
    }
})

const mapStateToProps = (state) => {
    return {
        favoritesInstrument: state.favoritesInstrument
    }
}
export default connect(mapStateToProps)(InstrumentDetail)
