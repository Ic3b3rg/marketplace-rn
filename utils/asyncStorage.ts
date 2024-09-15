import AsyncStorage from "@react-native-async-storage/async-storage";

const keys = { session: "session" };
export const clearStorage: () => Promise<void> = () => AsyncStorage.clear();

export const storeSession: (session: string) => Promise<void> = (session) =>
  AsyncStorage.setItem(keys.session, session);

export const getSession: () => Promise<string | null> = () =>
  AsyncStorage.getItem(keys.session);

export const clearSession: () => Promise<void> = () =>
  AsyncStorage.removeItem(keys.session);
