import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import HeaderSecondary from '../../component/Header/HeaderSecondary';
import Fire  from '../../config/Fire';
import DropDownPicker from 'react-native-dropdown-picker';


const ViewDataLeads = ({navigation, route}) => {

   const {data, uid} = route.params;
   console.log('itemlengkap', data);
   const [openStatus, setOpenStatus] = useState(false);
  const [valueStatus, setValueStatus] = useState(data.status);
    const [findSelf, setFindself] = useState({})
    const [openSource, setOpenSource] = useState(false);
    const [valueSource, setValueSource] = useState(data.source);
  const [datas, setDatas] = useState(data)

    console.log('vallstat', valueStatus);
    const [status, setStatus] = useState([
        {label: 'Prospek', value: 'Prospek',   },
        {label: 'Kualifikasi', value: 'Kualifikasi', },
        {label: 'Visit', value: 'Visit', },
        {label: 'Kebutuhan Terpenuhi', value: 'Kebutuhan Terpenuhi', },
        {label: 'Bandingkan Produk', value: 'Bandingkan Produk', },
        {label: 'BI Check', value: 'BI Check', },
        {label: 'Pengajuan', value: 'Pengajuan', },
        {label: 'Booking Fee', value: 'Booking Fee', },
        {label: 'null', value: 'null', },

        
      ]);

      const [source, setSource] = useState([
        {label: 'Exhibition', value: 'Exhibition',   },
        {label: 'Database', value: 'Database', },
        {label: 'FB/IG', value: 'FB/IG', },
        {label: 'Reference', value: 'Reference', },
        {label: 'Tim Digital', value: 'Tim Digital', },
        {label: 'Walk-In', value: 'Walk-In', },

       

        
      ]);

    const [inputan, setInput] = useState({
        name: data.name,
        status: data.status,
        phone: data.phone,
        whatsapp: data.whatsapp,
        tags: data.tags ? data.tags : "-",
        source: data.source,
        keterangan: data.source,


        
      })
      const [date, setDate] = useState(new Date())

      const [dateConfirm, setDateConfirm] = useState(data.date)

     
      const [open, setOpen] = useState(false)
      console.log('tanggal', dateConfirm);

    const gettoken = async () => {
       const getToken =  await AsyncStorage.getItem('@token')
       const getFindself =  await AsyncStorage.getItem('@findSelf')
       const getUID =  await AsyncStorage.getItem('@userid')
        const parseFindself = JSON.parse(getFindself)
        setFindself(parseFindself)
        console.log('getstor', getUID);
    }
    
    
    const handleConfirm = (currentDate) => {
        const tgl = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
        const bln = currentDate.getMonth() + 1 < 10 ? "0" + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1;
        var jdw = currentDate.getFullYear() + "/" + bln + "/" + tgl;
        console.log(jdw);
      
        setDateConfirm(jdw);
       
      };
  
const handleAdd = async () => {

    
   const getFindself =  await AsyncStorage.getItem('@findSelf')
   
   if(valueStatus == "Prospek") {
    var pipeline = "Awareness"
  }
  else if(valueStatus == "Kualifikasi" || valueStatus == "Visit" || valueStatus == "Kebutuhan Terpenuhi" ) {
    var pipeline = "Discovery"
  }
  else if(valueStatus == "Kirim Perhitungan" || valueStatus == "Bandingkan Produk") {
    var pipeline = "Evaluation"
  }
  else if(valueStatus == "BI Check" || valueStatus == "Pengajuan") {
    var pipeline = "Intent"

  }
 
  else if(valueStatus == "Booking Fee") {
    var pipeline = "Purchase"
  }
   else {
    var pipeline = "Null"
  }

console.log("pipeline", pipeline);

    const parseFindself = JSON.parse(getFindself)
    const data = {
        idLeads: datas.idLeads,
        idSales: uid,
        namaSales: parseFindself.nama,
        name: inputan.name,
        status: valueStatus,
        date: dateConfirm,
        phone: inputan.phone,
        whatsapp: inputan.whatsapp,
        source: valueSource,
        keterangan: inputan.keterangan ?  inputan.keterangan : "-",
        tags: inputan.tags,
        pipeline: pipeline


    }
    console.log('dataupdate', datas.idLeads);
    Fire.database()
    .ref('leads/' + datas.idLeads + '/')
    .update(data)
    .then((resDB) => {
      console.log('resdb', resDB);
        navigation.replace('MyTabs')
        alert('Berhasil Ubah Data')
    })
}


useEffect(() => {
    gettoken()
   
}, [])


  return (
    <>
    
    <View style={{flex: 1, backgroundColor: 'white'}}>
     <HeaderSecondary title={findSelf.nama}  />
   
     <View >
        <Text style={{color: 'black', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 20}}>View Data Leads</Text>
       
       <View style={{padding: 16}}>
      <TouchableOpacity style={{backgroundColor: '#F0F7FF', 
      height: 30, width:200, marginBottom: 20, alignSelf: 'center'
      }}
      onPress={() => setOpen(true)}>
        {dateConfirm !== "" ?
                    <Text style={{fontSize: 14, color: 'grey', textAlign: 'center'}}>{dateConfirm}</Text>
        :
        <Text style={{fontSize: 14, color: 'grey', textAlign: 'center'}}>Pilih Tanggal</Text>

    }
      </TouchableOpacity>
       <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 8,
              width: '80%',
              alignSelf: 'center',
              color: 'black'

            }}
            placeholderTextColor="grey" 
            placeholder="Customer Name"
           defaultValue={data.name}
            onChangeText={(e) => setInput({ ...inputan, name: e })}  
          />
           <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 8,
              width: '80%',
              alignSelf: 'center',
              color: 'black'

            }}
            placeholderTextColor="grey" 
            placeholder="Phone Number"
           defaultValue={data.phone}

            onChangeText={(e) => setInput({ ...inputan, phone: e })}  
          />
             <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
              width: '80%',
              alignSelf: 'center',
              color: 'black'

            }}
            placeholderTextColor="grey" 
           defaultValue={data.whatsapp}

            placeholder="No. WhatsApp (Isi tanpa 0 / 62)"
            onChangeText={(e) => setInput({ ...inputan, whatsapp: e })}  
          />
            <View style={{width: '80%', alignSelf: 'center'}}>

