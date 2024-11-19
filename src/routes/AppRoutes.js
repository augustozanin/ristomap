import { View, Text } from 'react-native'
import React from 'react'
import Login from "../pages/Login";
import CadastroUser from "../pages/CadastroUser";
import CadastroRestaurante from "../pages/CadastroRestaurante";
import Home from "../pages/Home";
import User from "../pages/User";
import Map_Page from "../pages/Map_Page";
import Pesquisa from "../pages/Pesquisa";
import EsqueceuSenha from "../pages/EsqueceuSenha";
import Map from '../components/Map';
import EscolherCadastro from "../pages/Escolher_Cadastro";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AppStack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <NavigationContainer>
    <AppStack.Navigator initialRouteName="Login">
      <AppStack.Screen name="Login" component={Login} />
      <AppStack.Screen name="CadastroUser" component={CadastroUser} />
      <AppStack.Screen name="CadastroRestaurante" component={CadastroRestaurante} />
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="User" component={User} />
      <AppStack.Screen name="Pesquisa" component={Pesquisa} />
      <AppStack.Screen name="Map_Page" component={Map_Page} />
      <AppStack.Screen name="EsqueceuSenha" component={EsqueceuSenha} />
      <AppStack.Screen name="EscolherCadastro" component={EscolherCadastro} />
    </AppStack.Navigator>
  </NavigationContainer>
  )
}