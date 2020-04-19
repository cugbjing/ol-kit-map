import React, { Component } from 'react'
import { connectToMap } from '@bayer/ol-kit'
import olVectorLayer from 'ol/layer/vector'
import GeoJSON from 'ol/format/geojson'
import olVectorSource from 'ol/source/vector'
import olStyle from 'ol/style/style'
import olStroke from 'ol/style/stroke'
import olFill from 'ol/style/fill'
import boundaryData from '../data/gz_2010_us_states_20m.json'
import historyData from '../data/state_history.json'
import red from '@material-ui/core/colors/red'
import { fade } from '@material-ui/core/styles/colorManipulator'
import _ from 'lodash'

const format = new GeoJSON({
    defaultDataProjection: 'EPSG:3857'
})

const features = format.readFeatures(boundaryData, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
})

class DataLoader extends Component {

    // constructor(props){
    //     //To do: make a legend
    // }

    getUniqueDates = (data) => {
        //return a sorted dates
        const allDates = new Set()
        const marks = []
        data.forEach(element => {
            allDates.add(element.date)
        })
        const dateSort = Array.from(allDates).sort()
        dateSort.forEach(item => {
            const dateObj = this.str2Date(item.toString())
            marks.push({
                date: item,
                label: dateObj.toDateString(),
            })
        })
        return marks
    }
    
    str2Date = (dateStr) => {
        const year = parseInt(dateStr.slice(0, 4))
        const mon = parseInt(dateStr.slice(4, 6))
        const day = parseInt(dateStr.slice(6, 8))
        const dateObj = new Date(year, mon-1, day)
        return dateObj
    }
    
    getHistoryDataByState = (stateFip, date, data) => {
        //search for the state data knowing the date and state fip, will return the history data before the date
        const dataByState = data.filter(d => d.fips.toString() === stateFip).reverse()
        const dataByDate = dataByState.filter(d => d.date <= date)
        const dataOnDate = dataByState.filter(d => d.date === date)

        return {
            dataByState,
            dataByDate,
            dataOnDate
        }
    }
    
    getColor = (value) => {
        const colors = [red[100], red[200], red[300], red[400], red[500], red[600], red[700], red[800], red[900]]
        if (value >= 0 && value < 50){
            return fade(colors[0], 0.4)
        } else if (value >= 50 && value < 100) {
            return fade(colors[1], 0.4)
        } else if (value >= 100 && value < 200) {
            return fade(colors[2], 0.4)
        } else if (value >= 200 && value < 400) {
            return fade(colors[3], 0.4)
        } else if (value >= 400 && value < 800) {
            return fade(colors[4], 0.4)
        } else if (value >= 800 && value < 1600) {
            return fade(colors[5], 0.4)
        } else if (value >= 1600 && value < 4000){
            return fade(colors[6], 0.4)
        }else if (value >= 4000 && value < 10000){
            return fade(colors[7], 0.4)
        }else {
            return fade(colors[8], 0.4)
        }
    }
    
    getTotal = (arr, key) => {
        return arr.reduce((a, b) => a + (b[key] || 0), 0)
    }

    getNum = (arr, key) => {
        return (arr.length === 1) ? arr[0][key] || 0 : 0
    }
    
    loadData = () => {
        // function to load the color map data
        const { map, selectedDate } = this.props
        const selected = _.isEmpty(selectedDate)?
        {
            date: 20200228,
            label: "Fri Feb 28 2020"
        } : selectedDate
        features.forEach(feat => {
            const stateFips = feat.get('STATE')
            const { dataByState, dataByDate, dataOnDate } = this.getHistoryDataByState(stateFips, selected.date, historyData)
            const total = this.getTotal(dataByDate, 'positive')
            const numOnDate = this.getNum(dataOnDate, 'positive')
            feat.setProperties({ 
                totalCasesTillDate: total, 
                casesOnDate: numOnDate,
                Title: `State: ${feat.get('NAME')}`,
                historyData: dataByState,
            })
            const color = this.getColor(total)
            const style = new olStyle({
                stroke: new olStroke({
                    color: 'black',
                    width: 1
                }),
                fill: new olFill({
                    color
                })
            })
            feat.setStyle(style)

        })

        const source = new olVectorSource({ features })
        const vectorLayer = new olVectorLayer({ source })
        // Todo: need to remove previous layer
        vectorLayer.set('title', 'State Level Data Layer')
        map.addLayer(vectorLayer)
    }

    componentDidMount() {
        const { setDates } = this.props
        const allDates = this.getUniqueDates(historyData)
        setDates(allDates)
    }

    render() {
        this.loadData()
        return null
    }
}

export default connectToMap(DataLoader)
