import axios from "axios"
import React, {Component} from 'react';

const GetInstrumentApi = async (term) => {
    const response = await axios.get('http://127.0.0.1:8000/api/music_instruments',
        {
            params: {query: term},
        });
    console.log(response.data.results
    );
}


export default GetInstrumentApi;

