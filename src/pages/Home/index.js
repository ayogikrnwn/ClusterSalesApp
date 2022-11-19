import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CardView from '../../component/CardView';
import HeaderSecondary from '../../component/Header/HeaderSecondary';
import { FAB } from 'react-native-paper';


const Home = ({navigation}) => {

    const [allProducts, setAllProducts] = useState([])
    
    const gettoken = async () => {
       const getStorage =  await AsyncStorage.getItem('@token')
        console.log('getstor', getStorage);
    }
    
    
const getProducts = async () => {
    
    try {
        await axios.get('https://fakestoreapi.com/products', {

        }).then((res) => {
            console.log('response', res.data);
            const responseprod = res.data
            const filterCloth = responseprod.filter((e) => e.category == "men's clothing")
            setAllProducts(responseprod)
        })
    } catch (error) {
        console.log('err', error);
    }
    
}
  
const handleLogout = async () => {
    await AsyncStorage.clear()
    navigation.replace('Splash')
}
useEffect(() => {
    gettoken()
    getProducts()
}, [])


  return (
    <>
    
    <View style={{flex: 1, backgroundColor: 'white'}}>
     <HeaderSecondary title="Products" onPress={handleLogout} />
     <ScrollView>
     <View>
<CardView />
<CardView />
<CardView />
</View>
     </ScrollView>
     <FAB
    label="Tambah data"
    style={styles.fab}
    onPress={handleLogout}
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