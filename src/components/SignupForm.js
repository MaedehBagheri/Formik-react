import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Input from "../common/Input";
import RadioInput from "../common/radioInput";
import SelectComponent from "../common/selectComponent";
import CheckBoxInput from "../common/checkBoxInput"
const radioOptions = [
  {
    label: "Male",
    value: "0",
  },
  {
    label: "Female",
    value: "1",
  },
];

const checkBoxOptions = [
  {
    label: "React.js",
    value: "React.js",
  },
  {
    label: "Vue.js",
    value: "Vue.js",
  },
];

const selectOptions = [
  {
    label: "select nationality ...",
    value: "",
  },
  {
    label: "Iran",
    value: "IR",
  },
  {
    label: "Germany",
    value: "GR",
  },
  {
    label: "USA",
    value: "US",
  },
];

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
  gender: "",
  nationality: "",
  intrests: [],
  terms: false,
};

const onSubmit = (values) => {
  axios
    .post("http://localhost:3000/users/1", values)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.response.data));
}
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is Required")
    .min(4, "Name length is too short"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is Required"),
  phoneNumber: Yup.string()
    .required("Phone Number is Required")
    .matches(/^[0-9]{11}$/, "Phone Number should be 11 digit"),
  password: Yup.string().required("Password is Required"),
  passwordConfirm: Yup.string().test(
    "password-match",
    "Password must match",
    function (value) {
      return this.parent.password === value;
    }
  ),
  gender: Yup.string().required("Gender is Required"),
  nationality: Yup.string().required("select nationality !"),
  intrests: Yup.array().min(1).required("at least select on expertise"),
  terms: Yup.boolean()
    .required("Accept Terms & Conditions is required")
    .oneOf([true], "Accept Terms & Conditions is required"),
});



function SignUpForm() {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    axios
      .get(
        "http://localhost:3000/users"
      )
      .then((res) => setFormData(res.data[0]))
      .catch((err) => console.log(err));
  }, []);

  const formik = useFormik({
    initialValues: formData || initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });
  console.log(formik.values);
  return (
    <>
    <h1>Login !</h1>
    
    <form className="form" onSubmit={formik.handleSubmit}>
      <Input label="Name" name="name" formik={formik} />
      <Input label="Email" name="email" formik={formik} />
      <Input label="Phone Number" name="phoneNumber" formik={formik} />
      <Input label="Password" name="password" formik={formik} type="password" />
      <Input
        label="Password Confirmation"
        name="passwordConfirm"
        formik={formik}
        type="password"
      />
      <RadioInput formik={formik} name="gender" radioOptions={radioOptions} />
      <SelectComponent
        formik={formik}
        name="nationality"
        selectOptions={selectOptions}
      />
      <CheckBoxInput
        formik={formik}
        name="intrests"
        checkBoxOptions={checkBoxOptions}
      />
      <div className="formControl align">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          value={true}
          onChange={formik.handleChange}
          onClick={() => formik.setFieldTouched("terms", true)}
          checked={formik.values.terms}
        />
        <label htmlFor="terms">Terms and Conditions</label>
        {formik.errors.terms && formik.touched.terms && (
          <div className="error"> {formik.errors.terms}</div>
        )}
      </div>
      {console.log(formik.touched)}
      <div className="buttons">
        <button type="submit" disabled={!formik.isValid}>
          submit
        </button>
      
      </div>
    </form>
    </>
  );
}

export default SignUpForm;