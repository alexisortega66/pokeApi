import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Text, Image } from 'react-native-elements';
import axios from 'axios';

const PokemonsList = ({ navigation, route }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const type = route.params?.type;

  useEffect(() => {
    fetchPokemonListByType();
  }, [type]);

  const fetchPokemonListByType = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
      const pokemonUrls = response.data.pokemon.map(pokemon => pokemon.pokemon.url);
      const pokemonDetails = await Promise.all(pokemonUrls.map(url => axios.get(url)));
      const pokemonListByType = pokemonDetails.map(response => response.data);
      setPokemonList(pokemonListByType);
    } catch (error) {
      console.error('Error fetching Pokemon list by type:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeScreen')}
        style={styles.goBackButton}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Pokemon List</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <FlatList
          data={pokemonList}
          keyExtractor={(item) => item.name}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailsScreen', { name: item.name })}
            >
              <Card containerStyle={styles.card}>
                <Text style={styles.title}>{`#${item.id} `}</Text>
                <Image
                  source={{ uri: `https://img.pokemondb.net/artwork/${item.name}.jpg` }}
                  style={styles.image}
                />
                <Text style={styles.title}>{` ${item.name}`}</Text>
              </Card>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    width: 150,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  goBackButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PokemonsList;
