import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { supabase } from "../services/supabase";

const Map = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState([]);

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

  /// troubleshoot eterno para salvar o marker sem erro
  const saveMarker = async (newMarker) => {
    try {
      // Verifique se o usuário está autenticado e obtenha o `user_id`
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error('Erro ao obter a sessão de usuário:', sessionError.message);
        return;
      }
      if (!sessionData || !sessionData.session) {
        console.error('Usuário não autenticado');
        return;
      }

      const userId = sessionData.session.user.id; // Obtém o ID do usuário da sessão

      // Verifica o CNPJ antes de salvar o marcador
      const temCNPJ = await verificaCNPJ();
      if (temCNPJ == 1) {
        alert('Somente restaurantes podem fazer marcações!');
        return; // Interrompe o processo se o CNPJ for nulo
      }
      if (temCNPJ === null) {
        alert('Erro ao verificar o CNPJ.');
        return; // Interrompe o processo se ocorrer algum erro na verificação
      }

      const markerWithUser = {
        ...newMarker,
        user_id: userId,  // Adiciona o `user_id` ao marcador
      };
      console.log('Dados do usuárioooo', sessionData.session.user.id)


      // Inclui `.select()` para retornar os dados inseridos
      const { data, error } = await supabase
        .from('markers')
        .insert([markerWithUser])
        .select();

      console.log('Resposta completa do Supabase:', { data, error });
      if (error) {
        alert('Erro ao salvar no banco:' + error.message);
        return;
      }

      if (data && data.length > 0) {
        console.log('Novo marcador inserido:', data);
        setMarkers((prevMarkers) => [...prevMarkers, ...data]); // Atualiza a lista de marcadores
      } else {
        console.error('Erro: resposta do Supabase não contém dados ou está vazia');
      }
    } catch (error) {
      alert('Erro ao salvar marcador:', error);
    }
  };

  const verificaCNPJ = async () => {
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      uuidUsuario = sessionData.session.user.id
      const { data, error } = await supabase
        .from('user')
        .select('CNPJ')
        .eq('user_id', uuidUsuario);
      const dado_cpnj = data?.[0]?.CNPJ
      // Verifica se o CNPJ é nulo ou não
      console.log('Dados do cnpj', dado_cpnj)
      if (dado_cpnj == null) {
        console.log("O CNPJ é nulo.");
        return 1
      } else {
        console.log("O CNPJ não é nulo.");
        return 0
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
    }
  }

  // Adiciona um marcador ao pressionar o mapa
  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const newMarker = {
      latitude,
      longitude,
      title: 'Novo Marcador',
      description: 'Descrição aqui',
    };
    console.log('Novo marcador:', newMarker);  // Log para verificar a estrutura do marcador
    // Salva o marcador no banco de dados
    saveMarker(newMarker);
  };

  useEffect(() => {
    getCurrentLocation();
    fetchMarkers();
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