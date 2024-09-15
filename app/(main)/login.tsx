import React from "react";
import { View, TextInput, Alert, StyleSheet, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useLoginMutation } from "@/api/auth.api";
import { Body } from "@/components/ui/Text";
import ErrorView from "@/components/ErrorView";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSession } from "@/context/auth";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function Login() {
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
    <View style={styles.container}>
      {result.isError && <ErrorView />}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
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

      <Button title="Login" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: { color: "red" },
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
