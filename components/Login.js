import { useState, useContext } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import Popover from 'react-native-popover-view';

import Context from '../store/Context';

import axios from 'axios';

const baseUrl = 'http://localhost:3000';

export default function Login({ navigation }) {
  const { setUsuarioId, setUsuarioNome } = useContext(Context);

  const [showPopover, setShowPopover] = useState(false);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const verificaLogin = async () => {
    const url = `${baseUrl}/usuarios?email=${email}&senha=${senha}`;
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        if (response.data.length == 1) {
          setUsuarioId(response.data[0].id);
          setUsuarioNome(response.data[0].nome);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Lista' }],
          });
        } else {
          setShowPopover(true);
        }
      } else {
        throw new Error('Falha ao obter lista de perguntas');
      }
    } catch (error) {
      setShowPopover(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://ericasaubermann.com.br/wp-content/uploads/2019/09/PERGUNTAS-RESPOSTAS-650x650.jpg',
        }}
        style={styles.image}
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="E-mail"
          placeholderTextColor="#fff"
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Senha"
          placeholderTextColor="#fff"
          secureTextEntry={true}
          onChangeText={(text) => setSenha(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={verificaLogin}>
        <Text style={styles.textButton}>Entrar</Text>
      </TouchableOpacity>
      <Popover
        mode="js-modal"
        popoverStyle={styles.popover}
        isVisible={showPopover}
        onRequestClose={() => setShowPopover(false)}>
        <Text>Login ou senha incorretos</Text>
      </Popover>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  image: {
    width: 280,
    height: 160,
    marginHorizontal: 15,
    alignSelf: 'center',
    resizeMode: 'stretch',
    marginTop: '20px',
    marginBottom: 20,
  },
  loginBtn: {
    width: '80%',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: 'gray',
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 4,
    textTransform: 'UpperCase',
  },
  inputView: {
    height: 45,
    marginBottom: 10,
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: 'gray',
    borderRadius: 5,
    width: '100%',
    height: 20,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: 'white',
  },
  popover: {
    width: '200px',
    height: '50px',
    textAlign: 'center',
    justifyContent: 'center',
    padding: '10px',
    color: 'gray',
  },
});
