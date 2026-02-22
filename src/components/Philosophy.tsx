export default function Philosophy() {
  return (
    <section id="philosophy" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Image Grid */}
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/97fbf8034f-6f2370fd6a45ac0b8bda.png"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                  alt="Fabric details"
                />
                <img
                  src="https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=1000&auto=format&fit=crop"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                  alt="Stitching detail"
                />
              </div>
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                  alt="Man in suit"
                />
                <img
                  src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000&auto=format&fit=crop"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                  alt="Tailor measuring"
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 md:order-2">
            <span className="text-yellow-600 font-medium tracking-widest text-sm uppercase mb-2 block">
              Our Philosophy
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
              Precision in every stitch, elegance in every detail.
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We believe that a suit is more than just clothing; it is a
              statement of intent. Our master tailors combine centuries-old
              techniques with modern silhouettes to create garments that are
              truly unique to you.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              From the initial consultation to the final fitting, our bespoke
              process is designed to be as enjoyable as it is exacting. We
              source only the finest wools from Italy and England, ensuring your
              garment stands the test of time.
            </p>

            <div className="flex items-center space-x-8 mt-8">
              <div>
                <h4 className="text-3xl font-serif font-bold">30+</h4>
                <p className="text-sm text-gray-500 uppercase tracking-wide mt-1">
                  Years Experience
                </p>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div>
                <h4 className="text-3xl font-serif font-bold">5k+</h4>
                <p className="text-sm text-gray-500 uppercase tracking-wide mt-1">
                  Suits Crafted
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}