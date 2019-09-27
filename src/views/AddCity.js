// @flow
import React, { useState, useEffect } from 'react'
import {
	View,
	SafeAreaView,
	Modal,
	TextInput,
	StyleSheet,
	ScrollView,
} from 'react-native'
import { Text, ButtonClose } from 'components'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDebounce } from 'hooks'
import { getWeatherByCity } from '../api'
import { WeatherIcon } from 'components'
import { useAppContext } from 'hooks'

type Props = {
	visible: boolean,
	close(): void,
}

function AddCity({ visible = true, close }: Props) {
	const [search, setSearch] = useState('')
	const [result: {}, setResult] = useState(null)
	const [temp, setTemp] = useState(0)
	const debouncedSearch = useDebounce(search, 700)
	const { isFahrenheit } = useAppContext()

	useEffect(() => {
		async function getCity() {
			const res = await getWeatherByCity(debouncedSearch)
			console.log(res)
			setResult(res)
			setTemp(res?.main?.temp)
		}

		if (debouncedSearch) {
			getCity()
		}

		return () => setResult(null)
	}, [debouncedSearch])

	function onClose() {
		setSearch('')
		setResult(null)
		close()
	}

	return (
		<Modal visible={visible} animationType="slide">
			<SafeAreaView style={{ flex: 1 }}>
				<ScrollView scrollEnabled={false}>
					<View style={{ flex: 1, paddingHorizontal: '6%', height: '100%' }}>
						<View style={{ alignItems: 'flex-end' }}>
							<ButtonClose onPress={onClose} />
						</View>
						<Text style={styles.title}>Add a city</Text>
						<View style={styles.inputContainer}>
							<TextInput
								style={styles.input}
								placeholder="Search"
								placeholderTextColor="#b8b8b8"
								value={search}
								onChangeText={setSearch}
							/>
							<TouchableOpacity>
								<AntDesign name="search1" size={25} />
							</TouchableOpacity>
						</View>

						{result && (
							<View style={styles.result}>
								<WeatherIcon
									name={result?.weather[0].icon}
									description={result?.weather[0].description}
								/>
								<View style={{ flexDirection: 'row' }}>
									<Text>{temp.toFixed(0)}</Text>
									<Text style={styles.tempUnit}> º{isFahrenheit ? 'F' : 'C'}</Text>
								</View>
							</View>
						)}
					</View>
				</ScrollView>
			</SafeAreaView>
		</Modal>
	)
}

export default AddCity

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	input: {
		fontSize: 20,
		flex: 1,
	},
	inputContainer: {
		borderRadius: 14,
		backgroundColor: '#f2f2f2',
		paddingHorizontal: '5%',
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 8,
	},
	result: {
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 12,
		flexDirection: 'row',
	},
	tempUnit: {
		fontSize: 14,
	},
})
