import {
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
} from 'react-native';
import React from 'react';
import {Agenda, AgendaEntry} from 'react-native-calendars';
import attends from '../../../assets/data/attends.json';

const ProgressScreen = () => {
  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <Pressable
        style={[styles.item, {height: reservation.height}]}
        // onPress={() => navigation.navigate("Modal", { id: reservation.id })}
        onPress={() => Alert.alert(reservation.name)}>
        <Text style={{fontSize, color}}>{reservation.name}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Progress</Text>
      </View>
      <Agenda
        items={attends}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
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
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default ProgressScreen;
