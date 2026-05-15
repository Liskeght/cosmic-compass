export type Planet = {
  id: string;
  name: string;
  ru: string;
  diameter: string;
  temperature: string;
  distance: string;
  description: string;
  fact: string;
  gradient: string;
  ring?: boolean;
};

export const planets: Planet[] = [
  {
    id: "mercury", name: "Mercury", ru: "Меркурий",
    diameter: "4 879 км", temperature: "−173…+427 °C", distance: "57.9 млн км",
    description: "Самая маленькая планета Солнечной системы и ближайшая к Солнцу.",
    fact: "День на Меркурии длится 176 земных суток — дольше его года.",
    gradient: "linear-gradient(135deg,#b9a288,#5d4a3a 70%,#2a1f17)",
  },
  {
    id: "venus", name: "Venus", ru: "Венера",
    diameter: "12 104 км", temperature: "+465 °C", distance: "108 млн км",
    description: "Самая горячая планета — её атмосфера из CO₂ создаёт парниковый эффект.",
    fact: "Венера вращается в обратную сторону: Солнце там встаёт на западе.",
    gradient: "linear-gradient(135deg,#f6d7a0,#c98a3f 60%,#5e2e0d)",
  },
  {
    id: "earth", name: "Earth", ru: "Земля",
    diameter: "12 742 км", temperature: "−88…+58 °C", distance: "149.6 млн км",
    description: "Наш дом — единственная известная планета с жизнью.",
    fact: "71% поверхности покрыто водой, а ядро горячее, чем поверхность Солнца.",
    gradient: "linear-gradient(135deg,#5cb8e6,#2c6da6 55%,#0f3a5b)",
  },
  {
    id: "mars", name: "Mars", ru: "Марс",
    diameter: "6 779 км", temperature: "−153…+20 °C", distance: "227.9 млн км",
    description: "Красная планета с пустынями, ледниками и крупнейшим вулканом — Олимпом.",
    fact: "Гора Олимп на Марсе в 2.5 раза выше Эвереста.",
    gradient: "linear-gradient(135deg,#e07a5f,#a83a25 60%,#4a160b)",
  },
  {
    id: "jupiter", name: "Jupiter", ru: "Юпитер",
    diameter: "139 820 км", temperature: "−145 °C", distance: "778 млн км",
    description: "Газовый гигант, самая большая планета — массивнее всех остальных вместе.",
    fact: "Большое Красное Пятно — шторм, бушующий уже более 350 лет.",
    gradient: "linear-gradient(135deg,#e6cba0,#a06a3a 50%,#5b3015)",
  },
  {
    id: "saturn", name: "Saturn", ru: "Сатурн",
    diameter: "116 460 км", temperature: "−178 °C", distance: "1.43 млрд км",
    description: "Окольцованный гигант — его кольца состоят изо льда и пыли.",
    fact: "Сатурн настолько лёгкий, что плавал бы в воде, если бы существовал такой океан.",
    gradient: "linear-gradient(135deg,#f1d9a0,#b88a45 60%,#5b3a18)",
    ring: true,
  },
  {
    id: "uranus", name: "Uranus", ru: "Уран",
    diameter: "50 724 км", temperature: "−224 °C", distance: "2.87 млрд км",
    description: "Ледяной гигант, лежащий «на боку» — его ось наклонена почти на 98°.",
    fact: "Уран катится по орбите, а его полюса по очереди смотрят на Солнце.",
    gradient: "linear-gradient(135deg,#aef0ec,#3f9aa3 60%,#0f3a45)",
  },
  {
    id: "neptune", name: "Neptune", ru: "Нептун",
    diameter: "49 244 км", temperature: "−218 °C", distance: "4.5 млрд км",
    description: "Самая дальняя планета с самыми сильными ветрами — до 2 100 км/ч.",
    fact: "Год на Нептуне длится 165 земных лет.",
    gradient: "linear-gradient(135deg,#5673e6,#2738a3 60%,#0c1450)",
  },
];
