import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { GoogleLogin } from '../components/GoogleLogin';
import { useAuth } from '../contexts/AuthContext';
import { Users, Briefcase, TrendingUp, Shield } from 'lucide-react';

export function LoginPage() {
  const { login, skipLogin, isAuthenticated, isLoading } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/landing" replace />;
  }

  const handleLoginSuccess = async (credential: string) => {
    try {
      setIsLoggingIn(true);
      setLoginError(null);
      await login(credential);
    } catch (error) {
      setLoginError('Failed to log in. Please try again.');
      console.error('Login failed:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLoginError = () => {
    setLoginError('Google login failed. Please try again.');
    setIsLoggingIn(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary-600 rounded-xl flex items-center justify-center">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome to HireFlow
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your intelligent recruitment dashboard
          </p>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <Briefcase className="h-5 w-5 text-primary-600" />
            <span className="text-sm text-gray-700">Manage job campaigns efficiently</span>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-primary-600" />
            <span className="text-sm text-gray-700">Track candidates through pipeline</span>
          </div>
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-5 w-5 text-primary-600" />
            <span className="text-sm text-gray-700">AI-powered communication</span>
          </div>
          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-primary-600" />
            <span className="text-sm text-gray-700">Secure Google authentication</span>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Sign in to continue
              </h3>
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600">{loginError}</p>
              </div>
            )}

            <div className="relative">
              {isLoggingIn && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-md">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                </div>
              )}
              <GoogleLogin 
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
              />
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Skip Login Button */}
            <button
              onClick={skipLogin}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Continue as Guest
            </button>
            
            <p className="text-xs text-center text-gray-400">
              Note: Google OAuth is deprecated. Use Guest mode to access the app.
            </p>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                By signing in, you agree to our{' '}
                <a href="#" className="text-primary-600 hover:text-primary-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Need help? Contact{' '}
            <a href="mailto:support@hireflow.com" className="text-primary-600 hover:text-primary-500">
              support@hireflow.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
