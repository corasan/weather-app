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
import { Text, ButtonClose } from '@components'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native-gesture-handler'
import useDebounce from '@hooks/useDebounce'
import { getWeatherByCity } from '../api'

type Props = {
	visible: boolean,
	close(): void,
}

function AddCity({ visible = true, close }: Props) {
	const [search, setSearch] = useState('')
	const [main, setMain] = useState({})
	const debouncedSearch = useDebounce(search, 700)

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
			<SafeAreaView style={{ flex: 1 }}>
				<ScrollView scrollEnabled={false}>
					<View style={{ flex: 1, paddingHorizontal: '6%', height: '100%' }}>
						<View style={{ alignItems: 'flex-end' }}>
							<ButtonClose
								onPress={() => {
									setSearch('')
									close()
								}}
							/>
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
								<AntDesign name="search1" size={25} style={styles.search} />
							</TouchableOpacity>
						</View>
						<View>
							<Text>{main?.temp}</Text>
						</View>
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
})
