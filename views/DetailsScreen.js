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
            <Text style={styles.title}>{`#${pokemonDetails.id} ${pokemonDetails.name}`}</Text>
            <Image
              source={{ uri: `https://img.pokemondb.net/artwork/${pokemonName}.jpg` }}
              style={styles.image}
            />
            <Text style={styles.subtitle}>Height:</Text>
            <Text style={styles.text}>- {pokemonDetails.height}</Text>
            <Text style={styles.subtitle}>Weight:</Text>
            <Text style={styles.text}>- {pokemonDetails.weight}</Text>
            {/* Mostrar todos los demás datos que desees */}
            {/* Ejemplo: */}
            <Text style={styles.subtitle}>Base Experience:</Text>
            <Text style={styles.text}>- {pokemonDetails.base_experience}</Text>
            <Text style={styles.subtitle}>Abilities:</Text>
            {pokemonDetails.abilities.map((ability, index) => (
              <Text key={index} style={styles.text}>- {ability.ability.name}</Text>
            ))}
            <Text style={styles.subtitle}>Types:</Text>
            {pokemonDetails.types.map((type, index) => (
              <Text key={index} style={styles.text}>- {type.type.name}</Text>
            ))}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default DetailsScreen;
