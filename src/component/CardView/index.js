import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import DumShirt from '../../assets/dumshirt.jpg'
import ICtelfon from '../../assets/telfon.png'
import ICWA from '../../assets/whatsapp.png'

const CardView = ({title, desc, price, img, onPress}) => {
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
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity>
              <Image source={ICtelfon} style={{width: 40, height: 40, marginRight: 20}} />
              </TouchableOpacity>
          <TouchableOpacity>
          <Image source={ICWA} style={{width: 40, height: 40}} />
          </TouchableOpacity>
               

            </View>
            <View style={{backgroundColor: 'white', height: 30, width: 100, marginTop: 5,
            borderWidth: 3  ,
            borderColor: '#D8EDFD'
          }}>
              <Text style={{color: 'black', textAlign: 'center', fontWeight: 'bold'}}>Prospek</Text>
            </View>
      </View>


     </View>

        
    </TouchableOpacity >
  )
}

export default CardView

const styles = StyleSheet.create({})