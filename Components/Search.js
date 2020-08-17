// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
import { getInstrumentsFromApiWithSearchedText } from '../Api/UnlistedApi'
import InstrumentItem from "./InstrumentItem";

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchedText = ""
        this.page = 0
        this.totalPages = 0
        this.state = {
            instruments: [],
            isLoading: false
        }
    }

    _loadInstruments() {
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true })
            getInstrumentsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                this.page = data.page
                this.totalPages = data.totalPages
                this.setState({
                    instruments: [ ...this.state.instruments, ...data.results ],
                    isLoading: false
                })
            })
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _searchInstruments() {
        this.page = 0
        this.totalPages = 0
        this.setState({
            instruments: [],
        }, () => {
            this._loadInstruments()
        })
    }

    _displayDetailForInstrument = (idInstrument) => {
        console.log("Display instrument with id " + idInstrument)
        this.props.navigation.navigate("InstrumentDetail", { idInstrument: idInstrument })
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={Styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    render() {
        return (
            <View style={Styles.main_container}>
                <TextInput
                    style={Styles.textinput}
                    placeholder='Titre du instrument'
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._searchInstruments()}
                />
                <Button title='Rechercher' onPress={() => this._searchInstruments()}/>
                <FlatList
                    data={this.state.instruments}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <InstrumentItem instrument={item} displayDetailForInstrument={this._displayDetailForInstrument}/>}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages) {
                            this._loadInstruments()
                        }
                    }}
                />
                {this._displayLoading()}
            </View>
        )
    }
}


const Styles  = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default Search;
