import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import Avatar from '../../../assets/images/grandpa.jpg';
import FeatherIcon from 'react-native-vector-icons/Feather';

const SECTIONS = [
  {
    header: 'Profile',
    items: [
      {id: 'ID', label: 'Employee ID'},
      {id: 'First Name', label: 'First Name'},
      {id: 'Last Name', label: 'Last Name'},
      {id: 'Department', label: 'Department'},
      {id: 'Phone', label: 'Phone'},
      {id: 'Date of birth', label: 'Date of birth'},
      {id: 'Email', label: 'Email'},
    ],
  },
];

const ProfileScreen = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{flexDirection: 'row'}}>
          <FeatherIcon color="#fff" name="chevron-left" size={30} />
          <Text style={styles.textBack}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center'}}>
        <Image alt="" source={Avatar} style={styles.profileAvatar} />
        <Text style={styles.profileName}>Viet Cuong</Text>
      </View>
      {SECTIONS.map(({header, items}) => (
        <View style={styles.section} key={header}>
          <View style={styles.sectionBody}>
            {items.map(({id, label, icon, type, value}, index) => {
              return (
                <View
                  key={id}
                  style={[
                    styles.rowWrapper,
                    index === 0 && {borderTopWidth: 0},
                  ]}>
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>{label}</Text>

                    <View style={styles.rowSpacer} />

                    <Text>Ho Viet Cuong</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    width: '100%',
    backgroundColor: 'black',
    height: 150,
  },
  profileAvatar: {
    width: 140,
    height: 140,
    borderRadius: 9999,
    marginTop: -70,
  },
  textBack: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileName: {
    padding: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#090909',
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
});
export default ProfileScreen;
