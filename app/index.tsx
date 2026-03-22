import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Asset } from 'expo-asset';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import SettingsRow from './resources/SettingsRow';
import getTheme from './resources/style';

export default function Task2Screen() {
	const imageSource = require('./resources/profile.jpg');
	const { height: screenHeight } = useWindowDimensions();
	const { width: originalWidth, height: originalHeight } = Asset.fromModule(imageSource);
	const imageHeight = screenHeight * 0.3;
	const aspectRatio = originalWidth && originalHeight ? originalWidth / originalHeight : 1;
	const imageWidth = imageHeight * aspectRatio;
	const squircleSize = Math.min(imageWidth, imageHeight);
	const squircleRadius = squircleSize * 0.24;

	const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
	const [theme, setTheme] = useState(getTheme(themeMode));
	const style = StyleSheet.create({
		mainScreen: {
			flex: 1,
			padding: 20,
			backgroundColor: theme.colors.background,
		},
		input: {
			borderWidth: 1,
			borderColor: theme.colors.border,
			borderRadius: 5,
			padding: 10,
			marginBottom: 15,
			color: theme.colors.text,
		},
		inputBad: {
			borderWidth: 1,
			borderColor: theme.colors.borderError,
			borderRadius: 5,
			padding: 10,
			marginBottom: 5,
			color: theme.colors.text,
		},
		saveButton: {
			marginTop: 12,
			backgroundColor: theme.colors.primary,
			padding: 15,
			borderRadius: 5,
			alignItems: 'center',
		},
		saveButtonText: {
			color: 'white',
			fontWeight: 'bold',
		},
		titleText: {
			marginTop: 20,
			alignSelf: 'center',
			fontSize: 36,
			fontWeight: 'bold',
			color: theme.colors.text,
		},
		subtitleText: {
			marginTop: 10,
			alignSelf: 'center',
			fontSize: 18,
			color: theme.colors.text,
		},
		bioText: {
			marginTop: 20,
			alignSelf: 'center',
			fontSize: 16,
			textAlign: 'center',
			paddingHorizontal: 20,
			color: theme.colors.text,
		},
		infoContainer: {
			alignSelf: 'center',
			marginTop: 20,
			rowGap: 10,
		},
		infoText: {
			fontSize: 16,
			color: theme.colors.text,
		},
		errorText: {
			fontSize: 14,
			marginBottom: 10,
			color: theme.colors.borderError,
		},
		editContainer: {
			marginTop: 30,
			padding: 20,
			borderWidth: 1,
			borderColor: theme.colors.border,
			borderRadius: 10,
		},
		editTitleText: {
			fontSize: 18,
			fontWeight: 'bold',
			marginBottom: 10,
			color: theme.colors.text,
		},
		buttonEdit: {
			position: 'absolute',
			top: -16,
			right: -4,
			zIndex: 1,
			padding: 10,
		},
		profilePictureContainer: {
			height: squircleSize,
			width: squircleSize,
			borderRadius: squircleRadius,
			overflow: 'hidden',
			alignSelf: 'center',
		},
		profilePicture: {
			height: '100%',
			width: '100%',
		},
		counter: {
			alignSelf: 'flex-end',
			marginTop: -10,
			fontSize: 14,
			color: theme.colors.text,
			opacity: 0.6,
		},
		settingsRow: {
			marginTop: 30,
			paddingVertical: 15,
			paddingHorizontal: 20,
			borderWidth: 1,
			borderColor: theme.colors.border,
			borderRadius: 10,
			justifyContent: 'space-between',
		},
		settingsLabel: {
			fontSize: 16,
			color: theme.colors.text,
		},
		settingsValue: {
			fontSize: 16,
			color: theme.colors.text,
			marginLeft: 8,
		},
		settingsRowContent: {
			marginTop: 12,
			flexDirection: 'row',
			alignItems: 'center',
		},
	});

	const [name, setName] = useState('Grzegorz Widera');
	const [title, setTitle] = useState('Student informatyki');
	const [city, setCity] = useState('Dąbrowa Górnicza');
	const [bio, setBio] = useState('Passionate software developer with a love for creating innovative solutions. Experienced in various programming languages and frameworks, always eager to learn and grow in the tech industry.');
	const [email, setEmail] = useState('grzegorz.widera@student.wsb.edu.pl');

	const [editFieldsVisible, setEditFieldsVisible] = useState(false);

	const [editCache, setEditCache] = useState({ name, title, city, bio, email });
	const [editErrors, setEditErrors] = useState({ name: false, title: false, city: false, bio: false, email: false });

	const maxBioLength = 255;

	const [settings, setSettings] = useState({
		notifications: true,
		profileVisibility: false,
		lightTheme: true,
	});

	return (
		<ScrollView contentInsetAdjustmentBehavior="automatic"
			style={style.mainScreen}>
			<Pressable onPress={() => {
				if (editFieldsVisible) {
					setEditCache({ name, title, city, bio, email });
					setEditErrors({ name: false, title: false, city: false, bio: false, email: false });
				}
				setEditFieldsVisible(!editFieldsVisible);
			}} style={style.buttonEdit}>
				<MaterialIcons name="edit" size={36} color={theme.colors.text} />
			</Pressable>
			<View style={{ ...style.profilePictureContainer, height: imageHeight, width: imageWidth }}>
				<Image source={imageSource} resizeMode="cover" style={style.profilePicture} />
			</View>
			<Text style={style.titleText}>{name}</Text>
			<Text style={style.subtitleText}>Student informatyki</Text>
			{!editFieldsVisible && (
				<>
					<Text style={style.bioText}>{bio}</Text>
					<View style={style.infoContainer}>
						<Text style={style.infoText}>Miasto: {city}</Text>
						<Text style={style.infoText}>Kontakt: {email}</Text>
					</View>
				</>
			)}

			{editFieldsVisible && (
				<View style={style.editContainer}>
					<Text style={style.editTitleText}>Edytuj profil</Text>

					<Text style={style.infoText}>Imię i nazwisko:</Text>
					<TextInput id="name" value={editCache.name} onChangeText={(text) => {
						setEditCache({ ...editCache, name: text });
						setEditErrors({ ...editErrors, name: text.trim() === '' });
					}} style={editErrors.name ? style.inputBad : style.input} />
					{editErrors.name && <Text style={style.errorText}>Pole imię i nazwisko nie może być puste</Text>}

					<Text style={style.infoText}>Stanowisko:</Text>
					<TextInput id="title" value={editCache.title} onChangeText={(text) => {
						setEditCache({ ...editCache, title: text });
						setEditErrors({ ...editErrors, title: text.trim() === '' });
					}} style={editErrors.title ? style.inputBad : style.input} />
					{editErrors.title && <Text style={style.errorText}>Pole stanowisko nie może być puste</Text>}

					<Text style={style.infoText}>Email:</Text>
					<TextInput id="email" value={editCache.email} onChangeText={(text) => {
						setEditCache({ ...editCache, email: text });
						setEditErrors({ ...editErrors, email: !text.includes('@') });
					}} style={editErrors.email ? style.inputBad : style.input} />
					{editErrors.email && <Text style={style.errorText}>Email musi zawierać znak @</Text>}

					<Text style={style.infoText}>Miasto:</Text>
					<TextInput id="city" value={editCache.city} onChangeText={(text) => setEditCache({ ...editCache, city: text })} style={editErrors.city ? style.inputBad : style.input} />
					{editErrors.city && <Text style={style.errorText}>Pole miasto nie może być puste</Text>}

					<Text style={style.infoText}>Bio:</Text>
					<TextInput id="bio" value={editCache.bio} onChangeText={(text) => {
						setEditCache({ ...editCache, bio: text });
						setEditErrors({ ...editErrors, bio: text.length > maxBioLength });
					}} multiline style={editErrors.bio ? style.inputBad : style.input} />
					{editErrors.bio && <Text style={style.errorText}>Pole bio nie może przekraczać 255 znaków</Text>}
					<Text style={style.counter}>{editCache.bio.length}/{maxBioLength}</Text>

					<Pressable onPress={() => {
						if (Object.values(editErrors).some(error => error)) {
							// TODO: show error message
							return;
						}
						setName(editCache.name);
						setTitle(editCache.title);
						setCity(editCache.city);
						setBio(editCache.bio);
						setEmail(editCache.email);
						// TODO: show success message
					}} style={style.saveButton}>
						<Text style={style.saveButtonText}>Zapisz</Text>
					</Pressable>
				</View>
			)}

			<SettingsRow label="Otrzymuj powiadomienia" value={settings.notifications} text={settings.notifications ? 'Włączone' : 'Wyłączone'} onSet={(value) => setSettings({ ...settings, notifications: value })} style={style} />
			<SettingsRow label="Widoczność profilu" value={settings.profileVisibility} text={settings.profileVisibility ? 'Widoczny' : 'Prywatny'} onSet={(value) => setSettings({ ...settings, profileVisibility: value })} style={style} />
			<SettingsRow label="Motyw" value={settings.lightTheme} text={settings.lightTheme ? 'Jasny' : 'Ciemny'} onSet={(value) => {
				setSettings({ ...settings, lightTheme: value })
				const newMode = value ? 'light' : 'dark';
				setThemeMode(newMode);
				setTheme(getTheme(newMode));
			}} style={style} />
			{/* TODO: about app */}
		</ScrollView>
	);
}