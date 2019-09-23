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
import { Text } from '@components'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native-gesture-handler'
import useDebounce from '@hooks/useDebounce'
import { getWeatherByCity } from '../api'

type Props = {
	visible: boolean,
}

function AddCity({ visible = false }: Props) {
	const [search, setSearch] = useState('')
	const [isSearching, setIsSearching] = useState(false)
	const [main, setMain] = useState({})
  // const [called, setCalled] = useState(0)
  const debouncedSearch = useDebounce(search, 700)
	// const [locationService, setLocationService] = useState()

	console.log('debounce__', debouncedSearch);
	useEffect(() => {
		async function getCity() {
			const { main: mainObj } = await getWeatherByCity(debouncedSearch)
			setMain(mainObj)
    }


		if (debouncedSearch) {
      getCity()
    }
	}, [debouncedSearch, search])

	return (
		<Modal visible={visible} animationType="slide">
			<ScrollView>
				<SafeAreaView style={{ flex: 1 }}>
					<View style={{ paddingHorizontal: '6%', paddingTop: '10%', flex: 1 }}>
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
								<AntDesign name="search1" size={25} style={styles.search} />
							</TouchableOpacity>

						</View>

						<Text>{main?.temp}</Text>
					</View>
				</SafeAreaView>
			</ScrollView>
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
		flex: 1,
	},
})
