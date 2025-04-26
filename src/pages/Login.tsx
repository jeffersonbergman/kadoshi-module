
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';

const Login = () => {
  const { t } = useTranslation();
  const { isAuthenticated, login } = useApp();
  const { toast } = useToast();
  const [email, setEmail] = useState('admin@igreja.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: t('auth.loginSuccess'),
        description: t('auth.welcomeBack'),
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: t('auth.loginFailed'),
        description: t('auth.invalidCredentials'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-church-primary dark:text-church-primary">
            {t('app.name')}
          </h1>
          <h2 className="mt-2 text-xl font-semibold text-gray-700 dark:text-gray-300">
            {t('auth.login')}
          </h2>
        </div>

        <div className="p-4 mb-4 border border-blue-200 rounded-md bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2" />
            <div>
              <h3 className="font-medium text-blue-600 dark:text-blue-400">
                {t('auth.adminLogin')}
              </h3>
              <div className="mt-1 text-sm text-blue-600 dark:text-blue-400">
                <p>{t('auth.adminInstructions')}</p>
                <p className="mt-1 font-mono bg-blue-100 dark:bg-blue-800/30 p-1 rounded">
                  Email: admin@igreja.com<br />
                  Senha: admin123
                </p>
              </div>
            </div>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@igreja.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <a
                  href="#"
                  className="text-sm font-medium text-church-primary hover:text-church-secondary"
                >
                  {t('auth.forgotPassword')}
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-church-primary hover:bg-church-secondary"
            disabled={isLoading}
          >
            {isLoading ? t('common.loading') : t('auth.login')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
