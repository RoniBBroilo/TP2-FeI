import React from "react";
import { useFormik } from "formik";
import { editPatient } from "../schemas/index";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormEditPatient = ({ user, setEditMode, onBack }) => {
  const handleBack = () => {
    onBack();
  };

  const formik = useFormik({
    initialValues: {
      nombre: user.nombre || "",
      apellido: user.apellido || "",
      email: user.email || "",
      dni: user.dni || "",
    },
    validationSchema: editPatient,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://127.0.0.1:8000/api/update-patient",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
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

          setTimeout(() => {
            window.location = "/perfil";
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
        console.error(error);
        console.log("Error al actualizar el perfil.");
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
          <h1 className="text-2xl font-Nobile text-[#3b3b3b]">
            Modificar mis datos
          </h1>
          <p className="text-[14px] font-Muli text-center">
            Te pedimos que completes tus datos nuevamente
          </p>
        </div>
        <div className="flex flex-col px-[25px] py-[30px] gap-[30px] lg:px-[60px] lg:gap-[60px]">
          <div className="flex flex-col lg:gap-5 justify-center lg:flex-row">
            <div className="flex flex-col gap-[15px]">
              <div className="flex flex-col justify-start items-start">
                <p className="text-[#75B781] text-[16px] font-bold">DNI:</p>
                <input
                  type="number"
                  id="dni"
                  name="dni"
                  className={`h-[50px] border-b-[1px] border-[#75b781] placeholder:font-Muli w-full lg:w-[417px] ${
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
              </div>
              <div className="flex flex-col justify-start items-start">
                <p className="text-[#75B781] text-[16px] font-bold">Nombre:</p>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className={`h-[50px] w-full border-b-[1px] border-[#75b781] placeholder:font-Muli lg:w-[417px] ${
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
              </div>
              <div className="flex flex-col justify-start items-start">
                <p className="text-[#75B781] text-[16px] font-bold">
                  Apellido:
                </p>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  className={`h-[50px] w-full border-b-[1px] border-[#75b781] placeholder:font-Muli lg:w-[417px] ${
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
              <div className="flex flex-col justify-start items-start">
                <p className="text-[#75B781] text-[16px] font-bold">Email:</p>
                <input
                  type="email"
                  placeholder="Email:"
                  id="email"
                  name="email"
                  className={`h-[50px] w-full border-b-[1px] border-[#75b781] placeholder:font-Muli lg:w-[417px] ${
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
              </div>
            </div>
          </div>

          <div className="flex justify-between lg:justify-normal lg:gap-5">
            <div className="w-[120px] sm:w-[200px] lg:w-[417px]">
              <Button
                text="Modificar datos"
                color="primary"
                disabled={formik.isSubmitting || !formik.isValid}
                type="submit"
              />
            </div>
            <div className="w-[120px] sm:w-[200px] lg:w-[417px]">
              <Button text="Volver" color="secondary" onClick={handleBack} />
            </div>
          </div>
        </div>
        <ToastContainer className="!bottom-10" />
      </form>
    </div>
  );
};

export default FormEditPatient;
