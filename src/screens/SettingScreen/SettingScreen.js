import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Avatar from '../../../assets/images/grandpa.jpg';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CustomButton from '../../component/CustomButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {user_logout} from '../../api/user_api';

const avatar_default =
  'https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg';

const SECTIONS = [
  {
    header: 'Preferences',
    items: [
      {id: 'language', icon: 'globe', label: 'Language', type: 'select'},
      {id: 'darkMode', icon: 'moon', label: 'Dark Mode', type: 'toggle'},
    ],
  },
  {
    header: 'Help',
    items: [
      {id: 'report', icon: 'flag', label: 'Report', type: 'link'},
      {id: 'contact', icon: 'mail', label: 'Contact Us', type: 'link'},
    ],
  },
  {
    header: 'Content',
    items: [
      {id: 'save', icon: 'save', label: 'Saved', type: 'link'},
      {id: 'download', icon: 'download', label: 'Downloads', type: 'link'},
    ],
  },
];

export default function SettingScreen() {
  const [form, setForm] = useState({
    language: 'English',
    darkMode: true,
    wifi: false,
  });

  const [firstName, setFirstName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    const getDataFromApi = async () => {
      AsyncStorage.getItem('FirstName').then(data => {
        setFirstName(data);
      });
      AsyncStorage.getItem('Avatar').then(data => {
        setAvatar(data);
      });
      AsyncStorage.getItem('Email').then(data => {
        setEmail(data);
      });
    };
    getDataFromApi();
    return () => {};
  }, []);

  const navigation = useNavigation();

  const onLogOutPressed = async () => {
    const isLogOut = await user_logout;
    if (isLogOut) {
      navigation.replace('SignIn');
    }
  };
  const onProfilePressed = () => {
    navigation.navigate('Profile');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.profile}>
        <Image
          alt=""
          source={{uri: `${avatar}` ? `${avatar}` : avatar_default}}
          style={styles.profileAvatar}
        />

        <Text style={styles.profileName}>{firstName}</Text>

        <Text style={styles.profileEmail}>{email}</Text>

        <TouchableOpacity onPress={onProfilePressed}>
          <View style={styles.profileAction}>
            <Text style={styles.profileActionText}>Profile</Text>
            <FeatherIcon color="#fff" name="edit" size={16} />
          </View>
        </TouchableOpacity>
      </View>

      {SECTIONS.map(({header, items}) => (
        <View style={styles.section} key={header}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{header}</Text>
          </View>
          <View style={styles.sectionBody}>
            {items.map(({id, label, icon, type, value}, index) => {
              return (
                <View
                  key={id}
                  style={[
                    styles.rowWrapper,
                    index === 0 && {borderTopWidth: 0},
                  ]}>
                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}>
                    <View style={styles.row}>
                      <FeatherIcon
                        color="#616161"
                        name={icon}
                        style={styles.rowIcon}
                        size={22}
                      />

                      <Text style={styles.rowLabel}>{label}</Text>

                      <View style={styles.rowSpacer} />

                      {type === 'select' && (
                        <Text style={styles.rowValue}>{form[id]}</Text>
                      )}

                      {type === 'toggle' && (
                        <Switch
                          onChange={val => setForm({...form, [id]: val})}
                          value={form[id]}
                        />
                      )}

                      {(type === 'select' || type === 'link') && (
                        <FeatherIcon
                          color="#ababab"
                          name="chevron-right"
                          size={22}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      ))}
      <View style={styles.sectionFooter}>
        <CustomButton text="Log out" onPress={onLogOutPressed} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  section: {
    paddingTop: 12,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a7a7a7',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
  },
  profile: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '600',
    color: '#090909',
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '400',
    color: '#848484',
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 24,
    height: 50,
  },
  rowWrapper: {
    paddingLeft: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
  },
  rowValue: {
    fontSize: 17,
    color: '#616161',
    marginRight: 4,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  sectionFooter: {
    flex: 1,
    alignItems: 'center',
  },
});
