import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CardView from '../../component/CardView';
import CardViewAppointment from '../../component/CardView/CardViewAppointment';
import HeaderSecondary from '../../component/Header/HeaderSecondary';

const Appointment = ({navigation}) => {

   

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
     <HeaderSecondary title="Products"  />
     <ScrollView>
     <View>
<CardViewAppointment />

</View>
     </ScrollView>
    
    </View>
  )
}

export default Appointment

const styles = StyleSheet.create({})