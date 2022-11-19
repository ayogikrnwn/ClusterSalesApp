import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ICMenu from '../../assets/menu.png'
import ICsearch from '../../assets/search.png'

const HeaderSecondary = ({title, desc, onPress, navigation}) => {
  return (
    <View style={{width: '100%', height: 71, backgroundColor: '#D8EDFD', paddingHorizontal: 18, 
    alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20}}>
  
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{fontSize: 16, color: 'black', fontWeight: '400', textAlign: 'center', fontWeight: 'bold' }}> Halo Sales, {title} </Text>
    </View>
   
    

    </View>
  )
}

export default HeaderSecondary

const styles = StyleSheet.create({})