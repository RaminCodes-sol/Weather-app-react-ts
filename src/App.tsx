import { useState } from "react"
import axios from "axios"
import { TbTemperatureFahrenheit } from "react-icons/tb"



type DataType= {
  name: 'string';
  main: {
    temp: number;
    feels_like: number;
    humidity: number
  };
  weather: [{
    main: string
  }];
  wind: {
    speed: number;
  }

}

const App = () => {
  const [location, setLocation] = useState('')
  const [data, setData] = useState({} as DataType)
  const [loading, setLoading] = useState(false)


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=752c125b845787b05ad3875691b669a9`


  /*-------Get-Weather-------*/
  const getWeather = () => {
    setLoading(true)
   try {
    axios.get(url).then(response => {
      setData(response.data)
      setLoading(false)
      console.log(response.data)
    })
   } catch (error) {
    alert('error')
    setLoading(false)
   }
    setLocation('')
  }


  /*-------Handle-Submit-------*/
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getWeather()
  }


  return (
    <main className={`w-full h-screen`}>

      <section className="w-full max-w-[450px] mx-auto flex justify-center items-center flex-col px-3">
        
        {/*-------Search-Input-------*/}
        <div className="w-full py-5 mb-6">
          <form className="flex" onSubmit={handleSubmit}>
            <input type='text' placeholder="location..." value={location} onChange={e => setLocation(e.target.value)} className="flex-1 px-2 py-3 outline-none border-none"/>
            <button className="bg-orange-500 px-6 transition-colors hover:bg-orange-600 text-white">Go</button>
          </form>
        </div>

        {/*-------All-Details-------*/}
        {
          loading 
            ? <h1 className="text-center text-white text-xl">Loading...</h1> 
            : (
                data.name !== undefined && (
                  <>
                    {/*-------Details-------*/}
                    <div className="w-full justify-between text-white flex py-5 mb-7 text-2xl">
                      <p>{data.name}</p>
                      {data.main && <p className="flex items-center gap-1">{data.main?.temp}<TbTemperatureFahrenheit/></p>}
                      {data.weather && <p>{data.weather[0].main}</p>}
                    </div>

                    {/*-------Details-------*/}
                    <div className="w-full justify-between text-white flex py-5 text-2xl">
                      <div>
                        <p>{data.main && data.main?.feels_like}</p>
                        <span className="text-sm">Feels Like</span>
                      </div>
                      <div>
                        <p>{data.main && data.main?.humidity}</p>
                        <span className="text-sm">Humidity</span>
                      </div>
                      <div>
                        <p>{data.wind && data.wind.speed} MPH</p>
                        <span className="text-sm">Wind Speed</span>
                      </div>
                    </div>
                  </>
                )
              )
        }

      </section>

    </main>
  )
}

export default App
