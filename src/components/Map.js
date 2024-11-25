import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const Map = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Função para obter a localização atual
  const getCurrentLocation = async () => {
    // Solicita permissão para acessar a localização
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permissão de localização negada');
      return;
    }
    // Obtém a localização atual
    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
  };

  // Carrega os marcadores do Supabase
  const fetchMarkers = async () => {
    try {
      const { data, error } = await supabase.from('markers').select('*');
      if (error) throw error;
      setMarkers(data);
    } catch (error) {
      console.error('Erro ao carregar marcadores:', error);
    }
  };

  // Salva um marcador no Supabase
  const saveMarker = async (newMarker) => {
    try {
      const { data, error } = await supabase.from('markers').insert([newMarker]);
      if (error) throw error;
      setMarkers((prevMarkers) => [...prevMarkers, ...data]); // Atualiza o estado local
    } catch (error) {
      console.error('Erro ao salvar marcador:', error);
    }
  };

 // Adiciona um marcador ao pressionar o mapa
 const handleMapPress = (event) => {
  const { latitude, longitude } = event.nativeEvent.coordinate;

// Exemplo de dados do marcador
  const newMarker = {
    latitude,
    longitude,
    title: 'Novo Marcador',
    description: 'Descrição aqui',
  };

  // Salva o marcador no banco de dados
  saveMarker(newMarker);
}; 

  useEffect(() => {
    getCurrentLocation();
    fetchMarkers ();
  }, []);

  // Define o fallback de coordenadas caso não permita acesso à localização do celular
  const initialRegion = {
    latitude: location ? location.coords.latitude : -28.2623,
    longitude: location ? location.coords.longitude : -52.4103,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={initialRegion}
        showsUserLocation={true}
        followsUserLocation={true}
        onPress={handleMapPress} // Permite criar marcadores ao pressionar o mapa
      >
       {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
      {errorMsg && Alert.alert('Erro', errorMsg)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;