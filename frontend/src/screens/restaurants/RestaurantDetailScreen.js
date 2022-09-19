/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, ImageBackground, Image, TouchableOpacity, Text, Modal } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { getDetail } from '../../api/RestaurantEndpoints'
import TextRegular from '../../components/TextRegular'
import TextSemiBold from '../../components/TextSemibold'
import { brandSecondary, flashStyle, flashTextStyle, brandPrimary } from '../../styles/GlobalStyles'
import ImageCardProd from '../../components/ImageCardProd'

export default function RestaurantDetailScreen ({ navigation, route }) {
  const [restaurant, setRestaurant] = useState({})

  useEffect(() => {
    async function fetchRestaurantDetail () {
      try {
        const fetchedRestaurant = await getDetail(route.params.id)
        setRestaurant(fetchedRestaurant)
      } catch (error) {
        showMessage({
          message: `There was an error while retrieving restaurants. ${error} `,
          type: 'error',
          style: flashStyle,
          titleStyle: flashTextStyle
        })
      }
    }
    fetchRestaurantDetail()
  }, [route])

  const [show, setShow] = useState(false)

  const renderHeader = () => {
    return (
      <View>
        <ImageBackground source={(restaurant?.heroImage) ? { uri: process.env.API_BASE_URL + '/' + restaurant.heroImage, cache: 'force-cache' } : undefined} style={styles.imageBackground}>
          <View style={styles.restaurantHeaderContainer}>
            <TextSemiBold textStyle={styles.textTitle}>{restaurant.name}</TextSemiBold>
            <Image style={styles.image} source={restaurant.logo ? { uri: process.env.API_BASE_URL + '/' + restaurant.logo, cache: 'force-cache' } : undefined} />
            <TextRegular textStyle={styles.description}>{restaurant.description}</TextRegular>
            <TextRegular textStyle={styles.description}>{restaurant.restaurantCategory ? restaurant.restaurantCategory.name : ''}</TextRegular>
            <TouchableOpacity style={styles.touchableCart} onPress={() => { setShow(true) }}>
              <View style={styles.shoppingCartButton}>
                <Text style={styles.cartStyle}> <b>CONFIRMAR PEDIDO</b> </Text>
              </View>
            </TouchableOpacity>
            <Modal
            transparent={true}
            visible={show}>
              <View>
                <TouchableOpacity style={styles.touchableCart} onPress={() => { setShow(true) }}>
                  <View style={{ flexDirection: 'row', marginTop: '23%', marginLeft: 40, marginRight: 40 }}>
                  <View style={styles.shoppingCartButton3}>
                     <Text style={styles.cartStyle2} onPress={() => { setShow(false) }}> <b>Volver</b> </Text>
                   </View>
                   <View style={styles.shoppingCartButton2}>
                     <Text style={styles.cartStyle2} onPress={() => {
                       navigation.navigate('RestaurantsScreen')
                     }}> <b>Confirmar</b> </Text>
                   </View>
                   </View>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </ImageBackground>
      </View>
    )
  }

  const renderProduct = ({ item }) => {
    return (
      <View>
      <ImageCardProd
        imageUri={item.image ? { uri: process.env.API_BASE_URL + '/' + item.image } : undefined}
        title={item.name}
        description={item.description}
        price={item.price}
      >
      </ImageCardProd>
  </View>
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
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyProductsList}
          style={styles.container}
          data={restaurant.products}
          renderItem={renderProduct}
          keyExtractor={item => item.id.toString()}
        />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: brandSecondary
  },
  restaurantHeaderContainer: {
    height: 300,
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
    width: 300,
    height: 50,
    borderRadius: 100
  },
  touchableCart: {
    marginTop: 10
  },
  cartStyle: {
    fontSize: 26,
    textAlign: 'center',
    marginTop: 7
  },
  cartStyle2: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 7
  },
  emergente: {
    flex: 1,
    backgroundColor: '#a7d1cf',
    opacity: '90%',
    margin: 100,
    marginTop: '20%',
    marginBottom: '20%',
    padding: 40,
    alignItems: 'center',
    borderRadius: 10
  },
  shoppingCartButton2: {
    backgroundColor: '#a7d1cf',
    width: 150,
    height: 50,
    borderRadius: 100,
    flex: 2,
    marginLeft: 20
  },
  shoppingCartButton3: {
    backgroundColor: '#a7d1cf',
    width: 150,
    height: 50,
    borderRadius: 100,
    flex: 2,
    marginRight: 20
  }
})
