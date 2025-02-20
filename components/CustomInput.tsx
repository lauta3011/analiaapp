import React, { useState } from "react";
import { View } from "react-native";
import { Text, TextInput, Checkbox, RadioButton } from "react-native-paper";

const CustomInput = ({ label, type, needText, options, value, setValue, error }: any) => {
  return (
    <View style={{ marginVertical: 10 }}>
      {type === "text" && (
        <TextInput
        label={label}
          mode="outlined"
          value={value}
          onChangeText={setValue}
          error={!!error}
        />
      )}
      {type === "number" && (
        <TextInput
        label={label}
          mode="outlined"
          value={value}
          keyboardType="numeric"
          onChangeText={setValue}
          error={!!error}
        />
      )}
      {type === "checkbox" && (
        <Checkbox.Item
          label={label}
          status={value ? "checked" : "unchecked"}
          onPress={() => setValue(!value)}
        />
      )}
      {type === "radiobutton" && options && (
        <RadioButton.Group onValueChange={setValue} value={value}>
          {options?.map((option: any, index: number) => (
            <RadioButton.Item key={index} label={option.label} value={option.value} />
          ))}
        </RadioButton.Group>
      )}
      {error && type === "text" && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
};

export default CustomInput;
