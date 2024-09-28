import { useFormik } from "formik";
import { registerPatientSchema } from "../schemas/index";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FormPatient({ onBack }) {
  const formik = useFormik({
    initialValues: {
      dni: "",
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: registerPatientSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/registrar_paciente",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (response.status === 201) {
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
            window.location = "/login";
          }, 3000);
        } else {
          toast.error("Error al registrar el paciente. Intenta de nuevo.", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Ocurrió un error. Intenta de nuevo más tarde.", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    },
  });

  return (
    <div className="flex flex-col items-center w-[340px] sm:w-[590px] lg:w-[990px] xl:w-[980px] mac:w-[1040px] hd:w-[1036px] fullhd:w-[1120px]">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-[340px] rounded-[10px] shadow-md sm:w-[590px] lg:w-[990px]"
      >
        <div className="flex flex-col gap-[15px] rounded-t-[10px] items-center p-5 bg-[#C8E5C6] lg:items-start lg:px-[60px]">
          <h1 className="text-2xl font-Nobile text-[#3b3b3b]">Registro</h1>
          <p className="text-[14px] font-Muli text-center">
            Para comenzar necesitamos conocerte un poco más
          </p>
        </div>
        <div className="flex flex-col px-[25px] py-[30px] gap-[30px] lg:px-[60px] lg:gap-[60px]">
          <div className="flex flex-col lg:gap-5 lg:flex-row">
            <div className="flex flex-col">
              <input
                type="number"
                placeholder="DNI:"
                id="dni"
                name="dni"
                className={`h-[50px] border-b-[1px] border-[#75b781] placeholder:font-Muli lg:w-[417px] ${
                  formik.touched.dni && formik.errors.dni
                    ? "border-[#E50505]"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dni}
              />
              {formik.touched.dni && formik.errors.dni ? (
                <div className="flex gap-1 text-[#E50505] text-[13px] font-poppins mt-1">
                  <img
                    src="/icons/form/error.svg"
                    width={18}
                    height={18}
                    alt="error"
                  />
                  {formik.errors.dni}
                </div>
              ) : null}
              <input
                type="text"
                placeholder="Nombre:"
                id="nombre"
                name="nombre"
                className={`h-[50px] border-b-[1px] border-[#75b781] placeholder:font-Muli lg:w-[417px] ${
                  formik.touched.nombre && formik.errors.nombre
                    ? "border-[#E50505]"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
              />
              {formik.touched.nombre && formik.errors.nombre ? (
                <div className="flex gap-1 text-[#E50505] text-[13px] font-poppins mt-1">
                  <img
                    src="/icons/form/error.svg"
                    width={18}
                    height={18}
                    alt="error"
                  />
                  {formik.errors.nombre}
                </div>
              ) : null}
              <input
                type="text"
                placeholder="Apellido:"
                id="apellido"
                name="apellido"
                className={`h-[50px] border-b-[1px] border-[#75b781] placeholder:font-Muli lg:w-[417px] ${
                  formik.touched.apellido && formik.errors.apellido
                    ? "border-[#E50505]"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.apellido}
              />
              {formik.touched.apellido && formik.errors.apellido ? (
                <div className="flex gap-1 text-[#E50505] text-[13px] font-poppins mt-1">
                  <img
                    src="/icons/form/error.svg"
                    width={18}
                    height={18}
                    alt="error"
                  />
                  {formik.errors.apellido}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col">
              <input
                type="email"
                placeholder="Email:"
                id="email"
                name="email"
                className={`h-[50px] border-b-[1px] border-[#75b781] placeholder:font-Muli lg:w-[417px] ${
                  formik.touched.email && formik.errors.email
                    ? "border-[#E50505]"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="flex gap-1 text-[#E50505] text-[13px] font-poppins mt-1">
                  <img
                    src="/icons/form/error.svg"
                    width={18}
                    height={18}
                    alt="error"
                  />
                  {formik.errors.email}
                </div>
              ) : null}
              <input
                type="password"
                placeholder="Contraseña:"
                id="password"
                name="password"
                className={`h-[50px] border-b-[1px] border-[#75b781] placeholder:font-Muli lg:w-[417px] ${
                  formik.touched.password && formik.errors.password
                    ? "border-[#E50505]"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="flex gap-1 text-[#E50505] text-[13px] font-poppins mt-1">
                  <img
                    src="/icons/form/error.svg"
                    width={18}
                    height={18}
                    alt="error"
                  />
                  {formik.errors.password}
                </div>
              ) : null}
              <input
                type="password"
                placeholder="Confirmar contraseña:"
                id="password_confirmation"
                name="password_confirmation"
                className={`h-[50px] border-b-[1px] border-[#75b781] placeholder:font-Muli lg:w-[417px] ${
                  formik.touched.password_confirmation &&
                  formik.errors.password_confirmation
                    ? "border-[#E50505]"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password_confirmation}
              />
              {formik.touched.password_confirmation &&
              formik.errors.password_confirmation ? (
                <div className="flex gap-1 text-[#E50505] text-[13px] font-poppins mt-1">
                  <img
                    src="/icons/form/error.svg"
                    width={18}
                    height={18}
                    alt="error"
                  />
                  {formik.errors.password_confirmation}
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex justify-between lg:justify-normal lg:gap-5">
            <div className="w-[120px] sm:w-[200px] lg:w-[417px]">
              <Button
                text="Registrarse"
                color="primary"
                disabled={formik.isSubmitting || !formik.isValid}
                type="submit"
              />
            </div>
            <div className="w-[120px] sm:w-[200px] lg:w-[417px]">
              <Button text="Volver" color="secondary" onClick={onBack} />
            </div>
          </div>
        </div>
        <ToastContainer className="!bottom-10" />
      </form>
    </div>
  );
}

export default FormPatient;
