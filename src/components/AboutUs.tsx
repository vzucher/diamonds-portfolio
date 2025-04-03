import Image from 'next/image';

export default function AboutUs() {
  return (
    <div className="bg-white rounded-xl p-8 shadow-md border border-blue-100 mb-8">
      <div className="flex flex-col items-center">
        <div className="relative w-72 h-72">
          <Image 
            src="/assets/logo-2.png" 
            alt="Almazi Logo" 
            fill
            className="object-contain"
          />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Profile Section */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-blue-100 shadow-lg">
            <Image 
              src="/assets/nuri.png" 
              alt="Nuri Bretz - Founder of Almazi" 
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-slate-800">Nuri Bretz</h3>
          <p className="text-slate-600 text-center mb-4 text-sm">Founder & Jeweler</p>
          <a 
            href="https://wa.me/5511942120770" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center shadow-sm text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat with Nuri
          </a>
        </div>
        
        {/* Content Section */}
        <div className="w-full md:w-2/3">
          <div className="prose prose-sm prose-blue max-w-none">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 border border-blue-100 mb-5">
              <h3 className="text-base font-semibold text-blue-800 mb-3">Our Story</h3>
              <p className="text-slate-700 text-sm mb-3">
                É com muita alegria que compartilho uma nova etapa da minha jornada! Apos 10 anos de experiência no mercado brasileiro e internacional, decidi dar vida a Almazy.
              </p>
              
              <p className="text-slate-700 text-sm">
                O nome foi escolhido com muito carinho: Almazy significa &ldquo;diamante&rdquo; em turco, uma referência às minhas origens, e também carrega as mesmas letras de <span className="font-serif text-lg text-blue-700">מזל</span> (Mazal), que em hebraico significa &ldquo;sorte&rdquo;. Assim como um diamante, essa nova fase representa brilho, exclusividade e um compromisso com a alta joalheria em sua essência.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div className="bg-slate-50 rounded-lg p-4 border border-blue-100">
                <h4 className="font-semibold text-slate-800 mb-2 flex items-center text-sm">
                  <span className="text-blue-600 mr-2">💍</span> Our Services
                </h4>
                <p className="text-slate-700 text-sm">
                  Oferecemos um atendimento completo: desde peças autorais e encomendas personalizadas, anéis de noivado, até reformas e ajustes — porque cada detalhe importa.
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4 border border-blue-100">
                <h4 className="font-semibold text-slate-800 mb-2 flex items-center text-sm">
                  <span className="text-blue-600 mr-2">🌟</span> Our Commitment
                </h4>
                <p className="text-slate-700 text-sm">
                  Convido vocês a fazerem parte dessa história! Venha conhecer nosso novo espaço em São Paulo.
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg border border-blue-500 text-white shadow-md">
              <h4 className="font-semibold text-white mb-2 flex items-center text-sm">
                <span className="mr-2">🏪</span> Visit Our Showroom
              </h4>
              <p className="text-blue-50 mb-3 text-sm">
                Experience the beauty of our diamond collection in person. Our expert team is ready to help you find the perfect piece.
              </p>
              <div className="flex gap-3">
                <a 
                  href="https://wa.me/5511942120770" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-3 py-1.5 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-medium shadow-sm text-sm"
                >
                  Schedule a Visit
                </a>
                <a 
                  href="https://www.instagram.com/almazyjoias/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium shadow-sm text-sm"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Follow Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 