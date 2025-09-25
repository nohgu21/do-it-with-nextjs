import Link from 'next/link';

const NotFoundPage: React.FC = () => {
  return (
    <main className="font-lato min-h-screen bg-[#0F4C5C] text-white flex flex-col items-center justify-center px-6 text-center space-y-6">
      <h1 className="text-3xl font-bold">ERROR 404</h1>
      <h3 className="text-3xl font-bold">Oops. This page packed its bags and left</h3>
      <p className="text-lg text-gray-300">We can't find it either. Maybe it went for a walk?</p>
      <p className="text-lg text-gray-200">Try the homepage instead.</p>
      <Link
        href="/"
        className="inline-block bg-white text-[#0F4C5C] font-semibold px-6 py-2 rounded-xl hover:bg-gray-200 transition"
      >
        Go Home
      </Link>
    </main>
  );
};

export default NotFoundPage;