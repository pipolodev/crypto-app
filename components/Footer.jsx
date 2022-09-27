import {StyleSheet, Text} from 'react-native';

const Footer = ({cotizacion}) => {
  return <Text style={styles.footer}>{`VALOR: ${cotizacion.PRICE}`}</Text>;
};

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    marginTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 50 : 10,
    fontFamily: 'Lato-Black',
    backgroundColor: '#5E49E2',
    paddingBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 20,
    color: '#FFF',
    marginBottom: 30,
  },
});
export default Footer;
