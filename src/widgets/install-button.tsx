import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Share } from "lucide-react";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    deferredPrompt: Event | null;
    MSStream: undefined;
  }
}

function InstallButton() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const installPromptRef = useRef<Event | null>(null);

  useEffect(() => {
    const userAgent = navigator.userAgent;

    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    setIsIOS(isIOSDevice);

    const isStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window.navigator as any).standalone === true;
    setIsStandalone(isStandaloneMode);

    if (!isStandaloneMode && isIOSDevice) {
      setCanInstall(true);
    } else if (!isStandaloneMode && !isIOSDevice) {
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        window.deferredPrompt = e;
        installPromptRef.current = e;
        setCanInstall(true);
      };

      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

      return () => {
        window.removeEventListener(
          "beforeinstallprompt",
          handleBeforeInstallPrompt
        );
      };
    }

    const handleAppInstalled = () => {
      setCanInstall(false);
      setIsStandalone(true);
      window.deferredPrompt = null;
      installPromptRef.current = null;
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = () => {
    if (installPromptRef.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      installPromptRef.current.prompt();
      installPromptRef.current = null;
      window.deferredPrompt = null;
      setCanInstall(false);
    }
  };

  return (
    <div
      className={cn(
        isStandalone ? !canInstall && "opacity-0 pointer-events-none" : ""
      )}
    >
      <div className="flex items-center flex-col mx-auto mb-8 mt-4 text-center  bg-white rounded-lg p-4 border-blue-100 border-2 w-fit">
        <p className="text-sm mb-4 max-w-xs">
          {isIOS
            ? "Добавьте приложение на главный экран для лучшего опыта."
            : "Установите приложение для быстрого доступа и автономной работы."}
        </p>

        {isIOS ? (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-sm leading-relaxed">
            <p className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-200">
              Нажмите{" "}
              <Share size={16} className="text-blue-600 dark:text-blue-400" />{" "}
              <span className="hidden sm:inline">(поделиться)</span>
              затем{" "}
              <strong className="flex items-center gap-1">
                «На экран „Домой“»
                <Plus
                  size={14}
                  className="text-green-600 dark:text-green-400"
                />
              </strong>
            </p>
          </div>
        ) : (
          <Button onClick={handleInstallClick}>Установить приложение</Button>
        )}
      </div>
      <div className="grow"></div>
    </div>
  );
}

export { InstallButton };
