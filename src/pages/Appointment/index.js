import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';
import CardView from '../../component/CardView';
import CardViewAppointment from '../../component/CardView/CardViewAppointment';
import HeaderSecondary from '../../component/Header/HeaderSecondary';
import Fire  from '../../config/Fire';

const Appointment = ({navigation}) => {

  const [allDataAppo, setAllDataAppo] = useState([])
  const [findSelf, setFindself] = useState({})
  const [uid, setUID] = useState("")


  const gettoken = async () => {
     const getToken =  await AsyncStorage.getItem('@token')
     const getFindself =  await AsyncStorage.getItem('@findSelf')
     const getUID =  await AsyncStorage.getItem('@userid')
      const parseFindself = JSON.parse(getFindself)
      setFindself(parseFindself)
      setUID(getUID)
      console.log('getstor', getUID);
  }
  





const getAppo = async () => {

  Fire.database()
  .ref('appointment/')
  .once('value')
  .then((resDB) => {
      const datled = []
      console.log('hasilleads', datled)
      const value = resDB.val()
      if (value) {
          Object.keys(value).map((item) => {
              datled.push(value[item]);
         
          });
          console.log('hasil', datled);
          setAllDataAppo(datled)
        
        }
  }
  )
}

const handleWA = (item) => {
  const OpenWA = 'http://wa.me/62' + item.whatsapp
   Linking.openURL(OpenWA).then((res) => {
      console.log('openWA', OpenWA);
   })
}

const handleTel = (item) => {
  const OpenTel = 'tel:' + item.phone
   Linking.openURL(OpenTel).then((res) => {
      console.log('opentel', OpenTel);
   })
}
useEffect(() => {
  gettoken()
  getAppo()
}, [])

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
     <HeaderSecondary title={findSelf.nama}  />
     <ScrollView>
     <View>
      {allDataAppo ?
  allDataAppo.filter((e) => e.idSales == uid).map((item, index) => {
return (
<CardViewAppointment
data={item}
onPress={() => navigation.push('ViewAppointment', {
  data: item,
  uid: uid
})}
/>
)
  }) :
  null
    }


</View>
     </ScrollView>
    
    </View>
  )
}

export default Appointment

const styles = StyleSheet.create({})