import {Picker} from '@react-native-picker/picker';
import {useState, useEffect} from 'react';
import {Alert, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import axios from 'axios';

const Formulario = ({
  setConsultarAPI,
  criptomoneda,
  setCriptomoneda,
  moneda,
  setMoneda,
  cotizacion,
}) => {
  const [precioCripto, setPrecioCripto] = useState('');
  const [guardarCriptomoneda, setGuardarCriptomoneda] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await axios.get(url);
      setGuardarCriptomoneda(await resultado.data.Data);
    };
    consultarAPI();
  }, [criptomoneda]);

  const buscoPrecio = async cripto => {
    if (moneda.trim() === '' || criptomoneda.trim() === '') {
      mostrarAlerta();
    } else {
      setConsultarAPI(true);
    }
  };

  const mostrarAlerta = () => {
    Alert.alert('Error...', 'Ambos campos son obligatorios');
  };

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        style={styles.picker}
        itemStyle={{height: 120}}
        selectedValue={moneda}
        onValueChange={valor => setMoneda(valor)}>
        <Picker label="- Seleccione - " value="" />
        <Picker label="Dolar US" value="USD" />
        <Picker label="Peso Argentino" value="ARS" />
        <Picker label="Euro" value="EUR" />
        <Picker label="Libra Esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        style={styles.picker}
        itemStyle={{height: 120}}
        selectedValue={criptomoneda}
        onValueChange={valor => {
          setCriptomoneda(valor);
        }}>
        <Picker label="- Seleccione - " value="" />
        {guardarCriptomoneda.lenght === 0
          ? console.log('no hay')
          : guardarCriptomoneda.map(crypto => (
              <Picker
                key={crypto.CoinInfo.Id}
                label={crypto.CoinInfo.FullName}
                value={crypto.CoinInfo.Name}
              />
            ))}
      </Picker>
      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={() => buscoPrecio(criptomoneda)}>
        <Text style={styles.textCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    textTransform: 'uppercase',
    fontFamily: 'Lato-Black',
    fontSize: 22,
  },
  btnCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    borderRadius: 10,
  },
  textCotizar: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  picker: {
    marginBottom: 10,
  },
});
export default Formulario;
