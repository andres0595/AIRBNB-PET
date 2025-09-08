function HowItWorks() {
  return (
    <section class="py-16 bg-[#f7f7f7]">
      <h2 class="text-center text-2xl font-bold text-gray-700 mb-6">
        ¿Cómo funciona PuppyPo?
      </h2>
      <p class="text-center text-gray-500 max-w-2xl mx-auto mb-10">
        PuppyPo está diseñado para guiarte en 3 sencillos pasos...
      </p>

      <div class="flex flex-col md:flex-row items-center max-w-5xl mx-auto gap-10">
        <div class="flex flex-col space-y-6">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-400 text-white font-bold">
              1
            </div>
            <span class="text-gray-700 font-medium">Buscar</span>
          </div>
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 text-gray-400 font-bold">
              2
            </div>
            <span class="text-gray-500">Reservar</span>
          </div>
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 text-gray-400 font-bold">
              3
            </div>
            <span class="text-gray-500">Pagar</span>
          </div>
        </div>
        <div class="flex-1 text-gray-500">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          <button class="mt-6 px-6 py-3 bg-gray-200 rounded-full">
            ¡Quiero reservar!
          </button>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
