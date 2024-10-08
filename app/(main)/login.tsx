import React from "react";
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useLoginMutation } from "@/api/auth.api";
import { Body } from "@/components/ui/Text";
import ErrorView from "@/components/ErrorView";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSession } from "@/context/auth";
import Button from "@/components/ui/Button";
import SafeArea from "@/components/ui/SafeArea";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [login, result] = useLoginMutation();
  const { signIn } = useSession();
  const { idProduct } = useLocalSearchParams<{ idProduct: string }>();
  const router = useRouter();
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data);
      await signIn("newSession.data.data");
      router.navigate({
        pathname: "/product/[idProduct]",
        params: { idProduct },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      Alert.alert("Error", "Si è verificato un errore");
    }
  };

  return (
    <SafeArea>
      <View style={styles.container}>
        {result.isError && <ErrorView />}
        <KeyboardAvoidingView>
          <View style={styles.contentCard}>
            <Body style={styles.header}>Login</Body>
            <Body style={styles.message}>
              Per visualizzare il dettaglio prodotto è prima necessario accedere
              all'account Recrowd.
            </Body>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => onChange(text)}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Email"
                />
              )}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              defaultValue="test@recrowd.it"
            />
            {errors.email && (
              <Body style={styles.errorText}>{errors.email.message}</Body>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => onChange(text)}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Password"
                  secureTextEntry
                />
              )}
              name="password"
              rules={{ required: "Password is required" }}
              defaultValue="Password1234!"
            />
            {errors.password && (
              <Body style={styles.errorText}>{errors.password.message}</Body>
            )}

            <Button label="Login" onPress={handleSubmit(onSubmit)} />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  errorText: { color: "red", fontWeight: 800 },
  container: {
    flex: 1,
    padding: 8,
    justifyContent: "center",
  },
  contentCard: {
    alignItems: "center",
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#9C73D1",
    backgroundColor: "#FFF",
    elevation: 5,
  },
  textInput: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  message: {
    fontSize: 16,
    paddingBottom: 16,
  },
});
