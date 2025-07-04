import type { UserAuthLogin } from "../../types/UserAuthLogin";
import { useForm } from "react-hook-form";
import api from "../../services/api";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuthLogin>({});

  const passwordPattern =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

  const onSubmit = async (data: UserAuthLogin) => {
    try {
      const response = await api.post("/auth/login", data);
      const token = response.data;
      localStorage.setItem("access_token", token);
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                User name
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  type="text"
                  {...register("username", {
                    required: "User name is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_]{3,20}$/,
                      message:
                        "User name must be 3-20 characters, letters, numbers, or underscores only",
                    },
                  })}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.username && (
                  <span className="text-red-500">
                    {errors.username.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: passwordPattern,
                      message:
                        "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long",
                    },
                  })}
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Or sign up{" "}
            <a
              href="/signup"
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

export default LoginForm;
