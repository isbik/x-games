"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  Timer,
  Vote,
  Shuffle,
  PlayCircle,
  PlusCircle,
  MinusCircle,
  Eye,
} from "lucide-react";
import { cn, shuffle } from "@/lib/utils";
import { useEndTimer } from "@/shared/hooks/use-end-timer";

const LOCATIONS = [
  "Аэропорт",
  "Банк",
  "Бар",
  "Пляж",
  "Корабль",
  "Книжный магазин",
  "Боулинг",
  "Автобусная станция",
  "Казино",
  "Замок",
  "Кладбище",
  "Церковь",
  "Кинотеатр",
  "Цирк",
  "Концертный зал",
  "Стройплощадка",
  "Суд",
  "Круизный лайнер",
  "Пустыня",
  "Закусочная",
  "Ферма",
  "Пожарная станция",
  "Футбольный стадион",
  "Лес",
  "Заправка",
  "Спортзал",
  "Больница",
  "Отель",
  "Тюрьма",
  "Порт",
  "Ресторан",
  "Метро",
  "Военная база",
  "Музей",
  "Ночной клуб",
  "Океанариум",
  "Офис",
  "Парк аттракционов",
  "Парикмахерская",
  "Пиратский корабль",
  "Подводная лодка",
  "Полицейский участок",
  "Посольство",
  "Поезд",
  "Подземелье",
  "Почта",
  "Продуктовый магазин",
  "Психиатрическая больница",
  "Радиостанция",
  "Рынок",
  "Салон красоты",
  "Секретная лаборатория",
  "Склад",
  "Скейт-парк",
  "Снежная база",
  "Спа-салон",
  "Спортзал",
  "Станция метро",
  "Супермаркет",
  "Театр",
  "Телестудия",
  "Торговый центр",
  "Тюрьма строгого режима",
  "Университет",
  "Фабрика",
  "Фитнес-центр",
  "Фонтан",
  "Футбольное поле",
  "Шахта",
  "Школа",
  "Экзотический остров",
  "Электростанция",
  "Яхта",
  "Автостоянка",
  "Библиотека",
  "Бильярдный клуб",
  "Вокзал",
  "Волшебный лес",
  "Выставка",
  "Гараж",
  "Гольф-клуб",
  "Горнолыжный курорт",
  "Госпиталь",
  "Детективное агентство",
  "Детский сад",
  "Диснейленд",
  "Дом моды",
  "Древний храм",
  "Заброшенный дом",
  "Зоопарк",
  "Игровой клуб",
  "Картинг-центр",
  "Каток",
  "Кибер-кафе",
  "Кладовая",
  "Конференц-зал",
  "Космическая станция",
  "Лагерь выживших",
  "Лесная хижина",
  "Мафия-бар",
  "Маяк",
  "Морской порт",
  "Небоскреб",
  "Оперный театр",
  "Пещера",
  "Ракетная база",
  "Секретный бункер",
  "Сельская ярмарка",
  "Станция техобслуживания",
  "Станция наблюдения",
  "Тюрьма для суперзлодеев",
  "Фестиваль уличной еды",
  "Фермерский рынок",
  "Хакерский центр",
  "Химическая лаборатория",
  "Центр подготовки спецагентов",
  "Часовня",
  "Штаб-квартира мафии",
  "Элитный ресторан",
  "Энергостанция",
  "Ювелирный магазин",
  "Ядерный полигон",
  "Альпинистский лагерь",
  "Аэродром",
  "Балетная школа",
  "Бассейн",
  "Бункер выживших",
  "Гипермаркет",
  "Гостиница у дороги",
  "Гран-при Формулы-1",
  "Детский парк",
  "Древняя гробница",
  "Железнодорожный мост",
  "Заброшенный завод",
  "Заповедник",
  "Затонувший корабль",
  "Зимний курорт",
  "Кабинет мэра",
  "Канатная дорога",
  "Карьер",
  "Кафедральный собор",
  "Киношная съемочная площадка",
  "Клуб для миллионеров",
  "Колизей",
  "Космодром",
  "Кремль",
  "Ледниковая станция",
  "Летний лагерь",
  "Магазин комиксов",
  "Магический университет",
  "Маяк на утесе",
  "Медицинская лаборатория",
  "Метеостанция",
  "Мини-гольф",
  "Монетный двор",
  "Мост через реку",
  "Музыкальный фестиваль",
  "Нефтяная платформа",
  "Оружейный склад",
  "Парк динозавров",
  "Пирамиды Египта",
  "Площадь города",
  "Поле для регби",
  "Полярная станция",
  "Подземный город",
  "Пристань для яхт",
  "Призрачный дом",
  "Психологическая клиника",
  "Римские катакомбы",
  "Робототехническая лаборатория",
  "Роллердром",
  "Секретная военная лаборатория",
  "Снежная крепость",
  "Спортивная арена",
  "Старинная библиотека",
  "Тайное общество",
  "Технопарк",
  "Тропа инков",
  "Тюремный изолятор",
  "Угольная шахта",
  "Улица красных фонарей",
  "Ферма с роботами",
  "Форт",
  "Хижина охотника",
  "Центр слежки",
  "Частный пляж",
  "Шахматный клуб",
  "Школа магии",
  "Электричка",
  "Эльфийский лес",
  "Ядерный реактор",
  "Японский сад",
];

