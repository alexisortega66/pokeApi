import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const InicioScreen = ({ navigation }) => {
  const handleExplore = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <ImageBackground
      source={require('../assets/portada.jpeg')} // Asegúrate de reemplazar 'ruta_de_tu_imagen' con la ruta correcta
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>PokeApi</Text>
        <TouchableOpacity onPress={handleExplore} style={styles.exploreButton}>
          <Text style={styles.buttonText}>Explorar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  exploreButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InicioScreen;