<DropDownPicker
placeholder="Silahkan pilih Source"
open={openSource}
value={valueSource}
items={source}
setOpen={setOpenSource}
setValue={setValueSource}
setItems={setSource}
style={{backgroundColor: '#F0F7FF', marginBottom: 50,flex: 1}}
/>
</View>


<View style={{width: '80%', alignSelf: 'center'}}>
 {openSource == false &&
   <DropDownPicker
   placeholder="Silahkan pilih Status"
   open={openStatus}
   value={valueStatus}
  
   items={status}
   setOpen={setOpenStatus}
   setValue={setValueStatus}
   setItems={setStatus}
   style={{backgroundColor: '#F0F7FF', marginBottom: 40,flex: 1}}
 />
 }

</View>
          <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
              width: '80%',
              alignSelf: 'center',
              color: 'black'

            }}
            placeholderTextColor="grey" 
            placeholder="Keterangan"
           defaultValue={data.keterangan}

            onChangeText={(e) => setInput({ ...inputan, keterangan: e })}  
          />
          <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
        
              width: '80%',
              alignSelf: 'center',
              color: 'black'

            }}
            placeholderTextColor="grey" 
            placeholder="Tags"
            defaultValue={data.tags}
            onChangeText={(e) => setInput({ ...inputan, tags: e })}  
          />

<TouchableOpacity onPress={handleAdd} style={{backgroundColor: '#78C5FF', width: '70%', height: 40,  marginBottom: 14, borderRadius: 8, marginTop: 15, alignSelf: 'center'}
}

>
        <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Ubah Data</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.push('AddAppointment', {
        data: data,
        uid: uid
    })} style={{backgroundColor: 'blue', width: '70%', height: 40,  marginBottom: 14, borderRadius: 8, marginTop: 8, alignSelf: 'center'}
}>
        <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Proses Appointment</Text>
    </TouchableOpacity>
       </View>


</View>

     
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
    </>
  )
}

export default ViewDataLeads

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        color: '#D8EDFD'
      },
})