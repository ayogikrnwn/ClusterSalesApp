/* eslint-disable prettier/prettier */
import {ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';

import axios from "axios"
import { APIUrl } from '../../context/APIUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainLogo from '../../assets/logoCluster.png'
import Fire from '../../config/Fire';

const Login = ({navigation}) => {
  const [inputan, setInput] = useState({
    email: "",
    password: "",
    
  })
  const [loading, setLoading]= useState(false)

  console.log('inputan', inputan);

  const handleLogin = async () => {
    setLoading(true);
  
    const prefix = "TKN"
    const uniquenumber = Math.floor(Math.random() * 1000000);
   const token = prefix + uniquenumber
  console.log('token', token);
  AsyncStorage.setItem('@token', token)
    Fire.auth()
      .signInWithEmailAndPassword(inputan.email, inputan.password)
      .then((res) => {
        setLoading(false);
        // setForm('reset');

        Fire.database()
          .ref(`users/${res.user.uid}/`)
          .once('value')
          .then((resDB) => {
           console.log('hasillogin', resDB.val());
       
            navigation.replace('MyTabs', {
              findSelf:  resDB.val(),
              uid: res.user.uid
            });

            AsyncStorage.setItem('@findSelf', 
              JSON.stringify(resDB.val()))

            AsyncStorage.setItem('@userid', res.user.uid)

          }
          
          )
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log('eror', errorMessage);
        setLoading(false);
        alert(errorMessage)
        // setLoading(false);
        // showMessage({
        //   message: errorMessage,
        //   type: 'default',
        //   backgroundColor: colors.error,
        //   color: colors.white,
        // });
      });
  // if(inputan.email == "admin@gmail.com" && inputan.password == "admin") {
  //     navigation.navigate('Home')
  
  //     console.log('token', token);
  // } else {
  //     alert('Email dan Password Salah!')
  // }
  }

  const handleRegister = async () => {
    
       navigation.navigate('Register')
      
   }
  
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 110,
        }}>
        <>
         
        <Image source={MainLogo} style={{width: 100, height: 100}} />
        <Text style={{color: '#D8EDFD', fontWeight: 'bold', fontSize: 16, marginBottom: 30, marginTop: 10,}}>Login Page</Text>
          <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 8,
              width: '70%',
              color: 'black'
            }}
            placeholderTextColor="grey" 
            placeholder="Email"
            onChangeText={(e) => setInput({ ...inputan, email: e })}  
          />
          <TextInput
           
            style={{
             backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 8,
              width: '70%',
              color: 'black'
            }}
            placeholderTextColor="grey" 
            placeholder="Password"
            onChangeText={(e) => setInput({ ...inputan, password: e })}  
            secureTextEntry
          />
       
       {loading ? 
       <ActivityIndicator size="large" color="black" />
       :
       <>

<TouchableOpacity style={{backgroundColor: '#78C5FF', width: '70%', height: 40,  marginBottom: 14, borderRadius: 8, marginTop: 30}} 
             onPress={handleLogin}
              >
        <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Login</Text>
    </TouchableOpacity>
    <Text style={{color: 'grey', fontSize: 16}}>Powered By Krnwn Tech</Text>

    {/* <TouchableOpacity style={{backgroundColor: '#78C5FF', width: '70%', height: 40,  marginBottom: 14, borderRadius: 8, marginTop: 30}} 
             onPress={handleRegister}
              >
        <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Register</Text>
    </TouchableOpacity> */}
       </>
      }
         
   

   
     

        </>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
