import {useEffect, useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';

const Cotizacion = ({cotizacion}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  if (Object.keys(cotizacion).length === 0) return null;
  return (
    <Animated.View style={[styles.resultado, {opacity: fadeAnim}]}>
      <Text style={[styles.texto, styles.precio]}>
        <Text style={styles.span}>{cotizacion.PRICE}</Text>
      </Text>
      <Text style={styles.texto}>
        Precio mas alto del dia: {''}
        <Text style={styles.span}>{cotizacion.HIGHDAY}</Text>
      </Text>
      <Text style={styles.texto}>
        Precio mas bajo del dia: {''}
        <Text style={styles.span}>{cotizacion.LOWDAY}</Text>
      </Text>
      <Text style={styles.texto}>
        Variacion ultimas 24 Horas: {''}
        <Text style={styles.span}>{cotizacion.CHANGEPCT24HOUR}</Text>
      </Text>
      <Text style={styles.texto}>
        Ultima Actualizacion: {''}
        <Text style={styles.span}>{cotizacion.LASTUPDATE}</Text>
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  resultado: {
    marginTop: 20,
    height: '100%',
    padding: 20,
    backgroundColor: '#5E49E2',
  },
  texto: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Lato-Regular',
    marginBottom: 10,
  },
  precio: {
    fontFamily: 'Lato-Black',
    fontSize: 30,
  },
  span: {
    fontFamily: 'Lato-Black',
  },
});
export default Cotizacion;
