import React from 'react'
import { View, FlatList, TouchableOpacity, Text } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { useAppContext } from 'hooks'
import { uniqBy } from 'lodash'

export default function SavedCities({ savedCities }) {
  const { changeLocation, setCurrentLocation } = useAppContext()
  const data = uniqBy(savedCities, 'name')

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingVertical: 20, alignItems: 'center' }}>
        <Text style={[styles.text, { fontSize: 20, fontWeight: 'bold', marginBottom: 10 }]}>Saved cities</Text>
        {!!savedCities && savedCities.length > 0 && (
          <FlatList
            style={{ flex: 1, width: '100%' }}
            data={data}
            extraData={data}
            renderItem={({ item }) => {
              const { coord, name } = item
              return (
                <TouchableOpacity
                  onPress={() => changeLocation(coord?.lat, coord?.lon)}
                  style={styles.btn}
                >
                  <Text style={styles.text}>{name}</Text>
                </TouchableOpacity>
              )
            }}
            ListHeaderComponent={<TouchableOpacity
                onPress={setCurrentLocation}
                style={styles.btn}
              >
                <Text style={styles.text}>Current city</Text>
              </TouchableOpacity>
            }
            keyExtractor={(index, key) => key.toString()}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = {
  btn: {
    paddingVertical: 10,
    paddingLeft: '10%',
    width: '100%',
  },
  text: {
    fontFamily: 'Futura',
    fontSize: 18,
    letterSpacing: 0.5,
  },
}
