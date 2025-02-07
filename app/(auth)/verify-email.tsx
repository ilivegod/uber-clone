import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const { isLoaded, signUp, setActive } = useSignUp();

  const handleVerification = async () => {
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
        router.replace("/(root)/(tabs)/home");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
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

      <CustomButton
        title="Verify"
        onPress={() => handleVerification}
        className="w-11/12 mt-8 bg-blue-600"
        textStyle="text-gray-50"
      />
    </View>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({});