const PLAYER_NAMES = [
  "Бобр",
  "Лиса",
  "Кот",
  "Собака",
  "Корова",
  "Кролик",
  "Попугай",
  "Колобок",
  "Орел",
  "Сова",
  "Медведь",
  "Волк",
  "Заяц",
  "Лось",
  "Кабан",
  "Олень",
  "Скунс",
  "Енот",
  "Хорек",
  "Выдра",
  "Барсук",
  "Леопард",
];

function App() {
  const [playerCount, setPlayerCount] = useState(3);

  const [players, setPlayers] = useState<string[]>([]);

  const [showedRoles, setShowedRoles] = useState<string[]>([]);

  const [showPlayerRole, setShowPlayerRole] = useState<string | null>(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEndTimer(timeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTimerRunning && timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const [gameData, setGameData] = useState<{
    location: string;
    spyPlayer: number;
  } | null>(null);

  const handleStartGame = () => {
    const randomLocation =
      LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
    const spyPlayer = Math.floor(Math.random() * playerCount) + 1;

    setGameData({
      location: randomLocation,
      spyPlayer: spyPlayer,
    });
    setGameStarted(true);
    setTimeLeft(120);

    setPlayers(shuffle(PLAYER_NAMES).slice(0, playerCount));

    setShowedRoles([]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsTimerRunning(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 px-6 pt-6 flex flex-col justify-end">
      <div className="max-w-2xl mx-auto w-full">
        <div className="bg-white rounded-t-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-purple-600">
            Шпион
          </h1>

          {!gameStarted ? (
            <div className="space-y-8">
              <div className="flex items-center justify-center space-x-6">
                <Users className="w-8 h-8 text-purple-500" />
                <div className="flex items-center space-x-4">
                  <button
                    disabled={playerCount <= 3}
                    onClick={() => setPlayerCount(Math.max(3, playerCount - 1))}
                    className="bg-purple-100 hover:bg-purple-200 rounded-full p-2 disabled:opacity-50"
                  >
                    <MinusCircle className="w-6 h-6 text-purple-600" />
                  </button>
                  <span className="text-2xl font-bold text-purple-600">
                    {playerCount}
                  </span>
                  <button
                    disabled={playerCount >= PLAYER_NAMES.length}
                    onClick={() => setPlayerCount(playerCount + 1)}
                    className="bg-purple-100 hover:bg-purple-200 rounded-full p-2 disabled:opacity-50"
                  >
                    <PlusCircle className="w-6 h-6 text-purple-600" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-center text-gray-700">
                  Подготовка к игре:
                </h2>
                <div className="bg-purple-50 rounded-xl p-6 space-y-4">
                  <p className="text-lg">Правила игры:</p>
                  <ul className="list-disc list-inside pl-4 space-y-2">
                    <li>Каждому игроку будет показана его роль</li>
                    <li>Один из игроков будет шпионом</li>
                    <li>Остальные узнают локацию</li>
                    <li>Задавайте вопросы и найдите шпиона!</li>
                  </ul>
                </div>

                <button
                  onClick={handleStartGame}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center space-x-2 transition-colors"
                >
                  <PlayCircle className="w-6 h-6" />
                  <span>Начать игру!</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex justify-center items-center space-x-4">
                <Timer className="w-8 h-8 text-purple-500" />
                <span className="text-4xl font-bold text-purple-600">
                  {formatTime(timeLeft)}
                </span>
              </div>

              <div className="bg-purple-50 p-6 px-6 sm:px-12 space-y-4 -mx-8 max-h-[680px] overflow-auto">
                <div className="flex flex-col items-center space-y-2">
                  {players.map((player, index) => {
                    const isSpy = index + 1 === gameData?.spyPlayer;
                    const isViewed =
                      showedRoles.includes(player) && showPlayerRole !== player;

                    return (
                      <React.Fragment key={player}>
                        <button
                          onClick={() => {
                            if (showPlayerRole === player) {
                              setShowPlayerRole(null);
                              return;
                            }

                            if (isViewed) return;

                            setShowPlayerRole(player);

                            setShowedRoles((prev) => {
                              return [...prev, player];
                            });
                          }}
                          className={cn(
                            "border-purple-600 bg-white border-2 hover:bg-purple-50 text-purple-600 font-bold py-3 px-6 rounded-xl w-full flex items-center space-x-2",
                            isViewed && "border-black/10 bg-black/5"
                          )}
                        >
                          <span className="mr-auto text-lg">{player}</span>

                          {!showedRoles.includes(player) && (
                            <>
                              <Eye className="size-5" />
                              <span>Показать роль</span>
                            </>
                          )}

                          {showPlayerRole === player && (
                            <div
                              className={`text-lg font-bold ${
                                isSpy ? "text-red-500" : "text-green-600"
                              }`}
                            >
                              {isSpy ? "Вы шпион!" : gameData?.location}
                            </div>
                          )}
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setGameStarted(false);
                    setGameData(null);
                    setShowPlayerRole(null);
                    setIsTimerRunning(false);
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 px-8 rounded-xl flex items-center justify-center space-x-2 transition-colors"
                >
                  <Shuffle className="w-6 h-6" />
                  <span>Новая игра</span>
                </button>
                <button
                  disabled={isTimerRunning}
                  onClick={handleStart}
                  className={cn(
                    "flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center space-x-2 transition-colors",
                    isTimerRunning && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Vote className="w-6 h-6" />
                  <span>Начать</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
