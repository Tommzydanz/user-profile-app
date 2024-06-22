import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Auth, setCredential } from "@store/auth";
import { store } from "@store/main";
import { app_storage } from "@utils/constants";

const { getItem } = useAsyncStorage(app_storage);

export const initInterceptors = () => {
  axios.interceptors.request.use(
    async (config) => {
      const result = await getItem();
      const token = result ? (JSON.parse(result) as Auth).token : null;

      // console.log(token)
      if (token) config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const result = await getItem();
      const token = result ? (JSON.parse(result) as Auth).token : null;
      // if (ValidateResponseError(error.response, token)) {
      //   store.dispatch(setCredential(null));
      // }

      return Promise.reject(error);
    }
  );
};
