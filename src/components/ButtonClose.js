import React from 'react'
import { TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

type Props = {
	size: number,
	onPress(): void,
}

export default function({ size = 26, onPress }: Props) {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				height: size + 10,
				width: size + 10,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<AntDesign size={size} name="close" />
		</TouchableOpacity>
	)
}
