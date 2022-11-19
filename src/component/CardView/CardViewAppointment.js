import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import DumShirt from '../../assets/dumshirt.jpg'
import ICtelfon from '../../assets/telfon.png'
import ICWA from '../../assets/whatsapp.png'

const CardViewAppointment = ({title, desc, price, img, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{backgroundColor: 'white', width: '90%', height: 90,
     marginTop: 10, shadowColor: "#000",
     alignSelf: 'center',
     borderBottomWidth: 1,
     borderBottomColor: '#D8EDFD'
   }}>
     <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>Konsumen A</Text>
        <Text style={{color: 'black', fontSize: 14, marginTop: 5}}>+621212121</Text>
        <Text style={{color: 'black', fontSize: 14, marginTop: 5}}>22-Nov-2022</Text>

      </View>

      <View>
           
            <View style={{backgroundColor: 'white', height: 30, width: 100, marginTop: 5,
  
            backgroundColor: 'green',
      
          }}>
              <Text style={{color: 'black', textAlign: 'center', fontWeight: 'bold', color: 'white'}}>BI Check</Text>
            </View>
            <View style={{backgroundColor: 'white', height: 30, width: 100, marginTop: 5,
           backgroundColor: 'green',
          }}>
              <Text style={{color: 'black', textAlign: 'center', fontWeight: 'bold', color: 'white'}}>Show</Text>
            </View>
      </View>


     </View>

        
    </TouchableOpacity >
  )
}

export default CardViewAppointment

const styles = StyleSheet.create({})