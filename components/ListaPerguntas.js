import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Platform,
  TouchableOpacity,
  Pressable,
  TextInput,
  Modal,
} from 'react-native';
import Constants from 'expo-constants';

import ItemLista from './ItemLista';

import Context from '../store/Context';

const baseUrl = 'http://localhost:3000';

const ListaPerguntas = ({ navigation }) => {
  const [perguntas, setPerguntas] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const [filtro, setFiltro] = useState();

  const { usuarioId, usuarioNome } = useContext(Context);

  const resFiltro = perguntas?.filter((x) => x.nome?.includes(filtro));

  useEffect(() => {
    const source = axios.CancelToken.source();
    const url = `${baseUrl}/perguntas`;
    const obtemPerguntas = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url, { cancelToken: source.token });
        if (response.status === 200) {
          setPerguntas(response.data);
          setIsLoading(false);
          return;
        } else {
          throw new Error('Falha ao obter lista de Perguntas');
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
    obtemPerguntas();
    return () => source.cancel('Operação cancelada...');
  }, []);

  const usuarioLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        style={styles.modal}
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.textInput}
              placeholder="Pesquise por uma pergunta"
              placeholderTextColor="white"
              onChangeText={(text) => setFiltro(text)}
            />
            <Pressable
              style={styles.buttonClose}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.textClose}>X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.view}>
        <View>
          <Text style={styles.textUsuario}>Usuário: {usuarioNome}</Text>
        </View>
        <TouchableOpacity style={styles.textUsuario2} onPress={usuarioLogout}>
          <Text style={styles.textUsuario2}>X Sair</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.div}>
        <TouchableOpacity
          style={styles.buttonBig}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text style={styles.textButton}>Pesquisar</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.wrapperStyle}>
          {!isLoading &&
            !hasError &&
            perguntas &&
            !filtro &&
            perguntas.map((pergunta) => (
              <ItemLista
                id={pergunta.id}
                nome={pergunta.nome}
                navigation={navigation}
              />
            ))}
          {!isLoading &&
            !hasError &&
            perguntas &&
            filtro &&
            resFiltro.map((pergunta) => (
              <ItemLista
                id={pergunta.id}
                nome={pergunta.nome}
                navigation={navigation}
              />
            ))}
        </View>
        <View style={styles.wrapperStyle}>
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
    minHeight: 128,
  },
  textUsuario: {
    backgroundColor: 'gray',
    textAlign: 'right',
    paddingRight: 10,
    color: '#fff',
  },
  textButton: {
    border: '1px solid',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    padding: 5,
    backgroundColor: 'gray',
    color: 'white',
  },
  div: {
    alignItems: 'center',
    marginTop: '10px',
    justifyContent: 'center',
    width: '100%',
    alignContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    backgroundColor: 'grey',
    color: 'white',
    borderRadius: 5,
    width: '100%',
    height: 50,
    flex: 1,
    padding: 10,
  },
  buttonClose: {
    marginTop: '10px',
    borderRadius: 50,
    padding: 5,
    border: '1px solid',
  },
  textClose: {
    fontSize: '10px',
    fontFamily: 'bold',
  },
  view: {
    width: '100%',
    height: '25px',
    flexDirection: 'row',
    backgroundColor: 'gray',
  },
  textUsuario2: {
    marginLeft: 80,
    color: '#fff',
  },
});

export default ListaPerguntas;
