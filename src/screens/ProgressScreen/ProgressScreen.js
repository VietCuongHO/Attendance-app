import {View, Text, StyleSheet, Alert, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Agenda, AgendaEntry} from 'react-native-calendars';
import {ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {user_login} from '../../api/user_api';
import {useAuth} from '../../context';
import { BASE_URL } from '../../config';

const apiURL = 'http://10.0.2.2:8000/api/attendance';

function processData(timesheet) {
  var data = timesheet.data;
  var arr = {};
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentMY = `${year}-0${month}-`;

  for (let i = 1; i <= day; i++) {
    let currentDate = currentMY + '';
    i < 10
      ? (currentDate = currentDate + '0' + i)
      : (currentDate = currentDate + i);

    if (arr[currentDate] == null) arr[currentDate] = [];
  }
  for (let i = 0; i < data.list.length; i++) {
    var arr_ = {
      employee_id: data.list[i].employee_id,
      timekeeper_id: data.list[i].timekeeper_id,
      day: data.list[i].date,
      check_in: data.list[i].check_in,
      check_out: data.list[i].check_out,
    };
    if (arr[data.list[i].date] == null) arr[data.list[i].date] = [];
    arr[data.list[i].date].push(arr_);
  }
  console.log(arr);
  return arr;
}

const ProgressScreen = () => {
  const [attends, setdata] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getDataFromApi();
    return () => {};
  }, []);

  const getDataFromApi = async () => {
    const token = await AsyncStorage.getItem("AccessToken");
    fetch(`${BASE_URL}/attendance`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`, // notice the Bearer before your token
      },
    })
      .then(res => res.json())
      .then(resJson => setdata(processData(resJson)))
      .catch(error => console.log('Error: ==', error))
      .finally(() => setisLoading(false));
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>DAY OFF</Text>
      </View>
    );
  };

  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';
    return (
      <Pressable
        style={[styles.item, {height: 90}]}
        // onPress={() => navigation.navigate("Modal", { id: reservation.id })}
        // onPress={() => Alert.alert(reservation.check_in)}
      >
        <Text style={{fontSize, color}}>
          Check - in : {reservation.check_in}
        </Text>
        <Text style={{fontSize, color}}></Text>
        <Text style={{fontSize, color}}>
          Check - out: {reservation.check_out}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Timesheet</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Agenda
          items={attends}
          renderItem={renderItem}
          renderEmptyDate={renderEmptyDate}
        />
      )}
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
    fontSize: 26,
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
