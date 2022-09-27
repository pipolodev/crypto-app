import {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import Formulario from './components/Formulario';
import Header from './components/Header';
import axios from 'axios';
import Footer from './components/Footer';
import Cotizacion from './components/Cotizacion';

const App = () => {
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [consultarAPI, setConsultarAPI] = useState(false);
  const [cotizacion, setCotizacion] = useState({});
  const [cargando, setCargando] = useState(false);
  useEffect(() => {
    if (consultarAPI === true) {
      setCargando(true);
      const consultarAPI = async () => {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const resultado = await axios.get(url);
        setCotizacion(resultado.data.DISPLAY[criptomoneda][moneda]);
        //Ocultar el spinner y mostrar el resultado
        setConsultarAPI(false);
        setCargando(false);
      };
      consultarAPI();
    }
  }, [consultarAPI]);

  return (
    <>
      <Header />
      <Image
        style={styles.imagen}
        source={require('./assets/img/cryptomonedas.png')}
      />
      <View style={styles.contenido}>
        <Formulario
          criptomoneda={criptomoneda}
          setCriptomoneda={setCriptomoneda}
          moneda={moneda}
          setMoneda={setMoneda}
          setConsultarAPI={setConsultarAPI}
          cotizacion={cotizacion}
        />
      </View>

      {cargando ? (
        <ActivityIndicator
          style={{marginTop: 60}}
          size="large"
          color="#5E49E2"
        />
      ) : (
        <Cotizacion cotizacion={cotizacion} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
