import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Platform,
  Pressable,
} from 'react-native';
import Constants from 'expo-constants';

import ItemRes from './ItemRes';

const baseUrl = 'http://localhost:3000';

const ListaRespostas = ({ route }) => {
  const { id, navigation } = route.params;

  const [respostas, setRespostas] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const url = `${baseUrl}/respostas?pergunta_id=${id}`;
    const obtemRespostas = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url, { cancelToken: source.token });
        if (response.status === 200) {
          setRespostas(response.data);
          setIsLoading(false);
          return;
        } else {
          throw new Error('Falha ao obter lista de respostas');
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Operação cancelada...');
        } else {
          setErrorFlag(true);
          setIsLoading(false);
        }
      }
    };
    obtemRespostas();
    return () => source.cancel('Operação cancelada...');
  }, [id]);

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.wrapperStyle}>
          {!isLoading &&
            !hasError &&
            respostas &&
            respostas.map((resposta) => (
              <ItemRes
                id={resposta.id}
                resposta={resposta.resposta}
                navigation={navigation}
              />
            ))}
        
        </View>
        <View style={styles.wrapperStyle}>
          {isLoading && <Text> Aguarde... Carregando Dados </Text>}
          {!isLoading && hasError && (
            <Text> Ocorreu um erro. Tente novamente mais tarde. </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
  },
  wrapperStyle: {
    // minHeight: 128,
  },
});

export default ListaRespostas;
