import React, { useState } from 'react'
import { Controls, Map, Popup, LayerPanel, createDataLayer, loadDataLayer } from '@bayer/ol-kit'

import DataLoader from './components/DataLoader'
import TimeTicker from './TimeTicker'

function App() {
  const [dates, setDates] = useState([])
  const [selectedDate, setSelectedDate] = useState([])
  const onMapInit = map => {
    window.map = map

    //const dataLayer = await loadDataLayer(map, 'https://opendata.arcgis.com/datasets/628578697fb24d8ea4c32fa0c5ae1843_0.geojson')
    //console.log('dataLayer', dataLayer)

    // map.addLayer(createDataLayer('us_counties'), { stroke: {width: 2}})
    // map.addLayer(createDataLayer('us_waterways'))
    // map.addLayer(createDataLayer('us_covid'))
  }

  //console.log('selected:', selected)

  return (
    <Map onMapInit={onMapInit} fullScreen>
      <DataLoader 
        setDates={setDates} 
        selectedDate={selectedDate}/>
      <Controls />
      <Popup />
      <TimeTicker 
        dates={dates}
        setSelectedDate={setSelectedDate} 
        />
      <LayerPanel/>
    </Map>
  )
}

export default App