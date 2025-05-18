import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import css from "./DetailsCarLeft.module.css";
import DateField from "../DateField/DateField";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Enter your name"),
  email: Yup.string().email("Invalid email").required("Enter your email"),
  date: Yup.date().required("Select a date"),
  comment: Yup.string(),
});

export default function BookingForm() {
  return (
    <div className={css.bookingForm}>
      <h3 className={css.formTitle}>Book your car now</h3>
      <p className={css.formSubtitle}>
        Stay connected! We are always ready to help you.
      </p>

      {/* Formik handles form state and validation */}
      <Formik
        initialValues={{ name: "", email: "", date: "", comment: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Booking submitted:", values);
          toast.success("Оренда успішно оформлена!"); // Show success toast
          resetForm(); // Clear form after submit
        }}
      >
        <Form className={css.form}>
          {/* Name input */}
          <Field name="name" placeholder="Name*" className={css.input} />
          <ErrorMessage name="name" component="div" className={css.error} />

          {/* Email input */}
          <Field name="email" placeholder="Email*" className={css.input} />
          <ErrorMessage name="email" component="div" className={css.error} />

          {/* Custom date picker field */}
          <DateField name="date" />

          {/* Comment textarea */}
          <Field
            name="comment"
            as="textarea"
            placeholder="Comment"
            className={css.textarea}
          />
          <ErrorMessage name="comment" component="div" className={css.error} />

          {/* Submit button */}
          <div className={css.buttonWrapper}>
            <button type="submit" className={css.button}>
              Send
            </button>
          </div>
        </Form>
      </Formik>

      {/* Toast container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
