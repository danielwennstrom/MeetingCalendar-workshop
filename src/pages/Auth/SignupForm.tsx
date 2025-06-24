import CreateUserForm from "../../components/Users/CreateUserForm";

function SignupForm() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign up for a new account
          </h2>
        </div>
        <CreateUserForm />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm align-middle">
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Or log in{" "}
            <a
              href="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              here.
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
