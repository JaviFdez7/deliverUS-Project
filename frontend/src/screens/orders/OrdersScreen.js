/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, FlatList, ScrollView } from 'react-native'
import ImageCard from '../../components/ImageCard'
import { getAll } from '../../api/OrderEndpoints'
import TextSemiBold from '../../components/TextSemibold'
import { brandPrimary, brandSecondary, flashStyle, flashTextStyle } from '../../styles/GlobalStyles'
import { showMessage } from 'react-native-flash-message'
import { AuthorizationContext } from '../../context/AuthorizationContext'

export default function OrdersScreen ({ navigation }) {
  const [orders, setOrders] = useState([])
  const { loggedInUser } = useContext(AuthorizationContext)

  useEffect(() => {
    async function fetchOrders () {
      try {
        const fetchedOrders = await getAll()
        setOrders(fetchedOrders)
      } catch (error) {
        showMessage({
          message: `There was an error while retrieving restaurants. ${error}`,
          type: 'error',
          style: flashStyle,
          titleStyle: flashTextStyle
        })
      }
    }
    if (loggedInUser) {
      fetchOrders()
    } else {
      setOrders(null)
    }
  }, [loggedInUser])

  const renderOrder = ({ item }) => {
    const date = Date(item.createdAt).toString().replace('GMT+0200 (hora de verano de Europa central)', '')
    return (
      <ScrollView>
        <ImageCard
          imageUri={item.restaurant.logo ? { uri: process.env.API_BASE_URL + '/' + item.restaurant.logo } : undefined}
          title={'Order number: ' + item.id}
          onPress={() => {
            navigation.navigate('OrderDetailScreen', { id: item.id })
          }}
        >
          <TextSemiBold>Restaurant: <TextSemiBold textStyle={{ color: brandPrimary }}>{item.restaurant.name}</TextSemiBold></TextSemiBold>
          <TextSemiBold>Date: <TextSemiBold textStyle={{ color: brandPrimary }}>{date}</TextSemiBold></TextSemiBold>
          {item.shippingCosts.toFixed(2) > 0 &&
          <TextSemiBold>Shipping Cost: <TextSemiBold textStyle={{ color: brandPrimary }}>{item.shippingCosts.toFixed(2)}€</TextSemiBold></TextSemiBold>
          }
          <TextSemiBold>Total: <TextSemiBold textStyle={{ color: brandPrimary }}>{item.price}€</TextSemiBold></TextSemiBold>
        </ImageCard>
      </ScrollView>
    )
  }
  return (
    <FlatList
      style={styles.container}
      data={orders}
      renderItem={renderOrder}
      keyExtractor={item => item.id.toString()}
    />/*,
    <View style={styles.container}>
            <TextSemiBold>FR5: Listing my confirmed orders</TextSemiBold>
            <TextRegular>A Customer will be able to check his/her confirmed orders, sorted from the most recent to the oldest.</TextRegular>
            <Pressable
                onPress={() => {
                  navigation.navigate('OrderDetailScreen', { id: Math.floor(Math.random() * 100) })
                }}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? brandPrimaryTap
                      : brandPrimary
                  },
                  styles.button
                ]}
            >
                <TextRegular textStyle={styles.text}>Go to Order Detail Screen</TextRegular>
            </Pressable>
        </View> */
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    borderRadius: 8,
    height: 40,
    margin: 12,
    padding: 10,
    width: '100%'
  },
  text: {
    fontSize: 16,
    color: brandSecondary,
    textAlign: 'center'
  }
})
