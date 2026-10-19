import React, { FormEvent, useState } from 'react';
import { ArrowRight, BriefcaseBusiness, CircleAlert, LockKeyhole, Mail, ShieldCheck, Sparkles, UsersRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';

const DEMO_ROLES: {
  role: Role;
  label: string;
  description: string;
  email: string;
  password: string;
  icon: typeof ShieldCheck;
}[] = [
  {
    role: 'ROLE_ADMIN',
    label: 'Executive Admin',
    description: 'Full platform access',
    email: 'admin@zidio.com',
    password: 'admin123',
    icon: ShieldCheck
  },
  {
    role: 'ROLE_HR_MANAGER',
    label: 'HR Manager',
    description: 'People operations',
    email: 'hr@zidio.com',
    password: 'hr123',
    icon: UsersRound
  },
  {
    role: 'ROLE_MANAGER',
    label: 'Team Manager',
    description: 'Team approvals',
    email: 'manager@zidio.com',
    password: 'manager123',
    icon: BriefcaseBusiness
  },
  {
    role: 'ROLE_EMPLOYEE',
    label: 'Employee',
    description: 'Personal workspace',
    email: 'alex.turner@zidio.com',
    password: 'employee123',
    icon: UsersRound
  }
];

export const LoginPage: React.FC = () => {
  const { login, loading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<Role>('ROLE_ADMIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const selectedAccount = DEMO_ROLES.find(account => account.role === selectedRole)!;

  const selectRole = (role: Role) => {
    setSelectedRole(role);
    setEmail(DEMO_ROLES.find(account => account.role === role)!.email);
    setPassword('');
    setError('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    try {
      await login(email.trim(), password);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Sign in failed. Please try again.');
    }
  };

  return (
    <main className="flex min-h-screen bg-white text-slate-900">
      <section className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-slate-950 p-12 text-white lg:flex xl:p-16">
        <div className="absolute -left-32 -top-40 h-[28rem] w-[28rem] rounded-full bg-indigo-600/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 h-[30rem] w-[30rem] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-500 to-violet-600 shadow-lg shadow-indigo-500/30">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xl font-bold tracking-tight">NexusHR</div>
            <div className="text-xs text-slate-400">Enterprise Workforce Intelligence</div>
          </div>
        </div>

        <div className="relative z-10 max-w-xl py-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5 text-xs font-semibold text-indigo-200">
            <Sparkles className="h-3.5 w-3.5" />
            One workforce. Clearer decisions.
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
            People intelligence for a stronger workforce.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">
            Bring employee lifecycle, attendance, payroll, performance, and workforce insights together in one secure workspace.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            <div>
              <div className="text-lg font-bold">360°</div>
              <div className="mt-1 text-xs text-slate-400">People operations</div>
            </div>
            <div>
              <div className="text-lg font-bold">AI-ready</div>
              <div className="mt-1 text-xs text-slate-400">Workforce insights</div>
            </div>
            <div>
              <div className="text-lg font-bold">Role-based</div>
              <div className="mt-1 text-xs text-slate-400">Secure access</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-xs text-slate-500">
          <LockKeyhole className="h-3.5 w-3.5" />
          Secure access for every stage of the employee journey
        </div>
      </section>

      <section className="flex min-h-screen flex-1 items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-xl">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-bold">NexusHR</div>
                <div className="text-xs text-slate-500">Enterprise Workforce Intelligence</div>
              </div>
            </div>
          </div>

          <div className="mb-7">
            <p className="text-sm font-semibold text-indigo-600">WELCOME TO NEXUSHR</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Sign in to your workspace</h2>
            <p className="mt-2 text-sm text-slate-500">Choose your account type, then enter your credentials.</p>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-800">Choose your role</h3>
              <span className="text-xs text-slate-400">Demo accounts</span>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {DEMO_ROLES.map(account => {
                const Icon = account.icon;
                const isSelected = selectedRole === account.role;
                return (
                  <button
                    key={account.role}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => selectRole(account.role)}
                    className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition-colors ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500/10'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-slate-900">{account.label}</span>
                      <span className="mt-0.5 block text-xs text-slate-500">{account.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Work email</span>
              <span className="relative block">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Password</span>
              <span className="relative block">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </span>
            </label>

            <p className="text-xs text-slate-500">
              Demo password for {selectedAccount.label}: <span className="font-semibold text-slate-700">{selectedAccount.password}</span>
            </p>

            {error && (
              <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Signing in…' : `Sign in as ${selectedAccount.label}`}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400">
            Access is determined by your authenticated account permissions.
          </p>
        </div>
      </section>
    </main>
  );
};
