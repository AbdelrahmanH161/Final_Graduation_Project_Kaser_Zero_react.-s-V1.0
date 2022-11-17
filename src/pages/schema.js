import * as yup from "yup";

export const schema = yup.object().shape({
  categoryId: yup.string().required("Choose category"),
  color: yup.string().required("Choose color"),
  title: yup
    .string()
    .min(4, "must enter more than 4 characters")
    .max(50, "Maximum 50 charcters")
    .required("Product title is required"),
  price: yup
    .number("must be a number")
    .moreThan(0, "This price is not valid")
    .required("Product price is required"),
  ableToExchange: yup.boolean(),
  brand: yup.string().required("Choose brand"),
  durationOfUse: yup.string().required("Choose duration of use"),
  firstFilter: yup.string().required("This field is required"),
  secondFilter: yup.string().required("This field is required"),
  thirdFilter: yup.string().required("This field is required"),
  files: yup.array().max(10, "Maximum 10 photos").min(1,"This field is required"),
  description: yup
    .string()
    .required(
      "The description increase ratio of selling your product, Please enter description"
    ),
});
