import React, { useContext } from "react";
import { View, Text } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { myColors } from "../styles/Colors";
import { Styles } from "../styles/GlobalStyles";
import Button from "./Button";

export default function MyKeyboard() {
  const [firstNumber, setFirstNumber] = React.useState("");
  const [secondNumber, setSecondNumber] = React.useState("");
  const [operation, setOperation] = React.useState("");
  const [result, setResult] = React.useState<Number | null>(null);

  const handleNumberPress = (buttonValue: string) => {
    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue);
    }
  };
  const handleOperationPress = (buttonValue: string) => {
    setOperation(buttonValue);
    setSecondNumber(firstNumber);
    setFirstNumber("");
  };
  const clear = () => {
    setFirstNumber("");
    setSecondNumber("");
    setOperation("");
    setResult(null);
  };
  const getResult = () => {
    switch (operation) {
      case "+":
        clear();
        setResult(parseInt(firstNumber) + parseInt(secondNumber));
        break;
      case "-":
        clear();
        setResult(parseInt(firstNumber) - parseInt(secondNumber));
        break;
      case "*":
        clear();
        setResult(parseInt(firstNumber) * parseInt(secondNumber));
        break;
      case "/":
        clear();
        setResult(parseInt(firstNumber) / parseInt(secondNumber));
        break;
      case "%":
        clear();
        setResult(parseInt(firstNumber) % parseInt(secondNumber));
        break;
      default:
        clear();
        setResult(0);
    }
  };

  const firstNumberDisplay = () => {
    if (result !== null) {
      return (
        <Text
          style={
            result < 99999
              ? [Styles.screenFirstNumber, { color: myColors.result }]
              : [
                  Styles.screenFirstNumber,
                  { color: myColors.result, fontSize: 50 },
                ]
          }
        >
          {result.toString()}
        </Text>
      );
    }
    if (firstNumber && firstNumber.length < 6) {
      return <Text style={Styles.screenFirstNumber}>{firstNumber}</Text>;
    }
    if (firstNumber == "") {
      return <Text style={Styles.screenFirstNumber}>{"0"}</Text>;
    }
    if (firstNumber.length > 5 && firstNumber.length <= 7) {
      return (
        <Text style={[Styles.screenFirstNumber, { fontSize: 70 }]}>
          {firstNumber}
        </Text>
      );
    }
    if (firstNumber.length >= 8) {
      return (
        <Text style={[Styles.screenFirstNumber, { fontSize: 50 }]}>
          {firstNumber}
        </Text>
      );
    }
  };

  return (
    <View style={Styles.viewBottom}>
      {/* Input Box */}
      <View
        style={{
          height: 120,
          width: "90%",
          justifyContent: "flex-end",
          alignSelf: "center",
        }}
      >
        <Text style={Styles.screenSecondNumber}>
          {secondNumber}
          <Text style={{ color: "purple", fontSize: 50, fontWeight: "500" }}>
            {operation}
          </Text>
        </Text>
        {firstNumberDisplay()}
      </View>

      {/* Row 1*/}
      <View style={Styles.row}>
        <Button isGray title="C" onPress={clear} />
        <Button
          isGray
          title="+/-"
          onPress={() => handleOperationPress("+/-")}
        />
        <Button isGray title="%" onPress={() => handleOperationPress("%")} />
        <Button isBlue title="/" onPress={() => handleOperationPress("/")} />
      </View>

      {/* Row 2*/}
      <View style={Styles.row}>
        <Button title="7" onPress={() => handleNumberPress("7")} />
        <Button title="8" onPress={() => handleNumberPress("8")} />
        <Button title="9" onPress={() => handleNumberPress("9")} />
        <Button isBlue title="x" onPress={() => handleOperationPress("*")} />
      </View>

      {/* Row 3*/}
      <View style={Styles.row}>
        <Button title="4" onPress={() => handleNumberPress("4")} />
        <Button title="5" onPress={() => handleNumberPress("5")} />
        <Button title="6" onPress={() => handleNumberPress("6")} />
        <Button isBlue title="-" onPress={() => handleOperationPress("-")} />
      </View>

      {/* Row 4*/}
      <View style={Styles.row}>
        <Button title="1" onPress={() => handleNumberPress("1")} />
        <Button title="2" onPress={() => handleNumberPress("2")} />
        <Button title="3" onPress={() => handleNumberPress("3")} />
        <Button isBlue title="+" onPress={() => handleOperationPress("+")} />
      </View>

      {/* Row 5*/}
      <View style={Styles.row}>
        <Button title="." onPress={() => handleNumberPress(".")} />
        <Button title="0" onPress={() => handleNumberPress("0")} />
        <Button
          title="⌫"
          onPress={() => setFirstNumber(firstNumber.slice(0, -1))}
        />
        <Button isBlue title="=" onPress={() => getResult()} />
      </View>
    </View>
  );
}
