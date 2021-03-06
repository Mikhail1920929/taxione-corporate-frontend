let phoneNumber = ''

const countries = {
  'AE': '+### ###-###-####', //  Арабские Эмираты
  'AR': '+## # ### ###-####', // Аргентитна
  'AU': '+## # #### ####', // Австралия
  get 'AT' () { // Австрия
    return (phoneNumber[3] === '1') ? '+## (#) ###-####' : '+## (###) ###-###'
  },
  'BE': '+## # ### ## ##', // Бельгия
  'BH': '+### ####-####', // Бахреин
  'BR': '+(## ##) ### ### ##', // Бразилия
  'CL': '+## #-####-####', // Чили
  'CY': '+### ##-######', // Кипр
  'CZ': '+### ###-###-###', // Чехия
  'DE': '+## #####-#####', // Германия
  'DO': '+# ###-###-####', // Доминикана
  'EC': '+###-##-###-##-##', // Эквадор
  'EE': '+### ####-####', // Эстония
  'EG': '+## ####-###-####', // Египет
  'ES': '+## ##########', // Испания
  'FI': '+### ## ### ## ##', // Финляндия
  'FR': '+## # ## ## ## ##', // Франция
  'GB': '+## #####-######', // Британия
  'GH': '+### ###-###-####', // Гана
  'HU': '+## ##-###-####', // Венгрия
  'ID': '+## ####-###-###', // Индонезия
  'IQ': '+### ### ### ####', // Ирак
  'IL': '+###-##-#######', // Израиль
  'JO': '+# (###) ###-##-##', // Иордания
  'KE': '+### #########', // Кения
  'KH': '+### ###-###-###', // Камбоджа
  'KW': '+### ###-######', // Кувейт
  'LB': '+### ###-######', // Ливан
  'LV': '+### #########', // Латвия
  'MA': '+### ####-#####', // Марокко
  'MX': '+## ###-###-###-####', // Мексика
  'MT': '+### #########', // Мальта
  'MY': '+## ###-###-####', // Малазия
  'NG': '+### ####-###-####', // Нигерия
  'NL': '+## ##-########', // Нидерланды
  'NZ': '+## (###) ###-##-##', // Новая Зеландия
  'PK': '+## ####-#######', // Пакистан
  'PE': '+## ###-###-###', // Перу
  'PH': '+## ####-###-####', // Филипины
  'PL': '+## ###-###-###', // Польша
  'PT': '+### ###-###-###', // Португалия
  'RU': '+# (###) ###-##-##', // Россия
  'RO': '+## ####-###-###', // Румыния
  'SA': '+### ###-###-####', // Саудовская Аравия
  'SE': '+## ###-##-##-##', // Швеция
  'SG': '+## ####-####', // Сингапур
  'SK': '+### ####-###-###', // Словакия
  'TH': '+## ###-###-####', // Тайланд
  'TZ': '+### ####-###-###', // Танзания
  'QA': '+### ####-####', // Катар
  'UA': '+### ##-###-####', // Украина
  'UG': '+### ####-######', // Уганда
  'US': '+# ###-###-####', // США
  'VN': '+## ###-###-##-##', // Вьетнам
  'ZA': '+## ###-###-####', // Южная Африка

  'default': '+###############'
}

export function getMask (country, number) {
  phoneNumber = number
  return countries[country] || countries['default']
}
