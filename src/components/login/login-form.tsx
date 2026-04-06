import { useState } from "react";
import type { AuthUser, LoginBodyType } from "../../types/empolyee.type";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useTranslation } from "react-i18next";
import { useGoogleAuth } from "../../hooks/use-google-oauth";

const FacebookLoginComponent = (FacebookLogin as any).default || FacebookLogin;
export default function LoginForm() {
  const login = useAppStore((state) => state.login);
  const navigate = useNavigate();
  const { loginWithGoogle } = useGoogleAuth();

  const { t } = useTranslation();
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
          {t("login.title")}
        </h2>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            {t("login.username")}
          </label>
          <input
            type="text"
            name="username"
            className="px-4 py-2 border border-gray-300 rounded-md"
            placeholder={t("login.placeholder_user")}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            {t("login.password")}
          </label>
          <input
            type="password"
            name="password"
            className="px-4 py-2 border border-gray-300 rounded-md"
            placeholder={t("login.placeholder_pass")}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" variant="primary">
          {t("login.submit")}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => loginWithGoogle()}
        >
          {t("login.google_submit")}
        </Button>

        <FacebookLoginComponent
          appId={import.meta.env.VITE_FACEBOOK_APP_ID}
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
              login(user as AuthUser);
              navigate("/employee");
            }
          }}
          render={({ onClick }: { onClick: () => void }) => (
            <Button type="button" variant="outline" onClick={onClick}>
              {t("login.facebook_submit")}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
