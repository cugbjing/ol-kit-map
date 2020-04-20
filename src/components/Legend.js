import React from 'react'
import styled from 'styled-components'

export const Container = styled.div`
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    margin: auto;
    margin-left: 10px;
    margin-bottom: 40px;
    padding-left: 10px;
    padding-top: 5px;
    justify-content: center;
    width: 140px;
    height: 200px;
    border-radius: 6px;
    background: white;
    opacity: .92;
  `

export const Range = styled.div`
    position: relative;
`

export const ColorBox = styled.div`
    width: 50px;
    margin: auto;
    width: 10px;
    height: 10px;
    display: inline-block;
    background-color: #ccc;
    position: absolute;
    left: 5px;
    top: 5px;
`

function Legend() {

    return (
        <Container className='_popup_boundary'>
            <Range>
                <input style={{ paddingLeft: '20px', textAlign: 'center' }} type="text" value="Legend" />
            </Range>
            <Range>
                <input style={{ marginLeft: '20px' }} type="text" value="0&ndash;50" />
                <ColorBox style={{ background: '#ffebee' }} />
            </Range>
            <Range>
                <input style={{ marginLeft: '20px' }} type="text" value="50&ndash;100" />
                <ColorBox style={{ background: 'rgba(239, 154, 154, 0.4)' }} />
            </Range>
            <Range>
                <input style={{ marginLeft: '20px' }} type="text" value="100&ndash;200" />
                <ColorBox style={{ background: 'rgba(229, 115, 115, 0.4)' }} />
            </Range>
            <Range>
                <input style={{ marginLeft: '20px' }} type="text" value="200&ndash;400" />
                <ColorBox style={{ background: 'rgba(239, 83, 80, 0.4)' }} />
            </Range>
            <Range>
                <input style={{ marginLeft: '20px' }} type="text" value="400&ndash;800" />
                <ColorBox style={{ background: 'rgba(244, 67, 54, 0.4)' }} />
            </Range>
            <Range>
                <input style={{ marginLeft: '20px' }} type="text" value="800&ndash;2000" />
                <ColorBox style={{ background: 'rgba(229, 57, 53, 0.4)' }} />
            </Range>
            <Range>
                <input style={{ marginLeft: '20px' }} type="text" value="2000&ndash;6000" />
                <ColorBox style={{ background: 'rgba(211, 47, 47, 0.5)' }} />
            </Range>
            <Range>
                <input style={{ marginLeft: '20px' }} type="text" value="6000&ndash;15000" />
                <ColorBox style={{ background: 'rgba(198, 40, 40, 0.6)' }} />
            </Range>
            <Range>
                <input style={{ marginLeft: '20px' }} type="text" value="15000+" />
                <ColorBox style={{ background: 'rgba(183, 28, 28, 0.7)' }} />
            </Range>
        </Container>
    )
}

export default Legend
