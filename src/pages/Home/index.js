import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';
import CardView from '../../component/CardView';
import HeaderSecondary from '../../component/Header/HeaderSecondary';
import { FAB } from 'react-native-paper';
import Fire  from '../../config/Fire';

const Home = ({navigation, route}) => {

    const [allDataLeads, setAllDataLeads] = useState([])
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
    

  
const handleLogout = async () => {
    await AsyncStorage.clear()
    navigation.replace('Splash')
}

const handleAdd = async () => {
 
    navigation.push('AddLeads', {
        uid: uid
    })
}


const getLeads = async () => {
 
    Fire.database()
    .ref('leads/')
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
            setAllDataLeads(datled)
          
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
    getLeads()
}, [])


  return (
    <>
    
    <View style={{flex: 1, backgroundColor: 'white'}}>
     <HeaderSecondary title={findSelf.nama}  />
     <ScrollView>
     <View>

{allDataLeads ?
allDataLeads.filter((e) => e.idSales == uid).map((item, index) => {
    return (
<CardView 
data={item} 
onPress={() => navigation.push('ViewLeads', {
    data: item,
    uid: uid
})}
onPressWA={() => handleWA(item)}
onPressTel={() => handleTel(item)}

/>
    )

})
:
null
}


</View>
     </ScrollView>
     <FAB
    label="Tambah data"
    style={styles.fab}
    onPress={handleAdd}
  />
    </View>
   
    </>
  )
}

export default Home

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        color: '#D8EDFD'
      },
})