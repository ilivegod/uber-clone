import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import image1 from "../../assets/images/7473101_3682361.jpg";
import image2 from "../../assets/images/7334370_3624925.jpg";
import image3 from "../../assets/images/10780448_19199058.jpg";

const onboardingData = [
  {
    id: 1,
    title: " Find a Ride Anytime, Anywhere",
    description:
      "🚗 Need a ride? We’ve got you covered! Easily book a ride anytime, anywhere, with just a few taps. Reliable drivers are always nearby to take you where you need to go.",
    image: image1,
  },
  {
    id: 2,
    title: " Safe & Secure Rides",
    description:
      "🔒 Your safety is our priority. Track your ride in real time, share trip details with loved ones, and enjoy peace of mind with verified drivers and secure payments.",
    image: image2,
  },
  {
    id: 3,
    title: " Affordable & Convenient Travel",
    description:
      "💰 Get around the city without breaking the bank. Choose from multiple ride options, enjoy upfront pricing, and experience seamless cashless payments.",
    image: image3,
  },
];

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        className="w-full flex justify-end items-end p-5"
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
      >
        <Text className="text-black text-md font-semibold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-4 h-1 mx-1 bg-gray-300 rounded-full" />}
        activeDot={<View className="w-4 h-1 mx-1 bg-blue-500 rounded-full" />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboardingData.map((item) => (
          <View key={item.id} className={" items-center justify-center px-6"}>
            <Image
              source={item.image}
              className={"w-64 h-64 mb-10"}
              resizeMode="contain"
            />
            <Text
              className={"text-3xl font-bold text-center mb-4 text-gray-800"}
            >
              {item.title}
            </Text>
            <Text className={"text-base text-center text-gray-600 mb-10"}>
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
