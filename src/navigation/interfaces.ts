import {NavigatorScreenParams} from '@react-navigation/native';

export type IGuestStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

export type IAuthStackParamList = {
  Home: NavigatorScreenParams<IBottomTabParamList>;
  EditProfile: undefined;
};

export type IBottomTabParamList = {
  HomeScreen: undefined;
  Profile: {name: string; job: string};
};
