/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList, View, Text, Animated, StatusBar } from 'react-native'
import { getAll } from '../../api/RestaurantEndpoints'
import { getPopular } from '../../api/TopProductEndpoints'
import ImageCard from '../../components/ImageCard'
import ImageCardTop, { size } from '../../components/ImageCardTop'
import TextSemiBold from '../../components/TextSemibold'
import TextRegular from '../../components/TextRegular'
import { showMessage } from 'react-native-flash-message'
import { brandBackground, brandPrimary, flashStyle, flashTextStyle } from '../../styles/GlobalStyles'

export default function RestaurantsScreen ({ navigation }) {
  // TODO: Create a state for storing the restaurants
  const [restaurants, setRestaurants] = useState([])
  const [topProduct, setTopProduct] = useState([])

  useEffect(() => {
    // TODO: Fetch all restaurants and set them to state.
    //      Notice that it is not required to be logged in.

    async function fetchRestaurants () {
      try {
        const fetchedRestaurants = await getAll()
        setRestaurants(fetchedRestaurants)
      } catch (error) {
        showMessage({
          message: `There was an error while retrieving restaurants. ${error}`,
          type: 'error',
          style: flashStyle,
          titleStyle: flashTextStyle
        })
      }
    }
    fetchRestaurants() // TODO: set restaurants to stateelse {r
  }, [])

  useEffect(() => {
    async function fetchTopProduct () {
      try {
        const fetchedTopProducts = await getPopular()
        setTopProduct(fetchedTopProducts)
      } catch (error) {
        showMessage({
          message: `There was an error while retrieving top products. ${error}`,
          type: 'error',
          style: flashStyle,
          titleStyle: flashTextStyle
        })
      }
    }
    fetchTopProduct()
  }, [])

  const renderTopProductHeader = () => {
    return (
      <View style={{ flex: 1, backgroundColor: brandBackground, padding: 10 }}>
        <View style={styles.containerTop}>
          <Text style={styles.topTitle}><b>Mejores productos de nuestros restaurantes</b></Text>
        </View>
          <StatusBar hidden />
          <Animated.FlatList
          style={{
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20
          }}
          data={topProduct}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          horizontal
          keyExtractor={item => item.id}
          pagingEnabled
          renderItem={({ item }) => {
            return <>
              <ImageCardTop
                imageUri={item.image ? { uri: process.env.API_BASE_URL + '/' + item.image } : undefined}
                title={item.name}
                price={item.price}
                restaurant={item.restaurant.name}
                onPress={() => {
                  navigation.navigate('RestaurantDetailScreen', { id: item.restaurantId })
                }}
             >
             </ImageCardTop>
            </>
          }}
          >
          </Animated.FlatList>
      </View>
    )
  }

  const renderRestaurant = ({ item }) => {
    return (
      <ImageCard
        imageUri={item.logo ? { uri: process.env.API_BASE_URL + '/' + item.logo } : undefined}
        title={item.name}
        onPress={() => {
          navigation.navigate('RestaurantDetailScreen', { id: item.id })
        }}
      >
        <TextRegular numberOfLines={2}>{item.description}</TextRegular>
        {item.averageServiceMinutes !== null &&
          <TextSemiBold>Avg. service time: <TextSemiBold textStyle={{ color: brandPrimary }}>{item.averageServiceMinutes} min.</TextSemiBold></TextSemiBold>
        }
        <TextSemiBold>Shipping: <TextSemiBold textStyle={{ color: brandPrimary }}>{item.shippingCosts.toFixed(2)}€</TextSemiBold></TextSemiBold>
      </ImageCard>
    )
  }

  return (
    <FlatList
      ListHeaderComponent={renderTopProductHeader}
      style={styles.container}
      data={restaurants}
      renderItem={renderRestaurant}
      keyExtractor={item => item.id.toString()}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  FRHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50
  },
  FRHeaderTopPopular: {
    justifyContent: 'center',
    height: 280,
    marginTop: 20,
    marginLeft: 380,
    marginRight: 380,
    marginBottom: 50,
    backgroundColor: '#a9a9a9',
    borderWidth: 5,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20
  },
  ImageTopProduct: {
    borderRadius: '2%',
    width: '100%',
    flex: 1,
    height: '100%',
    justifyContent: 'center'
  },
  ImageBackTopProduct: {
    width: '100%',
    height: '100%',
    borderRadius: '2%',
    flex: 1
  },
  TodosNuestrosRestaurantes: {
    backgroundColor: '#f0e68c',
    height: '10%'
  },
  TextoRest: {
    fontSize: '120%',
    marginTop: '0.5%',
    marginLeft: '4%'
  },
  MejoresProductos: {
    marginTop: '-7%',
    marginBottom: '10%',
    flex: 1
  },
  font2: {
    width: '100%',
    fontSize: '100%',
    textAlign: 'center',
    borderBottomWidth: '2%',
    borderTopWidth: '2%',
    borderLeftWidth: '2%',
    borderRightWidth: '2%',
    borderBottomRightRadius: '20%',
    borderTopRightRadius: '20%',
    borderBottomLeftRadius: '20%',
    borderTopLeftRadius: '20%',
    backgroundColor: '#f0e68c'
  },
  font: {
    fontSize: '140%',
    width: '100%',
    borderBottomRightRadius: '20%',
    borderTopRightRadius: '20%',
    marginTop: '5%',
    backgroundColor: '#f0e68c'
  },
  containerTop: {
    padding: '1%',
    alignItems: 'center',
    backgroundColor: '#a7d1cf',
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200
  },
  topTitle: {
    fontSize: size * 1.7
  }
})
