import DatePicker from "react-datepicker";
import { useField, useFormikContext } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import css from "./DateField.module.css";

export default function DateField({ ...props }) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props.name);

  return (
    <div>
      <div className={css.datePickerWrapper}>
        <DatePicker
          {...field}
          {...props}
          selected={(field.value && new Date(field.value)) || null}
          onChange={(val) => setFieldValue(field.name, val)}
          placeholderText="Booking date"
          dateFormat="MM/dd/yyyy"
          calendarStartDay={1}
          className={css.input}
          calendarClassName={css.calendar}
          popperPlacement="bottom"
        />
      </div>

      {meta.touched && meta.error ? (
        <div className={css.error}>{meta.error}</div>
      ) : null}
    </div>
  );
}
