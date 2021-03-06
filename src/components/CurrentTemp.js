// @flow
import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import Text from 'components/Text'
import UnitButton from './UnitButton'
import Context from '../context'
import WeatherIcon from './WeatherIcon'
import { fahrenheitToCelsius } from 'utils'

type Weather = any

type Props = {
	weather: Weather,
	temp: number,
}

function CurrentTemp({ weather, temp }: Props): React$Element<React$ElementType> {
	const { icon, main } = weather
	const { toggleUnit, isFahrenheit } = useContext(Context)
	const currentTemp = isFahrenheit ? temp : fahrenheitToCelsius(temp)

	return (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					width: '100%',
					justifyContent: 'center',
				}}
			>
				<WeatherIcon name={icon} description={main} />
				<View style={{ flexDirection: 'row' }}>
					<Text style={styles.temp}>{currentTemp ? currentTemp.toFixed(0) : 0}</Text>
					<View style={styles.btnContainers}>
						<UnitButton
							toggleUnit={toggleUnit}
							disabled={isFahrenheit}
							unit="F"
						/>
						<View style={styles.line} />
						<UnitButton
							toggleUnit={toggleUnit}
							disabled={!isFahrenheit}
							unit="C"
						/>
					</View>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 60,
		width: '100%',
	},
	temp: {
		fontSize: 72,
	},
	btnContainers: {
		flexDirection: 'row',
		marginLeft: 12,
		alignItems: 'center',
		height: 30,
		marginTop: 10,
	},
	line: {
		height: '70%',
		width: 1,
		backgroundColor: 'black',
		marginLeft: 10,
		marginRight: 8,
	},
	description: {
		fontSize: 12,
		letterSpacing: 0.5,
		marginTop: -15,
		opacity: 0.5,
	},
	center: {
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 30,
		marginTop: -10,
	},
})

export default CurrentTemp
