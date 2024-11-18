import React from "react";
import Login from "./src/pages/Login";
import CadastroUser from "./src/pages/CadastroUser";
import CadastroRestaurante from "./src/pages/CadastroRestaurante";
import Home from "./src/pages/Home";
import User from "./src/pages/User";
import Map_Page from "./src/pages/Map_Page";
import Pesquisa from "./src/pages/Pesquisa";
import EsqueceuSenha from "./src/pages/EsqueceuSenha";
import Map from './src/components/Map';
import EscolherCadastro from "./src/pages/Escolher_Cadastro";


import { AuthProvider } from "./src/context/AuthContext";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AppStack = createNativeStackNavigator();

export default function App() {
  return (
    
    <AuthProvider>
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
    </AuthProvider>
  );
}
