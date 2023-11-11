import { 
    WiDaySunny,
    WiDaySunnyOvercast,
    WiDayCloudyHigh,
    WiDayCloudy,
    WiCloudy,
    WiRainWind,
    WiRain,
    WiThunderstorm,
    WiSnow,
    WiRaindrops
 } from "react-icons/wi";

export default function WeatherIcon(props) {
    const { description } = props;

    const iconMap = {
        'clear sky': <WiDaySunny size={100} fill={"yellow"} />,
        'few clouds': <WiDaySunnyOvercast size={100} />,
        'broken clouds': <WiDayCloudyHigh size={100} color={"gray"} />,
        'scattered clouds': <WiCloudy size={100} color={"gray"} />,
        'shower rain': <WiRainWind size={100} color={"skyblue"} />,
        'rain': <WiRain size={100} color={"skyblue"} />,
        'moderate rain': <WiRain size={100} color={"skyblue"} />,
        'overcast clouds': <WiDayCloudy size={100} color={"gray"} />,
        'thunderstorm': <WiThunderstorm size={100} color={"gray"} />,
        'snow': <WiSnow size={100} color={"white"} />,
        'mist': <WiRaindrops size={100} color={"gray"} />
    }
    return (
        <>
            {iconMap[description] || <WiDayCloudyHigh size={100} color={"gray"} /> }
        </>
    );
};