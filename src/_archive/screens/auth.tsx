import * as React from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
  FirebaseRecaptchaVerifier,
} from "expo-firebase-recaptcha";
// import { initializeApp, getApp } from "firebase/app";
import { app } from "../../../src/firebase";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";

// Initialize Firebase JS SDK
// https://firebase.google.com/docs/web/setup
/*try {
  initializeApp({
    ...
  });
} catch (err) {
  // ignore app already initialized error in snack
}*/

export default function App() {
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [verificationId, setVerificationId] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");
  const firebaseConfig = app ? app.options : undefined;
  const [message, showMessage] = React.useState(
    !firebaseConfig || Platform.OS === "web"
      ? {
          text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.",
          color: "black",
        }
      : undefined
  );
  const attemptInvisibleVerification = true;
  const auth = getAuth();

  const formatPhoneNumber = (phoneNumber: string) => {
    if (!phoneNumber.startsWith("+")) {
      console.log("+1" + phoneNumber);
      return "+1" + phoneNumber;
    }
    return phoneNumber;
  };

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={attemptInvisibleVerification}
      />
      <Text style={{ marginTop: 20 }}>Enter phone number</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        placeholder="+1 999 999 9999"
        autoFocus
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={(phoneNumber) =>
          setPhoneNumber(formatPhoneNumber(phoneNumber))
        }
      />
      <Button
        title="Send Verification Code"
        disabled={!phoneNumber}
        onPress={async () => {
          // First, let's make sure the phone number has a country code
          const originalNumber = phoneNumber;
          // The FirebaseRecaptchaVerifierModal ref implements the
          // FirebaseAuthApplicationVerifier interface and can be
          // passed directly to `verifyPhoneNumber`.
          try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              // TODO: This needs a proper
              // @ts-ignore
              recaptchaVerifier.current
              // new FirebaseRecaptchaVerifier(token)
            );
            setVerificationId(verificationId);
            showMessage({
              text: "Verification code has been sent to your phone.",
              color: "black",
            });
          } catch (err: any) {
            showMessage({
              text: `Make sure you enter a country code.
            
            Error: ${err?.message}`,
              color: "red",
            });
          }
        }}
      />
      <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        editable={!!verificationId}
        placeholder="123456"
        onChangeText={setVerificationCode}
      />
      <Button
        title="Confirm Verification Code"
        disabled={!verificationId}
        onPress={async () => {
          try {
            // const phoneProvider = new PhoneAuthProvider(auth);
            const credential = PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            );

            const userCredential = await signInWithCredential(auth, credential);
            // TODO: Store in AsyncStorage (protected from upgrade)
            showMessage({
              text: "Phone authentication successful 👍",
              color: "blue",
            });
          } catch (err: any) {
            showMessage({ text: `Error: ${err.message}`, color: "red" });
          }
        }}
      />
      {message ? (
        <TouchableOpacity
          style={[
            StyleSheet.absoluteFill,
            // @ts-ignore
            { backgroundColor: 0xffffffee, justifyContent: "center" },
          ]}
          onPress={() => showMessage(undefined)}
        >
          <Text
            style={{
              color: message.color || "blue",
              fontSize: 17,
              textAlign: "center",
              margin: 20,
            }}
          >
            {message.text}
            Tap to close
          </Text>
        </TouchableOpacity>
      ) : undefined}
      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
    </View>
  );
}
