import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { registerPsychologistSchema } from "../schemas/index";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FormPsychologist({ onBack }) {
  const [codigoPostales, setCodigoPostales] = useState([]);
  const [tematicas, setTematicas] = useState([]);
  const [patologias, setPatologias] = useState([]);
  const [corrientes, setCorrientes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [codPostRes, temRes, patRes, corrRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/localidades"),
          fetch("http://127.0.0.1:8000/api/tematicas"),
          fetch("http://127.0.0.1:8000/api/patologias"),
          fetch("http://127.0.0.1:8000/api/corrientes"),
        ]);

        setCodigoPostales(await codPostRes.json());
        setTematicas(await temRes.json());
        setPatologias(await patRes.json());
        setCorrientes(await corrRes.json());
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      matricula: "",
      nombre: "",
      apellido: "",
      telefono: "",
      promedio: "",
      codigo_postal: "",
      id_tematica: "",
      id_patologia: "",
      id_corriente: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: registerPsychologistSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/register_psicologo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (response.status === 201) {
          toast.success("¡Psicólogo registrado con éxito!", {
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
          toast.error("Error al registrar el psicólogo. Intenta de nuevo.", {
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
        <div className="flex flex-col lg:flex-row lg:justify-between px-[25px] py-[30px] lg:px-[60px]">
          <div className="flex w-full sm:w-[540px] lg:w-[417px]">
            <div className="flex flex-col  lg:gap-y-[15px]">
              <div className="flex flex-col gap-[10px] w-[290px] sm:w-[417px]">
                <input
                  type="number"
                  id="matricula"
                  placeholder="Matrícula:"
                  name="matricula"
                  value={formik.values.matricula}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`h-[50px] border-b-[1px] border-[#75b781] placeholder:font-Muli lg:w-[417px] ${
                    formik.touched.matricula && formik.errors.matricula
                      ? "border-[#E50505]"
                      : ""
                  }`}
                />
                {formik.touched.matricula && formik.errors.matricula ? (
                  <div className="flex gap-1 text-[#E50505] text-[13px] font-poppins">
                    <img
                      src="/icons/form/error.svg"
                      width={18}
                      height={18}
                      alt="error"
                    />
                    {formik.errors.matricula}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-[10px]">
                <input
                  type="text"
                  placeholder="Nombre:"
                  name="nombre"
                  id="nombre"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`h-[50px] border-b-[1px] border-[#75b781] placeholder:font-Muli lg:w-[417px] ${
                    formik.touched.nombre && formik.errors.nombre
                      ? "border-[#E50505]"
                      : ""
                  }`}
                />
                {formik.touched.nombre && formik.errors.nombre ? (
                  <div className="flex gap-1 text-[#E50505] text-[13px] font-poppins ">
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
              <div className="flex flex-col gap-[10px]">
                <input
                  type="text"
                  placeholder="Apellido:"
                  name="apellido"
                  id="apellido"
                  value={formik.values.apellido}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`h-[50px] border-b-[1px] border-[#75b781] placeholder:font-Muli lg:w-[417px] ${
                    formik.touched.apellido && formik.errors.apellido
                      ? "border-[#E50505]"
                      : ""
                  }`}
                />
                {formik.touched.apellido && formik.errors.apellido ? (
                  <div className="flex gap-1 text-[#E50505] text-[13px] font-poppins ">
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
              <div className="flex flex-col gap-[10px]">
                <input
                  type="text"
                  placeholder="Teléfono:"
                  name="telefono"
                  id="telefono"
                  value={formik.values.telefono}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`h-[50px] border-b-[1px] border-[#75b781] placeholder:font-Muli lg:w-[417px] ${
                    formik.touched.telefono && formik.errors.telefono
                      ? "border-[#E50505]"
                      : ""
                  }`}
                />
                {formik.touched.telefono && formik.errors.telefono ? (
                  <div className="flex gap-1 text-[#E50505] text-[13px] font-poppins ">
                    <img
                      src="/icons/form/error.svg"
                      width={18}
                      height={18}
                      alt="error"
                    />
                    {formik.errors.telefono}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-[10px]">
                <input
                  type="number"
                  placeholder="Promedio:"
                  name="promedio"
                  id="promedio"
                  value={formik.values.promedio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`h-[50px] border-b-[1px] border-[#75b781] placeholder:font-Muli lg:w-[417px] ${
                    formik.touched.promedio && formik.errors.promedio
                      ? "border-[#E50505]"
                      : ""
                  }`}
                />
                {formik.touched.promedio && formik.errors.promedio ? (
                  <div className="flex gap-1 text-[#E50505] text-[13px] font-poppins ">
                    <img
                      src="/icons/form/error.svg"
                      width={18}
                      height={18}
                      alt="error"
                    />
                    {formik.errors.promedio}
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col gap-[10px] lg:w-[417px]">
                <select
                  name="codigo_postal"
                  id="codigo_postal"
                  value={formik.values.codigo_postal}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "codigo_postal",
                      Number(e.target.value)
                    );
                  }}
                  onBlur={formik.handleBlur}
                  className="block h-[50px] border-b-[1px] border-[#75b781]"
                >
                  <option value="">Selecciona un código postal</option>
                  {codigoPostales.map((cp) => (
                    <option key={cp.codigo_postal} value={cp.codigo_postal}>
                      {cp.nombre}
                    </option>
                  ))}
                </select>
                {formik.touched.codigo_postal && formik.errors.codigo_postal ? (
                  <div className="flex gap-1 text-[#E50505] text-[13px] font-poppins ">
                    <img
                      src="/icons/form/error.svg"
                      width={18}
                      height={18}
                      alt="error"
                    />
                    {formik.errors.codigo_postal}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-[15px]">
            <div className="flex flex-col gap-[10px]">
              <select
                id="id_tematica"
                name="id_tematica"
                value={formik.values.id_tematica}
                onChange={(e) => {
                  formik.setFieldValue("id_tematica", Number(e.target.value));
                }}
                onBlur={formik.handleBlur}
                className="h-[50px] border-b-[1px] border-[#75b781]"
              >
                <option value="">Selecciona una temática</option>
                {tematicas.map((tematica) => (
                  <option
                    key={tematica.id_tematica}
                    value={tematica.id_tematica}
                  >
                    {tematica.nombre}
                  </option>
                ))}
              </select>
              {formik.touched.id_tematica && formik.errors.id_tematica ? (
                <div className="flex gap-1 text-[#E50505] text-[13px] font-poppins ">
                  <img
                    src="/icons/form/error.svg"
                    width={18}
                    height={18}
                    alt="error"
                  />
                  {formik.errors.id_tematica}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-[10px]">
              <select
                id="id_patologia"
                name="id_patologia"
                value={formik.values.id_patologia}
                onChange={(e) => {
                  formik.setFieldValue("id_patologia", Number(e.target.value));
                }}
                onBlur={formik.handleBlur}
                className="h-[50px] border-b-[1px] border-[#75b781]"
              >
                <option value="">Selecciona una patología</option>
                {patologias.map((patologia) => (
                  <option
                    key={patologia.id_patologia}
                    value={patologia.id_patologia}
                  >
                    {patologia.nombre}
                  </option>
                ))}
              </select>
              {formik.touched.id_patologia && formik.errors.id_patologia ? (
                <div className="flex gap-1 text-[#E50505] text-[13px] font-poppins ">
                  <img
                    src="/icons/form/error.svg"
                    width={18}
                    height={18}
                    alt="error"
                  />
                  {formik.errors.id_patologia}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-[10px]">
              <select
                name="id_corriente"
                id="id_corriente"
                value={formik.values.id_corriente}
                onChange={(e) => {
                  formik.setFieldValue("id_corriente", Number(e.target.value));
                }}
                onBlur={formik.handleBlur}
                className="h-[50px] border-b-[1px] border-[#75b781]"
              >
                <option value="">Selecciona una corriente</option>
                {corrientes.map((corriente) => (
                  <option
                    key={corriente.id_corriente}
                    value={corriente.id_corriente}
                  >
                    {corriente.nombre}
                  </option>
                ))}
              </select>
              {formik.touched.id_corriente && formik.errors.id_corriente ? (
                <div className="flex gap-1 text-[#E50505] text-[13px] font-poppins ">
                  <img
                    src="/icons/form/error.svg"
                    width={18}
                    height={18}
                    alt="error"
                  />
                  {formik.errors.id_corriente}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-[10px]">
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
            <div className="flex flex-col gap-[10px]">
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
                <div className="flex gap-1 text-[#E50505] text-[13px] font-poppins ">
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
        </div>
        <div className="flex justify-between lg:justify-between lg:gap-5 w-full px-[25px] py-[30px] lg:px-[60px]">
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
        <ToastContainer className="!bottom-10" />
      </form>
    </div>
  );
}

export default FormPsychologist;
