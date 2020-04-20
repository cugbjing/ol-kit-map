## Project Description
Apply ol-kit to display and interact with COVID-19 dataset
** Note ** Need to link with the `mapathon` branch from https://github.com/cugbjing/ol-kit to be able to display the historical data chart in the popup tab

### Overview
- [ ] Two data layers
    - [ ] State Level Data Layer: pre-downloaded state level history data stored under src/data folder, data source: https://covidtracking.com/api
    - [ ] County Level Data Layer: live county data streamed from api source: https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=nyt&country_code=US&timelines=false

- [ ] Major features
    - [ ] A button to switch between state level and county level data layer
    - [ ] Provide basic map and data interactions, for instance, users can check attributes through popup window by clicking the region boundary
    - [ ] A time ticker to show choropleth map of states for different date 
    - [ ] Chart of showing daily number change for each state in the second tab of the popup window, see Figure 