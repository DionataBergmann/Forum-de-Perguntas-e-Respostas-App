import { Pressable, View, Image, Text, StyleSheet } from 'react-native';

const ItemLista = ({ id, nome, navigation }) => {
  return (
    <View style={styles.div}>
      <View style={styles.itemLista}>
        <Text style={styles.textItem}>{nome}</Text>
      </View>
      <View style={styles.botoesLista}>
        <Pressable
          style={styles.btnLista}
          onPress={() =>
            navigation.navigate('Respostas', { id, nome, navigation })
          }>
          <Text style={styles.textButton}>Responder</Text>
        </Pressable>
        &ensp;
        <Pressable
          style={styles.btnLista}
          onPress={() =>
            navigation.navigate('ListaRes', { id, nome, navigation })
          }>
          <Text style={styles.textButton}>Ver Respostas</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ItemLista;

const styles = StyleSheet.create({
  div: {
    marginTop: '10px',
    border: '1px solid',
    borderRadius: 5,
    padding: 10,
    width:"300px",
     textAlign: 'center',
  },
  itemLista: {
    flex: 1,
    flexDirection: 'row',
     textAlign: 'center',
       justifyContent:'center',
  },
  textItem: {
    textAlign: 'center',
    justifyContent:'center',
    color: 'gray',
    marginTop: 15,
  },
  botoesLista: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLista: {
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    marginTop: '20px',
  },
  textButton: {
    color: '#fff',
  },
});
