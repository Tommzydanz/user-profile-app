import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import Screen from "../../components/Screen/Screen";
import { editDetailsValidationSchema } from "../../utils/validationSchema.utils";
import { useFormik } from "formik";;
import colors from "../../configs/colors.config";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { WhiteLoader } from "../../components/Loader/Loader";
import { useUpdateProfileMutation } from "@store/profile";
import { notify, notifySuccess } from "@utils/notify";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { IBottomTabParamList } from "@navigation/interfaces";
import { saveData } from "@utils/Async.utils";

const EditProfile = () => {
  const { navigate } = useNavigation<NavigationProp<IBottomTabParamList>>();
  const headerHeight = useHeaderHeight();
  const [requestUpdate, { isLoading }] = useUpdateProfileMutation();

  const { values, ...formik } = useFormik({
    initialValues: {
      id: "2",
      name: "",
      job: "",
    },
    validationSchema: editDetailsValidationSchema,
    onSubmit: () => handleSave(),
  });

  const handleSave = async () => {
    requestUpdate(values)
      .unwrap()
      .then(async (response) => {
        console.log(response);
        notifySuccess("Saved Successfully", "Changes made successfully");
         // Save the updated profile data in AsyncStorage
        await saveData('profile', JSON.stringify(values));

      })
      .catch((error) => {
        console.log(error);
        notify("Cannot Save Update", "Update failed");
      });
      navigate('Profile', {
        name: values.name,
        job: values.job,
      
    })
  };

  return (
    <Screen
      statusBarStyle="dark-content"
      style={styles.screen}
      statusBarColor={colors.white}
    >
      <ScrollView
        style={[styles.container, { marginTop: headerHeight }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.welcomeText}>Edit Profile</Text>
        <View style={styles.formContainer}>
          <Input
            keyboardType={"default"}
            label={"Name"}
            labelHolder="Name"
            isInvalid={formik.touched.name && !!formik.errors.name}
            onBlur={formik.handleBlur("name")}
            onUpdateValue={formik.handleChange("name")}
            value={values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <Text style={styles.errorText}>{formik.errors.name}</Text>
          ) : null }

          <Input
            keyboardType={"default"}
            label={"Job Title"}
            labelHolder="Job Title"
            isInvalid={formik.touched.job && !!formik.errors.job}
            onBlur={formik.handleBlur("job")}
            onUpdateValue={formik.handleChange("job")}
            value={values.job}
          />
          {formik.touched.job && formik.errors.job ? (
            <Text style={styles.errorText}>{formik.errors.job}</Text>
          ) : null}
          <Button onPress={formik.handleSubmit} disabled={isLoading}>
            {isLoading ? <WhiteLoader /> : <Text>Save</Text>}
          </Button>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "500",
    alignSelf: "flex-start",
  },
  formContainer: {
    paddingTop: 40,
    marginBottom: 41,
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    margin: 8,
  },
  highlight: { backgroundColor: colors.transparent },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
});
