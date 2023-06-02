import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import ResponsiveText from "../../components/RnText";
import { hp, wp } from "../../helpers/Responsiveness";
import Input from "../../components/Input";
import { globalPath } from "../../constants/globalPath";
import { _toast } from "../../constants/Index";

import { colors } from "../../constants/colorsPallet";
import RnButton from "../../components/RnButton";
import { useDispatch } from "react-redux";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import { getAllCard } from "../../redux/actions/user.actions";

const AddCard = ({ navigation, route }) => {
  const { title,data } = route.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState("");
  // const [expMonth, setExpMonth] = useState("");
  // const [expYear, setExpYear] = useState("");
  const [expDate, setExpDate] = useState("");
  const [name, setName] = useState("");
  const [errorString, setErrorString] = useState("");

  const [cvc, setCvc] = useState("");
  const handleCardNumberChange = (text) => {
    // Remove all non-digit characters
    const cleanedText = text.replace(/\D/g, "");
    // Format the input with 4-digit groups separated by spaces
    const formattedText = cleanedText.replace(/(\d{4})/g, "$1 ").trim();
    setNumber(formattedText);
  };
  const handleExpiryDateChange = (text) => {
    // Remove all non-digit characters
    const cleanedText = text.replace(/\D/g, "");
    // Format the input with a forward slash after the second digit
    let formattedText = "";
    if (cleanedText.length > 0) {
      formattedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2)}`;
    }
    setExpDate(formattedText);
  };

  useEffect(() => {
    if (data) {
      setName(data.name)
      setNumber(data.cardNumber)
      setExpDate(data.expiryMonth+'/'+data.expiryYear)
      setCvc(data.cvc)
    }

  }, [])
  


  const Submit = async () => {
    setErrorString('')
    if (number=='') {
      setErrorString('Card number is required!')
      return false
    }else if (expDate=='') {
      setErrorString('Expiry date is required!')
      return false
    }else if (cvc=='') {
      setErrorString('CVV is required!')
      return false
    }
    const parts = expDate.split('/');

    const obj = {
      "id": data?.id?data?.id:0,
      "name": name,
      "cardNumber": number,
      "expiryMonth": parts[0],
      "expiryYear": parts[1],
      "cvc": cvc
    }
    try {
      setLoading(true);
      if (data?.id) {
        var res = await Api.put(urls.EDIT_CARD, obj);
      } else {
        var res = await Api.post(urls.ADD_CARD, obj);
      }
      console.log("res", res);
      if (res && res.success == true) {
        setLoading(false);
        dispatch(getAllCard());
        _toast(res.message);
        navigation.goBack();
      } else {
        _toast(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
    }
  };

  return (
    <Container
      title={title}
      backgroundColor={colors.white}
      navigation={navigation}
    >
      <View style={{ margin: wp(5) }}>
        <ResponsiveText>Name of Card Holder</ResponsiveText>
        <Input
          placeholder={"Name of Card Holder"}
          value={name}
          onChnageText={(text) => setName(text)}
          leftIcon={globalPath.profile}
        />
        <ResponsiveText margin={[hp(2), 0, 0, 0]}>Card Number</ResponsiveText>
        <Input
          placeholder={"2398 2873 8393 8239"}
          onChnageText={(text) => handleCardNumberChange(text)}
          value={number}
          maxLength={19}
          leftIcon={globalPath.card_number}
        />
        <ResponsiveText margin={[hp(2), 0, 0, 0]}>Expiry Date</ResponsiveText>
        <Input
          placeholder={"MM/YY"}
          keyboardType="numeric"
          maxLength={5} // MM/YY format
          value={expDate}
          onChnageText={handleExpiryDateChange}
          leftIcon={globalPath.expiry_date}
        />
        <ResponsiveText margin={[hp(2), 0, 0, 0]}>CVV</ResponsiveText>
        <Input
          placeholder={"***"}
          leftIcon={globalPath.cvv}
          value={cvc}
          maxLength={3}
          // secureTextEntry
          onChnageText={(text) => setCvc(text)}
        />
         <ResponsiveText color={colors.red} margin={[20, 0, 0, 10]}>
            {errorString}
          </ResponsiveText>
        <RnButton margin={[hp(5), 0, 0, 0]} title={"SAVE"} onPress={Submit} />
      </View>
    </Container>
  );
};

export default AddCard;

const styles = StyleSheet.create({});
