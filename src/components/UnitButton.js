// @flow
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Text from './Text'

type Props = {
	toggleUnit(): void,
	disabled: boolean,
	unit: string,
}

export default function({
	toggleUnit,
	disabled,
	unit,
}: Props): React$Element<React$ElementType> {
	return (
		<TouchableOpacity
			onPress={toggleUnit}
			disabled={disabled}
			style={{ opacity: !disabled ? 0.4 : 1 }}
		>
			<Text style={{ fontSize: 22 }}>{`º${unit}`}</Text>
		</TouchableOpacity>
	)
}
