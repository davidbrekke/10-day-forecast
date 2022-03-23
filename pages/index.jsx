import { useState } from 'react'
import axios from 'axios'

import Layout from '@components/layout'
import { isValidUSZipcode } from '@utils/isValidUSZipcode'

const App = () => {
  const [zipcode, setZipcode] = useState('')
  const [forecast, setForecast] = useState(null)

  const AWSEndpoint = `https://i627wdrol0.execute-api.us-east-1.amazonaws.com/forecast`

  const handleForecastSearch = async (e) => {
    e.preventDefault()
    if (zipcode === '') {
      setForecast('please enter a US zipcode')
      return
    }
    if (!isValidUSZipcode(zipcode)) {
      setForecast(`${zipcode} is not a valid US zipcode`)
      return
    }
    if (isValidUSZipcode(zipcode)) {
      const forecastData = await fetchForecast()
      setForecast(forecastData)
      setZipcode('')
    }
  }

  const fetchForecast = async () => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `${AWSEndpoint}?zipcode=${zipcode}`,
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log('response', data)
      return data
    } catch (error) {
      console.log('fetch forcast error')
      console.error(error)
    }
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-700 mt-10">
        10 day forecast
      </h1>
      <div className="flex flex-col items-center gap-4 p-4 rounded-xl shadow-xl bg-white bg-opacity-10">
        <h2 className="text-xl text-gray-600">search by zipcode</h2>
        <input
          className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
          type="text"
          placeholder="zipcode..."
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
        />
        <div
          className="bg-blue-400 hover:bg-blue-500 transition hover:scale-105 text-white w-min font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
          onClick={handleForecastSearch}
        >
          search
        </div>
      </div>
      {forecast && <div>{forecast}</div>}
    </Layout>
  )
}

export default App
