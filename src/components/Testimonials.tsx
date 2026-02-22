export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <svg
          className="w-10 h-10 text-gray-200 mx-auto mb-8"
          fill="currentColor"
          viewBox="0 0 448 512"
        >
          <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
        </svg>
        <h3 className="text-2xl md:text-3xl font-serif italic mb-8 leading-relaxed">
          &quot;The attention to detail is simply unmatched. My suit fits perfectly
          from the very first wear. I&apos;ve never felt more confident walking into
          a meeting.&quot;
        </h3>
        <div className="flex items-center justify-center space-x-4">
          <img
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
            alt="Client"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="text-left">
            <p className="font-bold text-gray-900">James Sterling</p>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Investment Banker
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}