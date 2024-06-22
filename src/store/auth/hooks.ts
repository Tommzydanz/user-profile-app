import { useMemo } from "react";
import {
  setCredential,
  useIsLoading,
  useSelectAuthToken,
  useSelectAuth,
} from "./slice";
import { useAppDispatch, useAppSelector } from "../hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { app_storage } from "@utils/constants";
import { Auth } from "./interface";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const photo = "";
  const auth = useAppSelector(useSelectAuth);
  const authToken = useAppSelector(useSelectAuthToken);
  const isLoading = useAppSelector(useIsLoading);
  let SAuth: Auth | null = auth ?? null;
  let SAuthToken: string | null = authToken ?? null;

  try {
    AsyncStorage.getItem(app_storage).then((storedValue) => {
      const jsonStored = storedValue ? JSON.parse(storedValue) : null;
      SAuth = jsonStored ? jsonStored?.auth : SAuth;
      SAuthToken = jsonStored ? jsonStored?.toke : SAuthToken;
      // console.log("stored data -->", SAuth, jsonStored?.auth);
      if ((!auth && jsonStored?.auth) || (!auth && !jsonStored?.auth)) {
        dispatch(setCredential(jsonStored?.auth));
      }
    });
  } catch (error) {
    console.log(error);
  }

  return useMemo(
    () => ({
      auth: auth ?? SAuth,
      isLoading: auth ?? SAuth ? false : isLoading,
      authToken: authToken ?? SAuthToken,
    }),
    [auth, SAuth, isLoading, authToken, SAuthToken]
  );
};

export const useAuthToken = () => {
  const token = useAppSelector(useSelectAuthToken);
  return useMemo(() => ({ access_token: token }), [token]);
};

export const usePushToken = () => {
  const { pushId } = useAppSelector((state) => state.auth);
  return useMemo(() => pushId, [pushId]);
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  return () => dispatch(setCredential(null));
};
