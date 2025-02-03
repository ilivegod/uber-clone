import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";

const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<any>([]);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text.length === 1 && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (
      event.nativeEvent.key === "Backspace" &&
      index > 0 &&
      code[index] === ""
    ) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View className={"flex-1 justify-center items-center bg-gray-100`"}>
      <Text className={"text-2xl font-bold mb-3 text-gray-800"}>
        Enter Verification Code
      </Text>
      <Text className="text-gray-800 font-semibold mb-9">
        We sent a verification code to your email
      </Text>
      <KeyboardAvoidingView className={"flex-row justify-between  w-10/12"}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(input) => (inputs.current[index] = input)}
            className={
              " w-14 h-16 text-center text-2xl font-bold  rounded-xl border-gray-400 border"
            }
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleCodeChange(text, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
          />
        ))}
      </KeyboardAvoidingView>
      <TouchableOpacity
        className={" mt-8 bg-blue-500 py-3 px-6 rounded-md"}
        onPress={() => console.log("Verify code:", code.join(""))}
      >
        <Text className={"text-white font-bold"}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({});
