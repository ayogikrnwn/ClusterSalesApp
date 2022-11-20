import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CardView from '../../component/CardView';
import CardViewAppointment from '../../component/CardView/CardViewAppointment';
import HeaderSecondary from '../../component/Header/HeaderSecondary';
import Fire  from '../../config/Fire';
import DatePicker from 'react-native-date-picker';



const Appointment = ({navigation}) => {

  const [allDataAppo, setAllDataAppo] = useState([])
  const [findSelf, setFindself] = useState({})
  const [uid, setUID] = useState("")
  const [inputan, setInput] = useState({
    nama: "",
  })
 
  const [date, setDate] = useState(new Date())
  const [dateConfirm, setDateConfirm] = useState("")
  const [dateCal, setDateCal] = useState(new Date())
  const [dateConfirmCal, setDateConfirmCal] = useState("")
  const [openCal, setOpenCal] = useState(false)
  const [dateConfirmAngka, setDateConfirmAngka] = useState("")

  const [dateConfirmCalAngka, setDateConfirmCalAngka] = useState("")

  const [open, setOpen] = useState(false)
  console.log('tanggal', dateConfirm);

  const handleConfirm = (currentDate) => {
      const tgl = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
      const bln = currentDate.getMonth() + 1 < 10 ? "0" + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1;
      var jdw = currentDate.getFullYear() + "/" + bln + "/" + tgl;
      console.log('confirm1', tgl);
    setDateConfirmAngka(tgl)
      setDateConfirm(jdw);
     
    };
    const handleConfirmCal = (currentDate) => {
      const tgl = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
      const bln = currentDate.getMonth() + 1 < 10 ? "0" + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1;
      var jdw = currentDate.getFullYear() + "/" + bln + "/" + tgl;
      console.log(jdw);
      console.log('confirm2', tgl);
      setDateConfirmCalAngka(tgl)
      setDateConfirmCal(jdw);
     
    };

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
          const tgllss = dateConfirmAngka < dateConfirmCalAngka
          console.log('gdg', dateConfirmAngka + dateConfirmCalAngka);
          console.log('hasil', datled.filter((e) => e.tgl == tgllss) );
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

handleClear = () => {
  setInput({
      nama : ""
  })
  setDateConfirm("")
  setDateConfirmCal("")
  setDateConfirmAngka("")
  setDateConfirmCalAngka("")

}

useEffect(() => {
  gettoken()
  getAppo()
}, [])

  return (
    <>
    
    <View style={{flex: 1, backgroundColor: 'white'}}>
     <HeaderSecondary title={findSelf.nama}  />
     <ScrollView>
     <View>
     <View style={{flexDirection: 'row'}}>
   
   
    <TouchableOpacity style={{width: 90, height: 40, 
        backgroundColor: '#78C5FF', marginTop: 5, marginLeft: 5,
        borderRadius: 5}}
        onPress={() => setOpen(true)}>
            <Text style={{textAlign: 'center', color: 'white', }}>{dateConfirm ? dateConfirm : "Pilih Tanggal Awal"}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 90, height: 40, 
        backgroundColor: '#78C5FF', marginTop: 5, marginLeft: 5,
        borderRadius: 5}}
        onPress={() => setOpenCal(true)}>
            <Text style={{textAlign: 'center', color: 'white', }} >{dateConfirmCal ? dateConfirmCal : "Pilih Tanggal Akhir"}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 40, height: 40, 
        backgroundColor: 'red', marginTop: 5, marginLeft: 5,
        borderRadius: 5}}
        onPress={handleClear}>
            <Text style={{textAlign: 'center', color: 'white', marginTop: 5}} >Clear</Text>
    </TouchableOpacity>
    </View>
   
    {(allDataAppo) && (inputan.nama == "") && (dateConfirm == "") ?
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

})
:
dateConfirm !== "" ?
allDataAppo.filter((e) => e.idSales == uid && e.tgl >= dateConfirmAngka && e.tgl <= dateConfirmCalAngka  ).map((item, index) => {
    return (
<CardViewAppointment 
data={item} 
onPress={() => navigation.push('ViewAppointment', {
    data: item,
    uid: uid
})}


/>
    )

})
:

allDataAppo.filter((e) => e.idSales == uid && e.name == inputan.nama).map((item, index) => {
    return (
<CardViewAppointment 
data={item} 
onPress={() => navigation.push('ViewAppointment', {
    data: item,
    uid: uid
})}


/>
    )

})

}


</View>
     </ScrollView>
    
    </View>
    <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
          handleConfirm(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
        <DatePicker
        modal
        open={openCal}
        date={dateCal}
        mode="date"
        onConfirm={(date) => {
          setOpenCal(false)
          setDateCal(date)
          handleConfirmCal(date)
        }}
        onCancel={() => {
          setOpenCal(false)
        }}
      />
    </>
  )
}

export default Appointment

const styles = StyleSheet.create({})