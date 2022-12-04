import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import Popover from 'react-native-popover-view';
import axios from 'axios';

const baseUrl = 'http://localhost:3000';

const IncluiResposta = ({ route }) => {
  const { id, nome } = route.params;

  const [resposta, setResposta] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [respostas, setRespostas] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const url = `${baseUrl}/perguntas?pergunta_id=${id}&_sort=id&_order=desc`;
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
  const [showPopover, setShowPopover] = useState(false);
  const salvarResposta = async () => {
    if (!resposta.trim()) {
      setShowPopover(true);
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/respostas`, {
        resposta,
        pergunta_id: id,
      });
      if (response.status === 201) {
        alert(`Resposta salva: ${JSON.stringify(response.data)}`);
        setIsLoading(false);
        setResposta('');
        setRespostas([{ id: 0, resposta, pergunta_id: id }, ...respostas]);
      } else {
        setShowPopover(true);
      }
    } catch (error) {
      setShowPopover(true);

      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://ericasaubermann.com.br/wp-content/uploads/2019/09/PERGUNTAS-RESPOSTAS-650x650.jpg',
        }}
        style={styles.figura}
      />

      <View style={styles.resposta}>
        <Text
          style={{
            textAlign: 'center',
            margin: 10,
            fontWeight: 'bold',
            color: '#ccc',
          }}>{`${nome}`}</Text>
      </View>

      <Text style={styles.label}>Resposta:</Text>
      <TextInput
        multiline
        numberOfLines={2}
        placeholder="Insira sua resposta"
        placeholderTextColor="#aaa"
        style={styles.textInput}
        onChangeText={(text) => setResposta(text)}
        value={resposta}
      />
      <TouchableOpacity
        style={styles.buttonBig}
        onPress={() => {
          salvarResposta();
        }}>
        <Text style={styles.textButton}>Salvar Resposta</Text>
      </TouchableOpacity>
      <Popover
        mode="js-modal"
        popoverStyle={styles.popover}
        isVisible={showPopover}
        onRequestClose={() => setShowPopover(false)}>
        <Text>Preencha os dados corretamente para proseguir</Text>
      </Popover>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    marginHorizontal: 10,
  },
  figura: {
    width: 300,
    height: 140,
    marginHorizontal: 15,
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  label: {
    marginTop: 12,
    color: '#666',
    fontSize: 12,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '95%',
    padding: 10,
  },
  resposta: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 4,
    textTransform: 'UpperCase',
  },
  buttonBig: {
    marginTop: 6,
    width: 200,
    backgroundColor: 'gray',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 4,
    borderRadius: 4,
  },
  popover: {
    width: '250px',
    height: '70px',
    textAlign: 'center',
    justifyContent: 'center',
    padding: '10px',
    color: 'gray',
  },
});

export default IncluiResposta;
