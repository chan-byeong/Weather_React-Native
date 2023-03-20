import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import {Iconicons,Fontisto,Ionicons,EvilIcons   } from '@expo/vector-icons';
import { useState ,useEffect } from 'react';
import { ScrollView,Dimensions ,StyleSheet, Text, View, ActivityIndicator } from 'react-native';


const { width:SCREEN_WIDTH } = Dimensions.get('window');

const API_KEY = "bc9082e2e0036abb93a752281b9d5fba";

const icons = {
  Clear: "day-sunny",
  Clouds: "cloudy",
  Rain: "rain",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Drizzle: "day-rain",
  Thunderstorm: "lightning",
}

export default function App() {
  const [city,setCity] = useState();
  const [location, setLocation] = useState();
  const [days , setDays] = useState([]);
  const [ok,setOk] = useState(true);

  let date = new Date();
  let Month = date.getMonth() + 1;
  let day = date.getDate();
  const week = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let dayOfWeek = week[date.getDay()];


  //console.log(days[0].temp);

  const ask = async () => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted) setOk(false);
    const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps:false});
    setCity(location[0].city);

    //weather api fetch
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    setDays(json.daily);
    console.log(days);
  }

  
  useEffect(() => {
    ask();
  },[])

  return (
    <View style={styles.container}>
      <View style={{...styles.city , flex:1}}>
        <Ionicons style={{justifyContent:"flex-start"}} name="ios-menu-outline" size={24} color="black" />
        <Text style={styles.cityName}>{city}</Text>
      </View>

      {/* Today */}
      <View style={{flex:6}}>
        <Text>{Month}{day}{dayOfWeek}</Text>
        <View style={styles.day}>
            <View style={{flexDirection:"row" , 
            width:"100%", justifyContent:"space-between",
            }}>
              <Text style={styles.temp}>{parseInt(days[0].temp.day)}</Text>
              <Fontisto name={icons[days[0].weather[0].main]} size={68} color="black" />
            </View>
  
            <Text style={styles.description}>{days[0].weather[0].main}</Text>
            <Text>Daily Summary</Text>
            <Text style={styles.tinyText}>{days[0].weather[0].description}</Text>
            
            <View style={{flexDirection:"row",backgroundColor:"black"}}>
              <View>
                <Text>최고기온</Text>
                <Text>{parseInt(days[0].temp.min)}</Text>
              </View>
              <View>
                <Text>최저기온</Text>
                <Text>{parseInt(days[0].temp.max)}</Text>
              </View>
              <View>
                <Ionicons name="md-water-sharp" size={24} color="black" />
                <Text>{days[0].humidity}%</Text>  
              </View>
              
            </View>
          </View>
      </View>

     {/* Weekly forecast */}
      <View style={{flex:2}}>
        <View style={{flexDirection:"row" , width:"100%" , justifyContent:"space-between"}}>
          <EvilIcons name="arrow-right" size={24} color="black" />
          <Text>Weeklyforecast</Text>
        </View>
        <ScrollView horizontal 
        contentContainerStyle={styles.weather}
        pagingEnabled showsHorizontalScrollIndicator="false"
        >
          {days.length === 0 ? 
          <View style={{...styles.day , alignItems:"center"}}> 
            <ActivityIndicator color="white" size="large"/>
          </View>:
          days.map((day,idx) =>{
            <View key={idx} style={styles.day}>
              <View style={{flexDirection:"row" , 
              width:"100%", justifyContent:"space-between",
              }}>
                <Text style={styles.temp}>{parseInt(day.temp.day)}</Text>
                <Fontisto name={icons[day.weather[0].main]} size={68} color="black" />
              </View>
    
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>})
          }
        </ScrollView>
      </View>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#42C6FF',
  },
  city : {
    flex:1,
    flexDirection :"row",
    justifyContent: "center",
    alignItems:"center",
  },
  cityName : {
    color : "black",
    fontSize : 38,
    fontWeight: '600',
  }
  ,weather : {
    backgroundColor : "#42C6FF"
  },
  day : {
    width : SCREEN_WIDTH,
    alignItems: "center",
  },
  temp :{
    marginTop: 20,
    fontSize : 170,
  },
  description : {
    fontSize : 68,
  },
  tinyText : {
    fontSize : 25,
  }
});
