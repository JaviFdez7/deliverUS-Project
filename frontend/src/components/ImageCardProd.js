// import { Badge, Flex } from '@ant-design/react-native'
import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import TextSemiBold from './TextSemibold'
import TextRegular from './TextRegular'
import { brandBackground, brandPrimaryTap } from '../styles/GlobalStyles'

// Props: defaultImageUri: {uri: xxx}, imageUri: {uri: xxx}, onPress: () => {}, title: String, badgeText: String, touchable: boolean
// Style props: cardStyle, imageContainerStyle, imageStyle, bodyStyle, titleStyle
export default function ImageCard (props) {
  const [count, setCount] = useState(0)
  const renderImageCardBody = (props) => {
    return (
      <View style={styles.card} >
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={props.imageUri} />
        </View>
        <View style={styles.cardBody}>
            <TextSemiBold textStyle={styles.cardTitle}>{props.title}</TextSemiBold>
            <TextRegular numberOfLines={2}>{props.description}</TextRegular>
            <TextSemiBold>{props.price}€</TextSemiBold>
            {props.children}
            <Text style={{ marginTop: '2%' }}>
                <TouchableOpacity onPress={() => {
                  if (count === 0) {
                    setCount(count)
                  } else {
                    setCount(count - 1)
                  }
                }}>
                  <Image
                     style={{ width: 30, height: 30 }}
                     source={{ uri: 'https://images.emojiterra.com/google/android-nougat/512px/2796.png' }}/>
                </TouchableOpacity>
                 <Text style={{ fontSize: 20, textAlignVertical: 'top' }}>  {count}  </Text>
                <TouchableOpacity onPress={() => {
                  setCount(count + 1)
                }}>
                  <Image
                    style={{ width: 30, height: 30 }}
                    source={{ uri: 'https://cevipyme.es/Style%20Library/img/log-mas.png' }}/>
                </TouchableOpacity>
        </Text>
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
    marginTop: 20,
    height: 127,
    padding: 2,
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  imageContainer: {
    flex: 2
  },
  image: {
    height: 123,
    width: 123
  },
  cardBody: {
    padding: 5,
    flex: 4
  },
  cardTitle: {
    fontSize: 15
  }
})
