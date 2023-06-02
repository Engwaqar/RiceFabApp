import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import { colors } from "../constants/colorsPallet";
import { handleMargin, handlePadding } from "../constants/theme";
import Fonts from "../helpers/Fonts";
import { hp, wp } from "../helpers/Responsiveness";
import Icon from "./Icon";
import Feather from "react-native-vector-icons/Feather";
const Input = ({
  iconSize,
  height,
  color,
  margin,
  backgroundColor,
  padding,
  zIndex,
  fontFamily,
  tintColor,
  placeholder,
  iconMargin,
  rightIconMargin,
  placeholderTextColor,
  width,
  containerStyle,
  secureTextEntry,
  onChnageText,
  fontSize,
  value,
  onSubmitEditing,
  keyboardType,
  searchBox,
  shadowColor,
  inputHeight,
  ...props
}) => {
  
  const updateSecureTextEntry = () => {
    setVisible(!visible);
  };
  const [visible, setVisible] = React.useState(true);
  return (
    <KeyboardAvoidingView>
      <View
        style={[
          styles.container,

          margin ? handleMargin(margin) : undefined,
          padding ? handlePadding(padding) : undefined,
          props.style,
          height && { height },
          width && { width },
          {
            zIndex: zIndex,
            backgroundColor: backgroundColor ? backgroundColor : colors.lightGrey,
            shadowColor: shadowColor ? shadowColor : colors.lightGrey,
          },
          containerStyle,
        ]}
      >
        {props.leftIcon && (
          <Icon
            tintColor={tintColor ? tintColor : colors.black}
            margin={iconMargin ? iconMargin : [0, 10, 0, -4]}
            source={props.leftIcon}
            size={iconSize}
          />
        )}

        <TextInput
          value={value && value}
          {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
          editable={props.editable}
          keyboardType={keyboardType}
          style={[
            fontSize && { fontSize },
            inputHeight && {height: inputHeight },

            styles.Input,
            fontFamily && { fontFamily: Fonts[fontFamily] },
            (onSubmitEditing = props.onSubmitEditing),
            props.centerText
              ? { textAlign: "center", paddingLeft: 0 }
              : undefined,
            props.textStyle,
            ,
            {
              color: color ? color : colors.black,
            },
          ]}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : colors.grey1
          }
          placeholder={placeholder ? placeholder : undefined}
          // secureTextEntry={showPassword ? true : false}
          secureTextEntry={secureTextEntry ? visible : false}
          onChangeText={onChnageText ? (txt) => onChnageText(txt) : null}
        />

        {secureTextEntry && (
          <TouchableOpacity
            style={styles.showPasswordBtn}
            onPress={updateSecureTextEntry}
          >
            {visible ? (
              <Feather name="eye-off" size={15} style={styles.Feather} />
            ) : (
              <Feather name="eye" size={15} style={styles.Feather} />
            )}
            {/* <Icon
            tintColor={tintColor ? tintColor : colors.grey}
            margin={rightIconMargin ? rightIconMargin : [0, 10, 0, -4]}
            // style={gStyles.alS_End}
            size="s4"
            // source={showPassword ? iconPath.EYE_ICON : iconPath.EYE_OFF_ICON}
          /> */}
          </TouchableOpacity>
        )}
        {searchBox && (
          <TouchableOpacity
            style={styles.showPasswordBtn}
          // onPress={updateSecureTextEntry}
          >
            <Feather name="search" size={20} style={styles.Feather} />
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};
export default Input;

const styles = StyleSheet.create({
  container: {
    height: hp(6),
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    backgroundColor: colors.green2,
    borderRadius: 8,
    paddingLeft: 10,
    marginTop:hp(2)
  },
  Input: {
    borderRadius: 5,
    flex: 1,
    // paddingRight: 15,
    fontFamily: Fonts.Regular,
    color: colors.black,
    // height:wp(30),
    textAlignVertical: 'top',
    backgroundColor:colors.lightGrey
  },
  Feather: {
    marginRight: 5,

    color: colors.black,
  },
  showPasswordBtn: {
    height: "80%",
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
});
