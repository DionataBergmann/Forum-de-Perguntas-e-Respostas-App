import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Context from './store/Context';
import UsuarioContext from './store/UsuarioContext'

import Login from './components/Login';
import ListaPerguntas from './components/ListaPerguntas';
import IncluiRespostas from './components/IncluiResposta';
import ListaRespostas from './components/ListaRespostas';

const Stack = createNativeStackNavigator();

export default function App() {

  const store = {...UsuarioContext()}

  return (
    <Context.Provider value={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'Fórum de Perguntas e Respostas',
              headerStyle: {
                backgroundColor: 'gray',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        <Stack.Screen
          name="Lista"
          component={ListaPerguntas}
          options={{
            title: "Lista de Perguntas",
            headerStyle: {
              backgroundColor: 'gray',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },            
          }}
        />
        <Stack.Screen
          name="Respostas"
          component={IncluiRespostas}
          options={{
            title: 'Criar Resposta',
            headerStyle: {
              backgroundColor: 'gray',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },            
          }}
        />
        <Stack.Screen
          name="ListaRes"
          component={ListaRespostas}
          options={{
            title: 'Lista Respostas',
            headerStyle: {
              backgroundColor: 'gray',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },            
          }}
        />

        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}
