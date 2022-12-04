import { Pressable, View, Image, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

const ItemRes = ({ id, resposta }) => {
  const [likeCount, setLikeCount] = useState(1);
  const [deslikeCount, setDeslikeCount] = useState(1);

  return (
    <View style={styles.itemLista}>
      <Text style={styles.textItem}>{resposta}</Text>
      <View style={styles.lista}>
        <Pressable
          style={styles.btnLista}
          onPress={() => {
            setLikeCount(likeCount + 1);
           
          }}>
          <Text>👍</Text>
          <Text style={styles.iconText}>{likeCount + 1}</Text>
        </Pressable>
        <Pressable
          style={styles.btnLista}
          onPress={() => {
            setDeslikeCount(deslikeCount + 1);
        
          }}>
          <Text style={styles.icon}>👎</Text>
          <Text style={styles.iconText}>{deslikeCount}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ItemRes;

const styles = StyleSheet.create({
  itemLista: {
    flex: 1,
    margin: 10,
  },
  textItem: {
    border: '1px solid',
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 14,
    color: 'gray',
  },
  lista: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: '8px',
  },
  btnLista: {
    flexDirection: 'row',
  },
  iconText: {
    marginLeft: 5,
  },
});
