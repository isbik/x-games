import { useRef } from "react";
import { FaTelegram } from "react-icons/fa";

const Footer = () => {
  const date = useRef(new Date()).current.getFullYear();

  return (
    <footer className="mt-auto bg-gradient-to-br bg-white backdrop-blur border-t border-gray-300/30">
      <div className="container mx-auto p-6 flex justify-between">
        <div className="flex flex-col justify-between gap-2">
          <span className="flex items-center gap-2 text-2xl font-bold">
            <img src="/favicon.svg" alt="favicon" className="size-8" />
            BoardTime
          </span>
          <p className="text-sm mb-4 md:mb-0">
            © {date} BoardTime. Все права защищены.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Присоединяйтесь к нам</h3>
          <div className="flex space-x-4">
            <a
              href="https://t.me/board_time"
              className="hover:text-blue-500 transition-colors"
            >
              <span className="sr-only">Telegram</span>
              <FaTelegram className="size-6" />
            </a>
            {/* <a
            href="#"
            className="text-white hover: transition-colors"
          >
            <span className="sr-only">VK</span>
            <FaVk className="size-6" />
          </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
