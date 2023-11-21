import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-elements';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [types, setTypes] = React.useState([]);

  React.useEffect(() => {
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
        <Text style={styles.typeText}>{item.name}</Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Types</Text>
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
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    margin: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  typeText: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default HomeScreen;
