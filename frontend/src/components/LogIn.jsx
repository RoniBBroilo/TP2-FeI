import { useFormik } from "formik";
import { loginSchema } from "../schemas/index";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogIn = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.status === 200) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
          toast.success("¡Paciente registrado con éxito!", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          resetForm();
          setTimeout(() => {
            window.location = "/";
          }, 3000);
        } else {
          toast.error("Inicio de sesión fallido. Verifica tus credenciales.", {
            position: "bottom-center",
            autoClose: 5000,
          });
        }
      } catch (error) {
        toast.error("Error en el servidor. Intenta nuevamente más tarde.", {
          position: "bottom-center",
          autoClose: 5000,
        });
      }
    },
  });

  return (
    <section className="flex flex-col justify-center items-center pt-[120px] pb-[70px]">
      <div className="flex flex-col items-center w-[311px] sm:w-[580px]">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col w-[340px] rounded-[10px] shadow-md sm:w-[580px]"
        >
          <div className="flex flex-col gap-[15px] rounded-t-[10px] items-center p-5 bg-[#C8E5C6]">
            <h1 className="text-2xl font-Nobile text-[#3b3b3b]">Ingresar</h1>
            <p className="text-[14px] font-Muli">
              Con correo electrónico y contraseña
            </p>
          </div>
          <div className="flex flex-col px-[25px] py-[30px] gap-[30px]">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-[10px]">
                <input
                  type="email"
                  placeholder="Correo electrónico:"
                  id="email"
                  name="email"
                  className={`h-[50px] border-b-[1px] border-[#75b781] placeholder:font-Muli ${
                    formik.touched.email && formik.errors.email
                      ? "border-[#E50505]"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="flex gap-1 text-[#E50505] text-[13px] font-poppins ">
                    <img
                      src="/icons/form/error.svg"
                      width={18}
                      height={18}
                      alt="error"
                    />
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-[10px]">
                <input
                  type="password"
                  placeholder="Contraseña:"
                  id="password"
                  name="password"
                  className={`h-[50px] border-b-[1px] border-[#75b781] placeholder:font-Muli ${
                    formik.touched.password && formik.errors.password
                      ? "border-[#E50505]"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="flex gap-1 text-[#E50505] text-[13px] font-poppins ">
                    <img
                      src="/icons/form/error.svg"
                      width={18}
                      height={18}
                      alt="error"
                    />
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
            </div>
            <Button
              text="Ingresar"
              color="primary"
              disabled={formik.isSubmitting || !formik.isValid}
              type="submit"
            />
          </div>
          <ToastContainer className="!bottom-10" />
        </form>
      </div>
    </section>
  );
};

export default LogIn;
