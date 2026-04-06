import { Component, type ErrorInfo, type ReactNode } from "react";
import { withTranslation, type WithTranslation } from "react-i18next";

interface Props extends WithTranslation {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  public handleReload = () => {
    window.location.reload();
  };
  public render() {
    const { t } = this.props;
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center border-t-8 border-red-500">
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t("error.title")}
            </h2>
            <p className="text-gray-600 mb-8">{t("error.description")}</p>
            <div className="space-y-3">
              <button
                onClick={this.handleReload}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all"
              >
                {t("error.reload_btn")}
              </button>
              <a
                href="/"
                className="block text-gray-500 hover:text-gray-700 font-medium transition-colors"
              >
                {t("error.back_home")}
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
// Bọc với withTranslation để sử dụng được i18next trong Class Component
export default withTranslation()(ErrorBoundary);
