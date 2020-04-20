import React, { useState } from 'react'
import { Controls, Map, Popup } from '@bayer/ol-kit' 
import DataLoader from './components/DataLoader'
import TimeTicker from './TimeTicker'
import CountyLoader from './components/CountyLoader'
import Legend from './components/Legend'

function App() {
  const [dates, setDates] = useState([])
  const [selectedDate, setSelectedDate] = useState([])
  const [showCounty, setShowCounty] = useState(false)
  const onMapInit = map => {
    window.map = map

    //const dataLayer = await loadDataLayer(map, 'https://opendata.arcgis.com/datasets/628578697fb24d8ea4c32fa0c5ae1843_0.geojson')
    //console.log('dataLayer', dataLayer)

    // map.addLayer(createDataLayer('us_counties'), { stroke: {width: 2}})
    // map.addLayer(createDataLayer('us_waterways'))
    // map.addLayer(createDataLayer('us_covid'))
  }

  const switchLayer = () => {
    setShowCounty(!showCounty)
  }

  return (
    <Map onMapInit={onMapInit} fullScreen>
      <button 
        style={{position: 'absolute', fontSize: '16px'}} 
        onClick={switchLayer}>
        {showCounty? 'Switch to State' : 'Switch to County'} 
      </button>
      {showCounty ? <CountyLoader /> : <div>
        <DataLoader
          setDates={setDates}
          selectedDate={selectedDate} />
        <TimeTicker
          dates={dates}
          setSelectedDate={setSelectedDate}/>
        <Legend />
      </div>}
      <Controls />
      <Popup />
      

    </Map>
  )
}

export default App