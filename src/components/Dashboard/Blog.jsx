function Blog() {
  return (
    <section class="py-16 bg-white">
      <h2 class="text-center text-2xl font-bold text-gray-700 mb-4">
        Blog PuppyPo
      </h2>
      <p class="text-center text-gray-500 max-w-3xl mx-auto mb-10">
        El blog de PuppyPo está pensado como un espacio...
      </p>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div class="bg-white rounded-2xl shadow p-6">
          <span class="text-sm bg-gray-200 px-3 py-1 rounded-full">
            Mascotas
          </span>
          <h3 class="mt-3 font-semibold text-lg text-gray-700">
            Lorem ipsum dolor
          </h3>
          <p class="text-sm text-gray-500 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
          </p>
          <div class="flex justify-between items-center text-sm text-gray-400">
            <span>20/08/2025</span>
            <button class="px-4 py-1 bg-gray-200 rounded-full">Ver más</button>
          </div>
        </div>
        <div class="bg-white rounded-2xl shadow p-6">
          <span class="text-sm bg-gray-200 px-3 py-1 rounded-full">Gatos</span>
          <h3 class="mt-3 font-semibold text-lg text-gray-700">
            Lorem ipsum dolor
          </h3>
          <p class="text-sm text-gray-500 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
          </p>
          <div class="flex justify-between items-center text-sm text-gray-400">
            <span>20/08/2025</span>
            <button class="px-4 py-1 bg-gray-200 rounded-full">Ver más</button>
          </div>
        </div>
        <div class="bg-white rounded-2xl shadow p-6">
          <span class="text-sm bg-gray-200 px-3 py-1 rounded-full">
            Alimentación
          </span>
          <h3 class="mt-3 font-semibold text-lg text-gray-700">
            Lorem ipsum dolor
          </h3>
          <p class="text-sm text-gray-500 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
          </p>
          <div class="flex justify-between items-center text-sm text-gray-400">
            <span>20/08/2025</span>
            <button class="px-4 py-1 bg-gray-200 rounded-full">Ver más</button>
          </div>
        </div>
      </div>
      {/* Botón centrado */}
      <div className="flex justify-center mt-5">
        <button
          type="button"
          className="w-2xs px-8 bg-gray-700 text-white py-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          Blog PuppyPo
        </button>
      </div>
    </section>
  );
}

export default Blog;
