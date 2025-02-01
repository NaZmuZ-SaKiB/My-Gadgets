import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="mg-container grid min-h-[80vh] place-items-center text-center">
      <div>
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-800">
          Oops! Page not found.
        </p>
        <p className="mt-2 text-gray-600">
          The page you{`'`}re looking for doesn{`'`}t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 text-white transition duration-300 hover:bg-primary-hover"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
