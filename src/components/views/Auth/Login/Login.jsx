import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";

import { swal } from "../../../../utils/swal";
import "../Auth.css";

const { REACT_APP_API_ENDPOINT } = process.env;

export const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    userName: "",
    password: "",
  };

  const required = "* Campo obligatorio";

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, "La cantidad mínima de caracteres es 4")
      .required(required),
    password: Yup.string().required(required),
  });

  const onSubmit = () => {
    const { userName, password } = values;

    fetch(`${REACT_APP_API_ENDPOINT}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.status_code === 200) {
          localStorage.setItem("token", data?.result?.token);
          localStorage.setItem("userName", data?.result?.user.userName);
          navigate("/", { replace: true });
        } else {
          swal();
        }
      });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, values, errors, touched, handleBlur } =
    formik;

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>
        <div>
          <label>Nombre de usuario</label>
          <input
            type="text"
            name="userName"
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.userName && touched.userName ? "error" : ""}
          />
          {errors.userName && touched.userName && <div>{errors.userName}</div>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "error" : ""}
          />
          {errors.password && touched.password && <div>{errors.password}</div>}
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
        <div>
          <Link to="/register">Registrarme</Link>
        </div>
      </form>
    </div>
  );
};
