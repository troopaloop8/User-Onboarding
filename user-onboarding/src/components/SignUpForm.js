import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik, Form, Field, FieldArray } from "formik";
import * as yup from "yup";

const SignUpForm = ({ touched, errors, status }) => {
  const [user, setUser] = useState([]);

  console.log("user", user);
  useEffect(() => {
    status && setUser(users => [...users, status]);
  }, [status]);

  return (
    <div>
      <p>Placeholder</p>
      <Form>
        <label>
          Name:
          <Field type="text" name="name" placeholder="name" />
          {touched.name && errors.name && (
            <p className="errors">{errors.name}</p>
          )}
        </label>
        <label>
          Email:
          <Field type="text" name="email" placeholder="email" />
          {touched.email && errors.email && (
            <p className="errors">{errors.email}</p>
          )}
        </label>
        <label>
          Password:
          <Field type="password" name="password" placeholder="password" />
          {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
        </label>
        <label>
          Confirm Password:
          <Field type="password" name="confirm" placeholder="password" />
          {touched.confirm && errors.confirm && (
            <p className="errors">{errors.confirm}</p>
          )}
        </label>
        <label>
          By clicking here, you accept our terms of service.
          <Field type="checkbox" name="terms" />
          {touched.checkbox && errors.checkbox && (
            <p className="errors">{errors.checkbox}</p>
          )}
        </label>
        <button>Submit</button>
      </Form>
      <div>
        {user.map(
          user =>
            user.name &&
            user.email && (
              <div>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
              </div>
            )
        )}
      </div>

      {/* {user.name && user.email && (
        
      )} */}
    </div>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    id: Date.now(),
    name: "",
    email: "",
    password: "",
    confirm: "",
    terms: false
  }),
  validationSchema: yup.object().shape({
    name: yup.string().required("Your name is required!"),
    email: yup
      .string()
      .email("email not valid")
      .required("Please enter a valid email address!"),
    password: yup.string().required("Password is required!"),
    confirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    checkbox: yup.bool().oneOf([true], "You must accept the terms of service")
  }),
  handleSubmit: (values, { resetForm, setStatus }) => {
    // console.log("Submitting!", formikBag)
    // POST body === {}
    axios
      .post("https://reqres.in/api/users/", values)
      .then(response => {
        console.log(response);
        setStatus(response.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(SignUpForm);
