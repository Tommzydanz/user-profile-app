import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../main";
import { Auth, AuthState } from "./interface";
import { app_storage } from "@utils/constants";

const initialState: AuthState = { isLoading: true };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredential(state, { payload: auth }: PayloadAction<Auth | null>) {
      if (auth) {
        AsyncStorage.setItem(
          app_storage,
          JSON.stringify({ auth, token: auth?.token })
        ).catch((error) => {
          console.log("Auth not stored error: ", error);
        });

        state.auth = auth;
        state.token = auth?.token;
      } else {
        AsyncStorage.removeItem(app_storage);
        state.auth = undefined;
        state.token = undefined;
      }
      // manage loading state
      state.isLoading = false;
    },
    setPushToken(state, { payload: { token } }) {
      state.pushId = token;
    },
  },
});

export const { setCredential, setPushToken } =
  authSlice.actions;
export default authSlice.reducer;
export const useSelectAuth = (state: RootState): Auth | null | undefined =>
  state.auth.auth;
export const useIsLoading = (state: RootState): boolean | undefined =>
  state.auth.isLoading;
export const useSelectAuthToken = (
  state: RootState
): string | null | undefined => state.auth.token;