import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts'
import Paper from '@material-ui/core/Paper'
import React from 'react'
export const chartTab = (data) => {
    return (
        <div title={'Historical Data'}>
            <Paper>
                <LineChart
                    width={280}
                    height={200}
                    data={data}
                    margin={{
                        top: 10, right: 30, left: 5, bottom: 5,
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="positive" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="hospitalized" stroke="#82ca9d" />
                </LineChart>
            </Paper>
        </div>
    )
}

export const socialMediaTab = (data) => {
    console.log('received data', data)

    return (
        <div title={'Sentiment Over Time'} style={{ weidth: '200px', height: '400px', overflowY: 'scroll' }}>
            <img 
                src={ data.timeseries}
                width="300"
                key={ 0 }
                style={{ margin: '2px'}}
                alt=""/>
            <img 
                src={ data.word_cloud}
                width="300"
                key={ 0 }
                style={{ margin: '2px'}}
                alt=""/>
        </div>
    )
}