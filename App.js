import React from "react";
import Login from "./src/pages/Login";
import Cadastro from "./src/pages/Cadastro";
import Home from "./src/pages/Home";
import User from "./src/pages/User";
import Map_Page from "./src/pages/Map_Page";
import Pesquisa from "./src/pages/Pesquisa";
import EsqueceuSenha from "./src/pages/EsqueceuSenha";
import Map from './src/components/Map';


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
          <AppStack.Screen name="Cadastro" component={Cadastro} />
          <AppStack.Screen name="Home" component={Home} />
          <AppStack.Screen name="User" component={User} />
          <AppStack.Screen name="Pesquisa" component={Pesquisa} />
          <AppStack.Screen name="Map_Page" component={Map_Page} />
          <AppStack.Screen name="EsqueceuSenha" component={EsqueceuSenha} />
        </AppStack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
