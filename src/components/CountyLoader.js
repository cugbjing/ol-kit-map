import React, { useEffect } from 'react'
import { connectToMap } from '@bayer/ol-kit'
import olFeature from 'ol/feature'
import olVectorLayer from 'ol/layer/vector'
import olVectorSource from 'ol/source/vector'
import olPolygon from 'ol/geom/polygon'
import olMultiPolygon from 'ol/geom/multipolygon'
import olStyle from 'ol/style/style'
import olFill from 'ol/style/fill'
import olStroke from 'ol/style/stroke'
import proj from 'ol/proj'
import _ from 'lodash'

const countyData = require('../data/gz_2010_us_county_20m.json')

const getCustomProperties = (covidData) => {

    if (!covidData) return {}

    const { province, county, last_updated,
        latest: { confirmed, deaths, recovered } } = covidData;
    return {
        Name: county,
        State: province,
        Confirmed: confirmed,
        Death: deaths,
        Recovered: recovered,
        Last_Updated: last_updated,
    }
};

const getStates = () => {
    const stateData = require('../data/gz_2010_us_states_20m.json')
    const states = {}
    stateData.features.forEach(state => {
        const { properties } = state
        states[properties.STATE] = properties.NAME
    })
    return states
}

function CountyLoader(props) {

    const states = getStates()
    const vectorLayer = new olVectorLayer({ source: new olVectorSource() })
    const source = vectorLayer.getSource()
    const { map } = props
    const dataFetcher = async () => {

        const covidDataUrl = 'https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=nyt&country_code=US&timelines=false'
        const request = await fetch(covidDataUrl)
        const response = await request.json()
        const covidData = response.locations;

        countyData.features.forEach(county => {
            const { geometry, properties } = county
            const countyFips = properties.STATE + properties.COUNTY

            const customProperties = getCustomProperties(covidData.find((cData) => cData.county === properties.NAME
                && cData.province === states[properties.STATE]))
            const coords = geometry.type === 'MultiPolygon'
                ? geometry.coordinates.map(c => c.map(c => c.map(c => proj.fromLonLat(c))))
                : geometry.coordinates.map(c => c.map(c => proj.fromLonLat(c)))
            const olGeom = geometry.type === 'MultiPolygon'
                ? new olMultiPolygon(coords)
                : new olPolygon(coords)
            const feature = new olFeature({ geometry: olGeom })

            vectorLayer.setStyle(
                new olStyle({
                    fill: new olFill({ color: '#7FDBFF33' }),
                    stroke: new olStroke({
                        color: '#0074D9', width: 2
                    })
                })
            )
            feature.setProperties({ ...customProperties, countyFips, title: properties.NAME })
            source.addFeature(feature)
        })

        const prevLayers = map.getLayers()
            .getArray()
            .filter((l) => l.get('title') === 'State Level Data Layer' || l.get('title') === 'County Level Data Layer')
        
        if(!_.isEmpty(prevLayers)){
            prevLayers.forEach( layer => {
                map.removeLayer(layer)
            })
        }

        vectorLayer.set('title', 'County Level Data Layer')
        map.addLayer(vectorLayer)
    }

    useEffect(() => {
        dataFetcher()
    }, [])

    return null
}

export default connectToMap(CountyLoader)