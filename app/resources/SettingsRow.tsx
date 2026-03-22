import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, Text, View } from 'react-native';

export default function SettingsRow({ label, value, text, onSet, style }: { label: string; value: boolean; text: string; onSet: (value: boolean) => void; style: any }) {
	return (
		<View style={style.settingsRow}>
			<Text style={style.settingsLabel}>{label}</Text>
			<Pressable onPress={() => onSet(!value)} style={style.settingsRowContent}>
				{value ? <MaterialIcons name="check-box" size={24} color={style.infoText.color} /> : <MaterialIcons name="check-box-outline-blank" size={24} color={style.infoText.color} />}
				<Text style={style.settingsValue}>
					{text}
				</Text>
			</Pressable>
		</View>
	);
}