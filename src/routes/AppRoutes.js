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
import CriaPost from '../pages/CriaPost';
import { colors, fontSizes, globalStyles } from '../styles/styles';

const AppStack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName="Login">
        <AppStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <AppStack.Screen name="CadastroUser" component={CadastroUser} options={{
          headerTitle: " ", headerStyle: {
            backgroundColor: colors.begeBG
          }
        }} />
        <AppStack.Screen name="CadastroRestaurante" component={CadastroRestaurante} options={{
          headerTitle: " ", headerStyle: {
            backgroundColor: colors.begeBG
          }
        }} />
        <AppStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <AppStack.Screen name="User" component={User} options={{headerTitle: " ", headerStyle: {
        backgroundColor: colors.begeBG
      }}}/>
        <AppStack.Screen name="Pesquisa" component={Pesquisa} />
        <AppStack.Screen name="Map_Page" component={Map_Page} options={{
          headerTitle: " ", headerStyle: {
            backgroundColor: colors.begeBG
          }
        }} />
        <AppStack.Screen name="EsqueceuSenha" component={EsqueceuSenha} options={{
          headerTitle: " ", headerStyle: {
            backgroundColor: colors.begeBG
          }
        }} />
        <AppStack.Screen name="EscolherCadastro" component={EscolherCadastro} options={{
          headerTitle: " ", headerStyle: {
            backgroundColor: colors.begeBG
          }
        }} />
        <AppStack.Screen name="CriaPost" component={CriaPost}
          options={{
            headerTitle: " ", headerStyle: {
              backgroundColor: colors.begeBG
            }
          }} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}