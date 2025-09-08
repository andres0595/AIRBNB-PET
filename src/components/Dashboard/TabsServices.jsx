import { useState } from "react";

function TabServices() {
  const tabs = [
    "Hospedaje con amor",
    "Cuidador a domicilio",
    "Cuidador de día",
    "Paseadores",
    "Hogar de día",
  ];

  // Estado: tab activo
  const [activeTab, setActiveTab] = useState(tabs[0]);
  // <-- CORRECCIÓN AQUÍ
  const [frequency, setFrequency] = useState("once");

  return (
    <div className="w-full bg-gray-100 py-10">
      <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">
        ¡La tranquilidad de saber que tu mascota está en buenas manos!
      </h2>

      {/* Tabs */}
      <div className="flex justify-center space-x-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex flex-col items-center justify-center w-40 h-28 rounded-t-2xl border transition-all duration-200
            ${
              tab === activeTab
                ? "bg-white border-gray-300 text-gray-800 z-20 border-b-transparent"
                : "bg-gray-100 border-gray-200 text-gray-500 hover:bg-gray-200"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-gray-200 mb-2"></div>
            <span className="text-sm font-medium text-center">{tab}</span>
          </button>
        ))}
      </div>

      {/* Contenido dinámico */}
      <div className="bg-white shadow-md rounded-b-2xl border border-gray-300 -mt-1 p-6 max-w-4xl mx-auto z-10">
        {activeTab === "Hospedaje con amor" && (
          <div>
            <p className="text-xs text-gray-500 mb-4">
              El servicio de hospedaje con amor va dirigido a tu perro y gato,
              por favor ingresa la información de los campos adquiridos dentro
              del filtro para que tu búsqueda sea exitosa.
            </p>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-3 md:col-span-1">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Dirección:
                </label>
                <input
                  type="text"
                  placeholder="Ingresar tu dirección"
                  className="border rounded-lg px-4 py-2 w-full"
                />
              </div>
              <div className="col-span-3 md:col-span-2 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Selecciona las fechas
                  </label>
                  <input
                    type="date"
                    className="border rounded-lg px-4 py-2 w-full"
                  />
                </div>
                <div className="mt-6">
                  <input
                    type="date"
                    className="border rounded-lg px-4 py-2 w-full"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <button
                  type="submit"
                  className="w-full bg-gray-700 text-white py-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Buscar hospedaje
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "Cuidador a domicilio" && (
          <div>
            <p className="text-xs text-gray-500 mb-4">
              El servicio de cuidador a domicilio va dirigido a tu perro y gato,
              por favor ingresa la informacion de los campos adquiridos dentro
              del filtro para que tu busqueda sea existosa.
            </p>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-3 md:col-span-1">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Dirección:
                </label>
                <input
                  type="text"
                  placeholder="Ingresar tu dirección"
                  className="border rounded-lg px-4 py-2 w-full"
                />
              </div>
              <div className="col-span-3 md:col-span-2 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Selecciona las fechas
                  </label>
                  <input
                    type="date"
                    className="border rounded-lg px-4 py-2 w-full"
                  />
                </div>
                <div className="mt-6">
                  <input
                    type="date"
                    className="border rounded-lg px-4 py-2 w-full"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <button
                  type="submit"
                  className="w-full bg-gray-700 text-white py-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Buscar cuidador
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "Cuidador de día" && (
          <div>
            <p className="text-xs text-gray-500 mb-4">
              El servicio de cuidador de dia va dirigido a tu perro y gato, por
              favor ingresa la informacion de los campos adquiridos dentro del
              filtro para que tu busqueda sea existosa.
            </p>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Dirección */}
              <div className="col-span-3 md:col-span-1">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Dirección:
                </label>
                <input
                  type="text"
                  placeholder="Ingresar tu dirección"
                  className="border rounded-lg px-4 py-2 w-full"
                />
              </div>

              {/* Opciones de frecuencia */}
              <div className="col-span-3 md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  ¿Cada cuánto lo vas a necesitar este servicio?
                </label>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setFrequency("once")}
                    className={`px-4 py-2 rounded-lg border transition-all w-full ${
                      frequency === "once"
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    Solo una vez (por ahora)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency("weekly")}
                    className={`px-4 py-2 rounded-lg border transition-all w-full ${
                      frequency === "weekly"
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    Repetir cada semana
                  </button>
                </div>
              </div>

              {/* Contenido dinámico */}
              {frequency === "once" ? (
                <>
                  {/* Fechas rango */}
                  <div className="col-span-3 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Seleccione las fechas
                    </label>
                    <input
                      type="date"
                      className="border rounded-lg px-4 py-2 w-full"
                    />
                  </div>
                  <div className="col-span-3 md:col-span-1 mt-6">
                    <input
                      type="date"
                      className="border rounded-lg px-4 py-2 w-full"
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Checkbox días */}
                  <div className="col-span-3 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      ¿Para qué días?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["Lun", "Mar", "Mie", "Jue", "Vie", "Sáb", "Dom"].map(
                        (day) => (
                          <label
                            key={day}
                            className="flex items-center space-x-1  px-2 py-1 rounded-lg text-sm cursor-pointer hover:bg-gray-100"
                          >
                            <input type="checkbox" className="form-checkbox" />
                            <span>{day}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  {/* Fecha única */}
                  <div className="col-span-3 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Selecciona la fecha
                    </label>
                    <input
                      type="date"
                      className="border rounded-lg px-4 py-2 w-full"
                    />
                  </div>
                </>
              )}

              {/* Botón */}
              <div className="col-span-3">
                <button
                  type="submit"
                  className="w-full bg-gray-700 text-white py-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Buscar cuidador
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "Paseadores" && (
          <div>
            <p className="text-xs text-gray-500 mb-4">
              El servicio de paseadores esta diseñado exclusivamente para
              perros, completa la informacion en los filtros para encontrar el
              cuidador ideal para tu compañero de cuatro patas.
            </p>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Dirección */}
              <div className="col-span-3 md:col-span-1">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Dirección:
                </label>
                <input
                  type="text"
                  placeholder="Ingresar tu dirección"
                  className="border rounded-lg px-4 py-2 w-full"
                />
              </div>

              {/* Opciones de frecuencia */}
              <div className="col-span-3 md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  ¿Cada cuánto lo vas a necesitar este servicio?
                </label>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setFrequency("once")}
                    className={`px-4 py-2 rounded-lg border transition-all w-full ${
                      frequency === "once"
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    Solo una vez (por ahora)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency("weekly")}
                    className={`px-4 py-2 rounded-lg border transition-all w-full ${
                      frequency === "weekly"
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    Repetir cada semana
                  </button>
                </div>
              </div>

              {/* Contenido dinámico */}
              {frequency === "once" ? (
                <>
                  {/* Fechas rango */}
                  <div className="col-span-3 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Seleccione las fechas
                    </label>
                    <input
                      type="date"
                      className="border rounded-lg px-4 py-2 w-full"
                    />
                  </div>
                  <div className="col-span-3 md:col-span-1 mt-6">
                    <input
                      type="date"
                      className="border rounded-lg px-4 py-2 w-full"
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Checkbox días */}
                  <div className="col-span-3 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      ¿Para qué días?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["Lun", "Mar", "Mie", "Jue", "Vie", "Sáb", "Dom"].map(
                        (day) => (
                          <label
                            key={day}
                            className="flex items-center space-x-1  px-2 py-1 rounded-lg text-sm cursor-pointer hover:bg-gray-100"
                          >
                            <input type="checkbox" className="form-checkbox" />
                            <span>{day}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  {/* Fecha única */}
                  <div className="col-span-3 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Selecciona la fecha
                    </label>
                    <input
                      type="date"
                      className="border rounded-lg px-4 py-2 w-full"
                    />
                  </div>
                </>
              )}

              {/* Botón */}
              <div className="col-span-3">
                <button
                  type="submit"
                  className="w-full bg-gray-700 text-white py-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Buscar paseadores
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "Hogar de día" && (
          <div>
            <p className="text-xs text-gray-500 mb-4">
              Tu mascota pasa el día en un hogar especializado mientras tú
              trabajas.
            </p>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Dirección */}
              <div className="col-span-3 md:col-span-1">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Dirección:
                </label>
                <input
                  type="text"
                  placeholder="Ingresar tu dirección"
                  className="border rounded-lg px-4 py-2 w-full"
                />
              </div>

              {/* Opciones de frecuencia */}
              <div className="col-span-3 md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  ¿Cada cuánto lo vas a necesitar este servicio?
                </label>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setFrequency("once")}
                    className={`px-4 py-2 rounded-lg border transition-all w-full ${
                      frequency === "once"
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    Solo una vez (por ahora)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency("weekly")}
                    className={`px-4 py-2 rounded-lg border transition-all w-full ${
                      frequency === "weekly"
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    Repetir cada semana
                  </button>
                </div>
              </div>

              {/* Contenido dinámico */}
              {frequency === "once" ? (
                <>
                  {/* Fechas rango */}
                  <div className="col-span-3 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Seleccione las fechas
                    </label>
                    <input
                      type="date"
                      className="border rounded-lg px-4 py-2 w-full"
                    />
                  </div>
                  <div className="col-span-3 md:col-span-1 mt-6">
                    <input
                      type="date"
                      className="border rounded-lg px-4 py-2 w-full"
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Checkbox días */}
                  <div className="col-span-3 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      ¿Para qué días?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["Lun", "Mar", "Mie", "Jue", "Vie", "Sáb", "Dom"].map(
                        (day) => (
                          <label
                            key={day}
                            className="flex items-center space-x-1  px-2 py-1 rounded-lg text-sm cursor-pointer hover:bg-gray-100"
                          >
                            <input type="checkbox" className="form-checkbox" />
                            <span>{day}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  {/* Fecha única */}
                  <div className="col-span-3 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Selecciona la fecha
                    </label>
                    <input
                      type="date"
                      className="border rounded-lg px-4 py-2 w-full"
                    />
                  </div>
                </>
              )}

              {/* Botón */}
              <div className="col-span-3">
                <button
                  type="submit"
                  className="w-full bg-gray-700 text-white py-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Buscar hogarea de dia
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default TabServices;
