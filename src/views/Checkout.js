import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import products from '../database/products'
import Table from 'react-native-simple-table'

const columns = [
  {
    title: '',
    dataIndex: '',
    width: 105
  },
  {
    title: 'PickUp',
    dataIndex: 'pickUp',
    width: 140
  },
  {
    title: 'DoorToDoor',
    dataIndex: 'doorToDoor'
  }
];

export default function CheckoutScreen(props) {

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Estimated Order Summary For Nigeria</Text>
      <Text style={styles.caution}>After login, Order total may vary based on your shipping address</Text>
      <View style={styles.main}>
        <Table height={320} columnWidth={100} columns={columns} dataSource={products} />
      </View>
      <View>
        <Button
          color="#e65100"
          title="Continue"
          onPress={() => props.navigation.navigate('Checkout')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  main: {
    flex: 1
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10
  },
  caution: {
    fontSize: 15,
    textAlign: 'center',
    color: 'red',
    paddingBottom: 10
  }
})
