import { useState } from "react";
import type { GoogleUser, LoginBodyType } from "../../types/empolyee.type";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAppStore } from "../../store";
import { decodeToken } from "../../utils/token";
import FacebookLogin from "@greatsumini/react-facebook-login";
const FacebookLoginComponent = (FacebookLogin as any).default || FacebookLogin;
export default function LoginForm() {
  const login = useAppStore((state) => state.login);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginBodyType>({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setTimeout(() => {
        navigate("/employee");
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm w-full p-6 bg-white rounded-lg shadow-md flex flex-col space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
          Sign In
        </h2>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            className="px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter username"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            className="px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter password"
            onChange={handleChange}
          />
        </div>

        <Button type="submit" variant="primary">
          Login
        </Button>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const user = decodeToken(credentialResponse.credential!);
            if (user) {
              login(user);
              navigate("/employee");
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        <FacebookLoginComponent
          appId={import.meta.env.VITE_FACEBOOK_APP_ID}
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-2 transition duration-200"
          onFail={(error: any) => {
            console.log("Đăng nhập thất bại!", error);
          }}
          onProfileSuccess={(response: any) => {
            console.log("Lấy Profile thành công!", response);
            const user = {
              name: response.name,
              email: response.email,
              picture: response.picture?.data?.url,
              sub: response.id,
            };

            if (user) {
              login(user as GoogleUser);
              navigate("/employee");
            }
          }}
        />
      </form>
    </div>
  );
}
