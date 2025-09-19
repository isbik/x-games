import Link from "next/link";
import { FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-auto bg-gradient-to-br bg-white backdrop-blur border-t border-gray-300/30">
      <div className="max-w-7xl mx-auto p-4 py-8 flex justify-between max-sm:flex-col">
        <div className="flex flex-col justify-between gap-2">
          <span className="flex items-center gap-2 text-2xl font-bold">
            <img src="favicon.svg" alt="favicon" className="size-8" />
            funtok
          </span>
          <p className="text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} funtok. Все права защищены.
          </p>
        </div>

        <div className="max-sm:flex gap-2">
          <h3 className="text-lg font-semibold sm:mb-4">
            Присоединяйтесь к нам
          </h3>
          <div className="flex space-x-4 items-center">
            <a
              href="https://t.me/board_time"
              className="hover:text-blue-500 transition-colors flex items-center gap-1"
            >
              <FaTelegram className="size-6" />
              <span>Telegram</span>
            </a>
            <Link
              href="/blog"
              className="hover:text-blue-600 transition-colors"
            >
              Наш блог
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
