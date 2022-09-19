/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, FlatList } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import ImageCard from '../../components/ImageCard'
import TextRegular from '../../components/TextRegular'
import TextSemiBold from '../../components/TextSemibold'
import { brandPrimary, brandSecondary, flashStyle, flashTextStyle } from '../../styles/GlobalStyles'
import { getDetailOrder } from '../../api/OrderEndpoints'

export default function OrderDetailScreen ({ navigation, route }) {
  const [order, setOrder] = useState({})

  useEffect(() => {
    async function fetchOrderDetail () {
      try {
        const fetchedOrderDetail = await getDetailOrder(route.params.id)
        setOrder(fetchedOrderDetail)
      } catch (error) {
        showMessage({
          message: `There was an error while retrieving order. ${error} `,
          type: 'error',
          style: flashStyle,
          titleStyle: flashTextStyle
        })
      }
    }
    fetchOrderDetail()
  }, [route])

  const renderOrderDetail = ({ item }) => {
    return (
      <ScrollView>
        <ImageCard
          imageUri={item.image ? { uri: process.env.API_BASE_URL + '/' + item.image } : undefined}
          title={item.name}
        >
          <TextRegular>{item.description}</TextRegular>
          <TextRegular>Quantity: <TextSemiBold>{item.OrderProducts.quantity}</TextSemiBold></TextRegular>
          <TextRegular>Unity price: <TextSemiBold textStyle={styles.price}>{item.OrderProducts.unityPrice.toFixed(2)}€</TextSemiBold></TextRegular>
          <TextRegular>Price: <TextSemiBold>{item.OrderProducts.quantity * item.OrderProducts.unityPrice}€</TextSemiBold></TextRegular>
        </ImageCard>
      </ScrollView>
    )
  }
  const renderEmptyProductsList = () => {
    return (
      <TextRegular textStyle={styles.emptyList}>
        This restaurant has no products yet.
      </TextRegular>
    )
  }

  return (
    <FlatList
      ListEmptyComponent={renderEmptyProductsList}
      data={order.products}
      renderItem={renderOrderDetail}
      keyExtractor={(item) => item.id.toString()}
      />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: brandSecondary
  },
  orderHeaderContainer: {
    height: 250,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'column',
    alignItems: 'center'
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  image: {
    height: 100,
    width: 100,
    margin: 10
  },
  description: {
    color: 'white'
  },
  textTitle: {
    fontSize: 20,
    color: 'white'
  },
  emptyList: {
    textAlign: 'center',
    padding: 50
  },
  button: {
    borderRadius: 8,
    height: 40,
    marginTop: 12,
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    color: brandSecondary,
    textAlign: 'center',
    marginLeft: 5
  },
  shoppingCartButton: {
    backgroundColor: brandPrimary,
    width: 200,
    height: 200,
    borderRadius: 100,
    position: 'absolute',
    padding: '30%'
  }
})
