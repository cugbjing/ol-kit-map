## Project Description
Apply ol-kit to display and interact with COVID-19 dataset

To load the customized tab
(1) download the repo from ol-kit: https://github.com/MonsantoCo/ol-kit.git

(2) copy file from this repo into the ol-kit folder:
from: `ol-kit-map/src/utils/tabs.js` to: `ol-kit/src/Popup/PopupDefaultPage/tabs.js`

(3) change file under ol-kit folder
import and use `chartTab` function in `ol-kit/src/Popup/PopupDefaultPage/index.js`, make following modifications:
```import {chartTab, socialMediaTab, } from './tabs'```

add `{chartTab(attributes.historyData)}` in 'index.js'

(4) Add package dependency, add `"recharts": "^1.8.5"` in package.json

(5) Run `npm i, npm link, npm run build` under the `ol-kit` folder

(6) Run `npm link @bayer/ol-kit` under the `ol-kit-application` folder, and `npm run` to start the app

### Overview
- [ ] Two data layers
    * State Level Data Layer: pre-downloaded state level history data stored as src/data/state_history.json, data query website: https://covidtracking.com/api, data source: https://covidtracking.com/api/v1/states/daily.json
    * County Level Data Layer: live county data streamed from api source: https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=nyt&country_code=US&timelines=false

- [ ] Major features
    * A button to switch between state level and county level data layer
    * Provide basic map and data interactions, for instance, users can check attributes through popup window by clicking the region boundary
    * A time ticker to show choropleth map of states for different date, see Figure 1
    * Chart of showing daily number change for each state in the second tab of the popup window, see Figure 2
    * Live update of county data, see Figure 3


![Figure 1. Choropleth map with time ticker](/images/fig1.png)
Figure 1. Choropleth map with time ticker
<br/><br/>

![Figure 2. Historical data for state](/images/fig2.png)
Figure 2. Historical data for state
<br/><br/>

![Figure 3. Live stream data for county](/images/fig3.png)
Figure 3. Live stream data for county
