import { StyleSheet, View, Alert, Text } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../utils/date";
import { GlobalStyles } from "../../constants/styles";

function QuoteForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    // amount: "",
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
      // isValid: defaultValues ? true : false,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    // Crear un objeto Date solo si inputValues.date es una cadena no vacía
    const quoteData = {
      // amount: +inputValues.amount,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const dateIsValid = quoteData.date.toString() !== "Invalid Date";
    const descriptionValid = quoteData.description.trim().length > 0;

    if (!dateIsValid || !descriptionValid) {
      setInputs((curInputValues) => {
        return {
          date: { value: curInputValues.date.value, isValid: dateIsValid },
          description: {
            value: curInputValues.description.value,
            isValid: descriptionValid,
          },
        };
      });
      // Alert.alert("Invalid input", "please check your input values");
      return;
    }
    onSubmit(quoteData);
  }

  const formIsInvalid = !inputs.date.isValid || !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <View style={styles.inputsRow}>
        {/* <Input
          label="Amount"
          textInputConfig={{
            KeyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValues.amount,
          }}
        /> */}
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <Input
          label="Description"
          invalid={!inputs.description.isValid}
          textInputConfig={{
            multiline: true,
            onChangeText: inputChangeHandler.bind(this, "description"),
            value: inputs.description.value,
          }}
        />
      </View>
      {formIsInvalid && <Text style={styles.errorText}>Invalid Inputs</Text>}
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {/* {isEditing ? "Update" : "Add"} */}
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default QuoteForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
    flex: 1,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  descriptionContainer: {
    flex: 1,
    maxHeight: 150,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8
  }
});
