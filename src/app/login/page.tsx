import { Button } from "@/components/ui/button";
import { Copyright, Dice3, KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import { FaGoogle, FaTelegram } from "react-icons/fa";

const LoginForm = () => {
  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-500">Войдите в аккаунт</h2>
      </div>

      <div className="flex gap-2 justify-center mb-6">
        <button className="p-2 rounded-full bg-white border border-gray-300 shadow-sm text-gray-700 font-semibold flex items-center justify-center hover:bg-gray-50 transition-colors">
          <FaGoogle className="size-7 text-blue-500" />
        </button>
        <button className="p-2 rounded-full bg-white border border-gray-300 shadow-sm text-gray-700 font-semibold flex items-center justify-center hover:bg-gray-50 transition-colors">
          <FaTelegram className="size-7 text-blue-500" />
        </button>
      </div>

      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300" />
        <span className="px-4 text-sm text-gray-500 font-semibold">ИЛИ</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <form className="space-y-6">
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Email"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Пароль
          </label>
          <div className="relative">
            <KeyRound
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Пароль"
            />
          </div>
        </div>

        <div className="flex items-center justify-end text-sm">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Забыли пароль?
          </a>
        </div>

        <Button className="w-full py-6 rounded-full" type="submit">
          Войти
        </Button>
      </form>
    </div>
  );
};

const LoginMenu = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col items-start space-y-4 mb-auto">
        <Link href="/" className="flex items-center space-x-2 text-white">
          <Dice3 size={48} className="text-white" />
          <h1 className="text-4xl font-bold">BoardTime</h1>
        </Link>
        <p className="text-purple-100 mt-2 text-lg max-w-sm">
          Мир игр у вас под рукой.
          <br />
          Войдите, чтобы начать!
        </p>
      </div>

      <div className="mt-4 text-purple-200 text-xs flex items-center">
        <Copyright size={14} className="mr-1" />
        <p>{new Date().getFullYear()} BoardTime. Все права защищены.</p>
      </div>
    </div>
  );
};

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-white flex flex-col md:flex-row">
        <div className="flex-none w-full md:w-1/3 p-8 md:p-12 text-white bg-gradient-to-b from-indigo-600 to-purple-700 flex flex-col justify-between items-start rounded-3xl md:rounded-r-none">
          <LoginMenu />
        </div>

        <div className="w-full md:w-2/3 p-8 md:p-12 flex items-center justify-center bg-white">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
