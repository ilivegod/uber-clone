import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TouchableOpacityProps } from "react-native";
import React from "react";

interface CustomButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  title: string;
  IconLeft?: any;
  IconRight?: any;
  className?: string;
  textStyle?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  title,
  IconLeft,
  IconRight,
  className,
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full rounded-2xl flex flex-row justify-center p-3 items-center ${className}`}
    >
      {IconLeft && <IconLeft />}
      <Text className={`text-lg font-bold ${textStyle}`}>{title}</Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
