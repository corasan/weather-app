// @flow
import React, { useState, useEffect, useRef } from 'react'
import {
	View,
	SafeAreaView,
	Modal,
	TextInput,
	StyleSheet,
	ScrollView,
	TouchableWithoutFeedback,
	TouchableOpacity,
} from 'react-native'
import { Text, ButtonClose } from 'components'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDebounce } from 'hooks'
import { WeatherIcon } from 'components'
import { useAsyncStorage } from '@react-native-community/async-storage'
import { uniqBy } from 'lodash'
import { getWeatherByCity } from '../../api'
import ResultDetail from './ResultDetail'

type Props = {
	visible: boolean,
	close(): void,
}

export default function AddCity({ visible = true, close }: Props) {
	const [search, setSearch] = useState('')
	const [result, setResult] = useState(null)
	const [savedCities, setSavedCities] = useState([])
	const debouncedSearch = useDebounce(search, 700)
	const { setItem, getItem } = useAsyncStorage('@CloudMate:saved_cities')
	const searchInput: TextInput.propTypes = useRef(null)

	useEffect(() => {
		async function getCityWeather() {
			const res = await getWeatherByCity(debouncedSearch)
			setResult(res)
		}

		if (debouncedSearch) {
			getCityWeather()
		}

		return () => setResult(null)
	}, [debouncedSearch])

	useEffect(() => {
		async function fetchCitiesFromLocal() {
			const cities = await getItem()
			if (cities !== null) {
				setSavedCities(uniqBy(JSON.parse(cities)))
			}
		}

		fetchCitiesFromLocal()
	}, [])

	async function saveCity() {
		const cities = [...savedCities, result]
		await setItem(JSON.stringify(cities))
		setSavedCities(uniqBy(cities, 'name'))
		close()
	}

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
						<TouchableWithoutFeedback onPress={() => searchInput.current.focus()}>
							<View style={styles.inputContainer}>
								<TextInput
									style={styles.input}
									placeholder="Search"
									placeholderTextColor="#b8b8b8"
									value={search}
									onChangeText={setSearch}
									ref={searchInput}
								/>
								<TouchableOpacity>
									<AntDesign name="search1" size={25} />
								</TouchableOpacity>
							</View>
						</TouchableWithoutFeedback>

						{result?.weather && (
							<TouchableOpacity style={styles.result} onPress={() => saveCity()}>
								<Text style={{ fontSize: 22, marginBottom: 10 }}>{result?.name}</Text>
								<View style={styles.resultRow}>
									<WeatherIcon
										name={result?.weather[0]?.icon}
										description={result?.weather[0]?.description}
									/>
									<ResultDetail label="Current" value={result?.main?.temp} />
								</View>
							</TouchableOpacity>
						)}
					</View>
				</ScrollView>
			</SafeAreaView>
		</Modal>
	)
}

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
		flexDirection: 'row',
		marginTop: 20,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 8,
	},
	result: {
		paddingVertical: 20,
		paddingHorizontal: '5%',
		marginTop: 20,
		shadowColor: 'black',
		shadowOffset: { height: 1, width: 0 },
		shadowRadius: 3,
		shadowOpacity: 0.1,
		borderRadius: 10,
		width: '100%',
		backgroundColor: '#fff',
	},
	resultRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		flex: 1,
	},
	tempUnit: {
		fontSize: 14,
	},
	label: { fontSize: 12 },
})
