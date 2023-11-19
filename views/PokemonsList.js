import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Text, Image } from 'react-native-elements';
import axios from 'axios';

const PokemonsList = ({ navigation, route }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const type = route.params?.type;

  useEffect(() => {
    // Lógica para obtener la lista de Pokémon según la categoría (type)
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
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailsScreen', { name: item.name })}
          >
            <Card containerStyle={styles.card}>
              <Image
                source={{ uri: `https://img.pokemondb.net/artwork/${item.name}.jpg` }}
                style={styles.image}
              />
              <Text style={styles.text}>{item.name}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
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
  card: {
    width: 150,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default PokemonsList;
