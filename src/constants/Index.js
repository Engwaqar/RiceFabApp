import { Platform, ToastAndroid } from "react-native";

function _toast(string) {
    if (Platform.OS == 'ios') {
        alert(string);
    } else {
        ToastAndroid.showWithGravity(
            string,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
        );
    }
}

function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }
module.exports={
    _toast:_toast,
    isImage:isImage,
}