import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import image1 from "../../assets/images/7473101_3682361.jpg";
import image2 from "../../assets/images/7334370_3624925.jpg";
import image3 from "../../assets/images/10780448_19199058.jpg";
import CustomButton from "@/components/CustomButton";

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
  const isLastSlide = activeIndex === onboardingData.length - 1;

  const handleNextPress = () => {
    {
      isLastSlide
        ? router.replace("/(auth)/sign-up")
        : swiperRef.current?.scrollBy(1);
    }
  };
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
              className={"w-80 h-80 mb-6"}
              resizeMode="contain"
            />
            <Text
              className={
                "text-4xl leading-normal font-bold text-center mb-7 text-gray-800"
              }
            >
              {item.title}
            </Text>
            <Text
              className={
                "text-lg font-medium leading-relaxed text-center text-neutral-700 mb-10"
              }
            >
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        onPress={handleNextPress}
        title={isLastSlide ? "Get Started" : "Next"}
        className="w-11/12 mt-10 bg-blue-600"
      />
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
