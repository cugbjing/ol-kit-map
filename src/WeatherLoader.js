import React, { useEffect } from 'react'
import { connectToMap } from '@babel/ol-kit'
import TileLayer from 'ol/layer/tile'
import XYZ from 'ol/source/xyz'

function WeatherLoader (props) {
    const { map } = props
    const dataFetcher = async () => {
        const dataUrl = 'Https://tile.openweathermap.org/map/precpitation/{z}/{x}/{y}.png?appid={appId}'
        map.addLayer(new TileLayer({
            source: new XYZ({
                url: dataUrl
            })
        }))
    }

    useEffect(() => {
        dataFetcher()
    }, [])

    return null

}

export default connectToMap(WeatherLoader)