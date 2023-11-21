import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';

const SearchScreen = ({ navigation }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Lógica para obtener la lista completa de Pokémon
    fetchPokemonList();
  }, []);

  const fetchPokemonList = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
      setPokemonList(response.data.results);
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
    }
  };

  const handleSearch = () => {
    const searchTermLowerCase = searchTerm.toLowerCase();

    if (searchTerm) {
      // Filtrar la lista completa de Pokémon por la letra ingresada
      const filteredPokemons = pokemonList.filter(item =>
        item.name.toLowerCase().startsWith(searchTermLowerCase)
      );

      setSearchResults(filteredPokemons);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectPokemon = (pokemonName) => {
    // Aquí podrías verificar si el nombre ingresado coincide con un Pokémon existente
    // y decidir si navegar a DetailsScreen o no
    navigation.navigate('DetailsScreen', { name: pokemonName });
  };

  const renderResult = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectPokemon(item.name)}>
      <Card containerStyle={styles.card}>
      <Image
                source={{ uri: `https://img.pokemondb.net/artwork/${item.name}.jpg` }}
                style={styles.image}
                
              />
        <Text style={styles.typeText}>{item.name}</Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar Pokémon por nombre"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.name}
        renderItem={renderResult}
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
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  typeText: {
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SearchScreen;
