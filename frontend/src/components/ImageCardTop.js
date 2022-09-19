// import { Badge, Flex } from '@ant-design/react-native'
import React from 'react'
import { Image, Pressable, StyleSheet, View, Dimensions, Text } from 'react-native'
import TextSemiBold from './TextSemibold'
import { brandBackground, brandPrimaryTap, brandPrimary } from '../styles/GlobalStyles'

// Props: defaultImageUri: {uri: xxx}, imageUri: {uri: xxx}, onPress: () => {}, title: String, badgeText: String, touchable: boolean
// Style props: cardStyle, imageContainerStyle, imageStyle, bodyStyle, titleStyle
const { width } = Dimensions.get('window')
const imageW = width * 0.31
const imageH = imageW * 0.8
const containerI = imageH * 1.25
export const size = width * 0.021

export default function ImageCardTop (props) {
  const renderImageCardBody = (props) => {
    return (
        <View style={styles.card} >
          <View style={StyleSheet.absoluteFillObject} >
            <Image source={props.imageUri} style={StyleSheet.absoluteFillObject} blurRadius={10}/>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={props.imageUri} />
          </View>
          <View style={styles.cardBody}>
              <TextSemiBold textStyle={styles.cardTitle}>{props.title}  -  Precio: <Text style={{ color: brandPrimaryTap }}>{props.price}€</Text><br/><Text style={{ color: brandPrimary }}>{props.restaurant}</Text>
              </TextSemiBold>
              {props.children}
          </View>
        </View>
    )
  }

  return (
    props.onPress
      ? <Pressable onPress={props.onPress} style={({ pressed }) => [
        {
          backgroundColor: pressed
            ? brandPrimaryTap
            : brandBackground
        },
        styles.wrapperCustom
      ]}>
          {renderImageCardBody(props)}
        </Pressable>
      : <>
          {renderImageCardBody(props)}
        </>
  )
}

const styles = StyleSheet.create({
  card: {
    height: containerI,
    padding: '3%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width
  },
  imageContainer: {
    flex: 2,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 30,
    shadowOffset: {
      height: 10,
      width: 10
    },
    borderRadius: 16
  },
  image: {
    height: imageH,
    width: imageW,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
    borderRadius: 16

  },
  cardBody: {
    marginRight: '19%',
    marginLeft: '29%',
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
    backgroundColor: '#fff',
    borderRadius: 16,
    opacity: '80%'
  },
  cardTitle: {
    fontSize: size,
    padding: '3%'
  }
})
