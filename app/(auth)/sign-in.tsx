import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomButton from "@/components/CustomButton";
import google from "@/assets/icons/google.png";
import { Link } from "expo-router";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleGoogleSignUp = () => {
    console.log("google signup");
  };

  return (
    <View className="flex-1 justify-center p-5 ">
      <Text className="text-3xl font-bold mb-9 text-center text-gray-800">
        Welcome 👋
      </Text>

      {/* email field  */}
      <Text className="text-xl font-bold text-gray-700 mb-1">Email</Text>

      <Controller
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className={"bg-gray-100 border border-gray-300 rounded-md p-3 mb-5"}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="enter your Email"
            keyboardType="email-address"
          />
        )}
        name="email"
      />
      {errors.email && (
        <Text className={"text-red-500 mb-3"}>{errors.email.message}</Text>
      )}
      {/* password field */}
      <Text className="text-xl font-bold text-gray-700 mb-1">Password</Text>

      <Controller
        control={control}
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className={"bg-gray-100 border border-gray-300 rounded-md p-3 mb-8"}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter your Password"
            secureTextEntry
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text className={"text-red-500 mb-3"}>{errors.password.message}</Text>
      )}
      <CustomButton
        title="Sign In"
        onPress={handleSubmit(onSubmit)}
        className="w-full mt-10 bg-blue-500"
        textStyle="text-gray-50"
      />
      <View className="flex-row items-center my-2">
        <View className={"flex-1 h-px bg-gray-400"} />
        <Text className={"text-center text-2xl mx-8 my-4 text-gray-600"}>
          or
        </Text>
        <View className={"flex-1 h-px bg-gray-400"} />
      </View>
      <CustomButton
        IconLeft={() => (
          <Image
            source={google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        title="Continue with google"
        onPress={handleGoogleSignUp}
        className="w-full  border border-gray-300"
        textStyle="text-gray-700"
      />
      <View className="flex-row justify-center mt-6">
        <Text className="font-semibold text-base text-gray-700">
          Don't have an account yet?{" "}
        </Text>
        <Link href="/sign-up">
          <Text className="text-blue-600 underline font-semibold text-base">
            Sign up
          </Text>
        </Link>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
