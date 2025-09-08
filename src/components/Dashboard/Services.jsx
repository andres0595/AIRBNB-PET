function Services() {
  return (
    <section class="py-16 bg-gray-50">
      <h2 class="text-center text-2xl font-bold text-gray-700 mb-4">
        Conoce nuestros servicios
      </h2>
      <p class="text-center text-gray-500 mb-10">
        Porque su bienestar es tu tranquilidad.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div class="bg-white rounded-2xl shadow p-6">
          <h3 class="font-semibold text-lg text-gray-700 mb-2">
            Hospedaje con amor
          </h3>
          <p class="text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <button class="mt-4 px-5 py-2 bg-gray-200 rounded-full">
            Conoce más
          </button>
        </div>

        <div class="bg-white rounded-2xl shadow p-6">
          <h3 class="font-semibold text-lg text-gray-700 mb-2">
            Cuidador a domicilio
          </h3>
          <p class="text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <button class="mt-4 px-5 py-2 bg-gray-200 rounded-full">
            Conoce más
          </button>
        </div>

        <div class="bg-white rounded-2xl shadow p-6">
          <h3 class="font-semibold text-lg text-gray-700 mb-2">Paseador</h3>
          <p class="text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <button class="mt-4 px-5 py-2 bg-gray-200 rounded-full">
            Conoce más
          </button>
        </div>
      </div>
    </section>
  );
}

export default Services;
