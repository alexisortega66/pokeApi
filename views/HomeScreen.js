import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/type')
      .then(response => {
        setTypes(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching Pokemon types:', error);
      });
  }, []);

  const renderType = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PokemonsList', { type: item.name })}
    >
      <Card containerStyle={styles.card}>
        {/* Puedes utilizar un ícono relacionado con el tipo si lo deseas */}
        <Text style={styles.typeText}>{item.name}</Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={types}
        keyExtractor={(item) => item.name}
        renderItem={renderType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
    padding: 10,
  },
  card: {
    margin: 10,
    alignItems: 'center',
  },
  typeText: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default HomeScreen;
