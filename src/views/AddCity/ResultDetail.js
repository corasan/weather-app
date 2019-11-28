// @flow
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'components'
import { useAppContext } from 'hooks'

type Props = {
  label: string,
  value?: number,
  isTemp?: boolean,
}

export default function ResultDetail({ value = 0, label, isTemp = true }: Props): React$Element<React$ElementType> {
  const { isFahrenheit } = useAppContext()

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {isTemp && (
          <>
            <Text style={{ fontSize: 30 }}>{value.toFixed(0)}</Text>
            <Text style={styles.tempUnit}> º{isFahrenheit ? 'F' : 'C'}</Text>
          </>
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
	tempUnit: {
		fontSize: 15,
	},
	label: { fontSize: 12 },
})
