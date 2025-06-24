import CreateUserForm from "../../components/Users/CreateUserForm";
import api from "../../services/api";
import type { UserAuthRegister } from "../../types/UserAuthRegister";

function SignupForm() {
  async function handleSaveItem(user: UserAuthRegister) {
    try {
      const response = await api.post("/auth/register", user);
      const token = response.data;
      localStorage.setItem("access_token", token);
      window.location.href = "/";
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign up for a new account
          </h2>
        </div>
        <CreateUserForm  onRegister={handleSaveItem}/>
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
