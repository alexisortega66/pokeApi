// DetailsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Image } from 'react-native-elements';
import axios from 'axios';

const DetailsScreen = ({ route, navigation }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const pokemonName = route.params?.name;

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => {
        setPokemonDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching Pokemon details:', error);
      });
  }, [pokemonName]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      <View style={styles.cardContainer}>
        {pokemonDetails ? (
          <Card containerStyle={styles.card}>
            <Image
              source={{ uri: `https://img.pokemondb.net/artwork/${pokemonName}.jpg` }}
              style={styles.image}
            />
            <Text style={styles.text}>Name: {pokemonDetails.name}</Text>
            <Text style={styles.text}>Height: {pokemonDetails.height}</Text>
            <Text style={styles.text}>Weight: {pokemonDetails.weight}</Text>
          </Card>
        ) : (
          <Text style={styles.text}>Loading...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
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
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default DetailsScreen;
