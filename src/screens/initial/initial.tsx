import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import React from 'react';
import Login from '../../components/login';
import Container from '../../components/container/container';
import styles from './styles';
import colors from '../../constants/colors';
import AuthService from '../../services/auth';
import routes from '../../routes';

type Props = {
  navigation: any;
};

const InitialView: React.FC<Props> = ({navigation}): JSX.Element => {
  const handleLogin = async (
    email: string,
    password: string,
  ): Promise<void> => {
    const {serverRes, error} = await AuthService.handleLogin(
      email.trim().toLowerCase(),
      password,
    );
    if (error) {
      Alert.alert(serverRes);
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: routes.home}],
      });
    }
  };
  return (
    <Container backgroundColor={colors.initialBgColor} verticalHeight={0}>
      <View style={styles.container}>
        <Image
          style={styles.matrixImg}
          source={require('../../assets/images/matrix.png')}
        />
        <Login
          onSubmit={handleLogin}
          handlePassForgotRoute={() => navigation.navigate(routes.forgot)}
        />
        <View style={styles.signUpContainer}>
          <Text style={styles.noAccountText}>Don't have an account yet?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.register)}>
            <Text style={styles.signUp}>SIGN UP HERE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default InitialView;
