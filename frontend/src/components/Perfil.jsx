import React, { useEffect, useState } from "react";
import FormEditPatient from "./FormEditPatient";
import FormEditPsychologist from "./FormEditPsychologist";

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/perfil", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("No se pudieron obtener los datos del perfil.");
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="flex flex-col justify-center items-center pt-[120px] pb-[70px]">
      <div className="flex flex-col items-center gap-[50px] w-[340px] sm:w-[580px] lg:w-[851px] xl:w-[980px] mac:w-[1040px] hd:w-[1036px] fullhd:w-[1120px]">
        {user ? (
          <div>
            {editMode ? (
              user.rol === "psicologo" ? (
                <FormEditPsychologist
                  user={user}
                  setEditMode={setEditMode}
                  onBack={() => setEditMode(false)}
                />
              ) : user.rol === "paciente" ? (
                <FormEditPatient
                  user={user}
                  setEditMode={setEditMode}
                  onBack={() => setEditMode(false)}
                />
              ) : (
                <p>Rol no reconocido.</p>
              )
            ) : (
              <div>
                {user.rol === "psicologo" ? (
                  <div className="flex flex-col gap-[30px]">
                    <h1 className="text-[#75B781] text-4xl text-center">
                      Perfil del Psicólogo
                    </h1>
                    <p className="text-[20px]">
                      <strong>Nombre:</strong> {user.nombre}
                    </p>
                    <p className="text-[20px]">
                      <strong>Apellido:</strong> {user.apellido}
                    </p>
                    <p className="text-[20px]">
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p className="text-[20px]">
                      <strong>Matrícula:</strong> {user.matricula}
                    </p>
                    <p className="text-[20px]">
                      <strong>Teléfono:</strong> {user.telefono}
                    </p>
                    <p className="text-[20px]">
                      <strong>Promedio:</strong> {user.promedio}
                    </p>
                  </div>
                ) : user.rol === "paciente" ? (
                  <div className="flex flex-col gap-[30px]">
                    <h1 className="text-[#75B781] text-4xl text-center">
                      Perfil del Paciente
                    </h1>
                    <p className="text-[20px]">
                      <strong>Nombre:</strong> {user.nombre}
                    </p>
                    <p className="text-[20px]">
                      <strong>Apellido:</strong> {user.apellido}
                    </p>
                    <p className="text-[20px]">
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p className="text-[20px]">
                      <strong>DNI:</strong> {user.dni}
                    </p>
                  </div>
                ) : (
                  <p>Rol no reconocido.</p>
                )}
                <div className="flex items-center justify-center mt-10">
                  <button
                    className="px-4 py-2 bg-[#75B781] text-white rounded"
                    onClick={() => setEditMode(true)}
                  >
                    Editar Perfil
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>No se pudo cargar el perfil.</p>
        )}
      </div>
    </section>
  );
};

export default Perfil;
