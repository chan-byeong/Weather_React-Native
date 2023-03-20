//data props or redux로 전송.

{/* <ScrollView horizontal 
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
              <Text style={styles.temp}>{parseInteger(day.temp.day)}</Text>
              <Fontisto name={icons[day.weather[0].main]} size={68} color="black" />
            </View>
            
            
            <Text style={styles.description}>{day.weather[0].main}</Text>
            <Text style={styles.tinyText}>{day.weather[0].description}</Text>
          </View>})
        }

      </ScrollView> */}