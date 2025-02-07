import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomButton from "@/components/CustomButton";
import google from "@/assets/icons/google.png";
import { Link, useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      emailAddress: "",
      password: "",
    },
  });

  // Handle submission of sign-up form
  const onSignUpPress = async (data: {
    emailAddress: string;
    password: string;
  }) => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: data.emailAddress,
        password: data.password,
      });

      console.log("email and password", data.emailAddress, data.password);

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
      router.replace("/(auth)/verify-email");
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      Alert.alert("Error", err.errors[0].longMessage);
      console.log(err);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.log(err);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handleGoogleSignUp = () => {
    console.log("google signup");
  };

  if (pendingVerification) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-3xl font-bold mb-3 text-gray-800">
          Check your email ✨
        </Text>
        <Text className="text-gray-500 text-lg font-semibold mb-9">
          We sent a verification code to your email
        </Text>
        <KeyboardAvoidingView className="w-10/12">
          <Text className="text-gray-700 text-lg font-medium mb-2">
            Enter your verification code
          </Text>
          <TextInput
            className="w-full h-14 px-4 text-xl border-gray-400 border rounded-xl"
            keyboardType="number-pad"
            maxLength={6}
            value={code}
            onChangeText={setCode}
            placeholder="Enter code"
          />
        </KeyboardAvoidingView>

        <TouchableOpacity
          className="border border-gray-500 bg-blue-600 px-8 py-3 rounded-lg mt-4"
          onPress={onVerifyPress}
        >
          <Text className="text-gray-50">Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center p-5 ">
      <Text className="text-3xl font-bold mb-9 text-center text-gray-800">
        Create your account
      </Text>
      {/* name field  */}
      <Text className="text-xl font-bold text-gray-700 mb-1">Name</Text>
      <Controller
        control={control}
        rules={{ required: "Name is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className={"bg-gray-100 border border-gray-300 rounded-md p-3 mb-5"}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter your name"
          />
        )}
        name="name"
      />
      {errors.name && (
        <Text className={"text-red-500 mb-3"}>{errors.name.message}</Text>
      )}
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
        name="emailAddress"
      />
      {errors.emailAddress && (
        <Text className={"text-red-500 mb-3"}>
          {errors.emailAddress.message}
        </Text>
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
        title="Sign Up"
        onPress={handleSubmit(onSignUpPress)}
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
        title="Sign Up with google"
        onPress={handleGoogleSignUp}
        className="w-full  border border-gray-300"
        textStyle="text-gray-700"
      />
      <View className="flex-row justify-center mt-6">
        <Text className="font-semibold text-base text-gray-700">
          Already have an account?{" "}
        </Text>
        <Link href="/sign-in">
          <Text className="text-blue-600 underline font-semibold text-base">
            Log in
          </Text>
        </Link>
      </View>
      {/* <ReactNativeModal isVisible={false}>
        <View className="px-7 bg-gray-100 py-9 rounded-2xl min-h-[300px]">
          <Text>modal</Text>
        </View>
      </ReactNativeModal> */}
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
