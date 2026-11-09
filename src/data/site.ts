export type Lang = 'ru' | 'en';
export const languages: Lang[] = ['ru', 'en'];
export const updated = '2026-11-09';
export const pick = <T>(lang: Lang, ru: T, en: T): T => lang === 'ru' ? ru : en;
export const url = (lang: Lang, path = '') => `/${lang}/${path ? `${path.replace(/^\/+|\/+$/g, '')}/` : ''}`;
export const person = {
  name: { ru: 'Радмир Исламов', en: 'Radmir Islamov' },
  email: 'my@radisl.ru', gmail: 'raraislamov@gmail.com', github: 'https://github.com/Therad445',
  telegram: 'https://t.me/Rad445',
  vk: 'https://vk.ru/rad445',
  instagram: 'https://www.instagram.com/therad445/',
  summary: {
    ru: 'Инженер программного обеспечения. Надёжность систем, наблюдаемость и прикладной ИИ. Исследования на пересечении машинного обучения и сложных данных.',
    en: 'Software engineer working on system reliability, observability and applied AI. Exploring machine learning and the evaluation of complex data.'
  },
  intro: {
    ru: 'Я программист. Пишу на Java и Python, работаю с инфраструктурой и изучаю машинное обучение.',
    en: 'I’m a programmer. I write Java and Python, work with infrastructure and study machine learning.'
  },
  bio: {
    ru: [
      'Меня зовут Радмир Исламов. Я программист, окончил МИЭТ по направлению «Программная инженерия». После бакалавриата продолжил учёбу на магистерских программах ВШЭ и МФТИ.',
      'Начинал с Java и системного программирования. Потом стал больше заниматься инфраструктурой: мониторингом, автоматизацией и надёжностью сервисов. Работал в VK и Т-Банке — с ИТ-поддержкой, инфраструктурой и SRE.',
      'Сейчас изучаю машинное обучение. Одна из тем, которыми я занимаюсь, — распознавание старых тюркских текстов арабской графики. В ней меня интересует, как проверить результат модели, когда даже правильную транскрипцию получить непросто.',
      'Ещё люблю древнюю историю, классическую литературу и языки. Часто возвращаюсь к сюжетам о судьбе и свободе воли: что человек может изменить, а что уже определено его происхождением или прошлыми поступками.'
    ],
    en: [
      'My name is Radmir Islamov. I’m a programmer with a bachelor’s degree in Software Engineering from MIET. After graduating, I continued my studies on master’s programmes at HSE University and MIPT.',
      'I started with Java and systems programming, then moved towards infrastructure: monitoring, automation and service reliability. My work at VK and T-Bank involved IT support, infrastructure and SRE.',
      'I now study machine learning. One topic I’m working on is recognising historical Turkic texts in Arabic script. I’m interested in how to check a model’s output when obtaining a reliable transcription is itself difficult.',
      'I also enjoy ancient history, classical literature and languages. I often return to stories about fate and free will: what people can change, and what has already been shaped by their origins or earlier choices.'
    ]
  }
};
export const sections = [
  { slug: 'about', ru: 'Обо мне', en: 'About' },
  { slug: 'projects', ru: 'Проекты', en: 'Projects' },
  { slug: 'research', ru: 'Исследования', en: 'Research' },
  { slug: 'writing', ru: 'Заметки', en: 'Notes' },
  { slug: 'library', ru: 'Книги', en: 'Books' },
  { slug: 'contact', ru: 'Контакты', en: 'Contact' },
] as const;
export const research = [
  { id: 'historical-ocr', code: '01 / OCR & VLM',
    title: { ru: 'OCR исторических текстов', en: 'OCR for historical texts' },
    subtitle: { ru: 'Надёжность оценки OCR и VLM', en: 'Reliable evaluation of OCR and VLMs' },
    text: { ru: 'Насколько можно доверять оценкам распознавания исторических тюркских текстов арабской графики? В центре работы — качество эталонов, различия между документами и протоколами оценки.', en: 'How much can we trust recognition scores for historical Turkic texts in Arabic script? The work focuses on reference quality, differences between documents and evaluation protocols.' },
    method: { ru: 'Подготовка и проверка эталонных транскрипций; анализ ошибок распознавания; сопоставление языков и типов документов.', en: 'Preparing and auditing reference transcriptions; analysing recognition errors; comparing languages and document types.' },
    status: { ru: 'Исследование в работе', en: 'Research in progress' },
    limit: { ru: 'Публичной статьи и открытого набора окончательных результатов пока нет. Автоматические транскрипции не считаются проверенным эталоном.', en: 'There is no public paper or final results release yet. Automatic transcriptions are not treated as validated ground truth.' }
  },
  { id: 'llm-telemetry', code: '02 / ML SYSTEMS',
    title: { ru: 'Наблюдаемость LLM-систем', en: 'Observing LLM systems' },
    subtitle: { ru: 'Детальность телеметрии и стоимость её экспорта', en: 'Telemetry resolution and export volume' },
    text: { ru: 'Как временное разрешение телеметрии влияет на атрибуцию нагрузки между арендаторами LLM-сервиса и объём экспортируемых данных?', en: 'How does temporal resolution affect tenant attribution in LLM serving and the volume of exported telemetry?' },
    method: { ru: 'Исследовательская работа с трассами и живым стендом; проверка методики, ограничений и воспроизводимости наблюдений.', en: 'Exploratory work using traces and a live testbed, with an audit of methods, limitations and reproducibility.' },
    status: { ru: 'Эксперименты и аудит', en: 'Experiments and audit' },
    limit: { ru: 'Работа не представлена как рецензируемая публикация. Численные выводы не вынесены на сайт до завершения проверки.', en: 'This work is not presented as a peer-reviewed publication. Numerical conclusions are withheld pending completion of the audit.' }
  },
  { id: 'graph-learning', code: '03 / GRAPH LEARNING',
    title: { ru: 'Сообщества в графах', en: 'Communities in graphs' },
    subtitle: { ru: 'Графовые нейронные сети и структура связей', en: 'Graph neural networks and relational structure' },
    text: { ru: 'Магистерское направление: выявление сообществ в графах юридических лиц с применением графовых нейронных сетей.', en: 'Master’s research direction: community detection in graphs of legal entities using graph neural networks.' },
    method: { ru: 'Адаптация существующих методов и сравнение с классическими алгоритмами выделения сообществ, включая Louvain.', en: 'Adapting existing methods and comparing them with classical community-detection algorithms, including Louvain.' },
    status: { ru: 'Магистерское исследование', en: 'Master’s research' },
    limit: { ru: 'Данные организаций и внутренние материалы не раскрываются. Новизна и практическая эффективность ещё не установлены.', en: 'Organisational data and internal materials are not disclosed. Novelty and practical effectiveness have not yet been established.' }
  }
];
export const publications = [
  { id: 'nginx-monitoring', date: '2025-06-23', year: '2025',
    authors: { ru: 'Р. Р. Исламов', en: 'R. R. Islamov' },
    title: { ru: 'Разработка программного модуля для мониторинга и анализа серверных логов Nginx', en: 'Developing a software module for monitoring and analysing Nginx server logs' },
    originalTitle: 'Разработка программного модуля для мониторинга и анализа серверных логов Nginx',
    venue: { ru: 'Молодой учёный · № 25 (576) · с. 7–10', en: 'Molodoy Ucheny · No. 25 (576) · pp. 7–10' },
    type: { ru: 'Журнальная статья', en: 'Journal article' },
    href: 'https://moluch.ru/archive/576/125503',
    description: { ru: 'Модульный подход к мониторингу Nginx, статистическому анализу журналов и подготовке отчётов.', en: 'A modular approach to Nginx monitoring, statistical log analysis and report generation.' }
  },
  { id: 'nginx-streaming', date: '2025-07-05', year: '2025',
    authors: { ru: 'Р. Р. Исламов', en: 'R. R. Islamov' },
    title: { ru: 'Потоковая обработка логов Nginx в кластере Kubernetes', en: 'Stream-based processing of Nginx logs in Kubernetes' },
    originalTitle: 'Потоковая обработка логов Nginx в кластере Kubernetes',
    venue: { ru: '«Лучшая научная работа 2025» · Пенза · с. 13–17', en: '“Best Scientific Work 2025” proceedings · Penza · pp. 13–17' },
    type: { ru: 'Статья в сборнике', en: 'Proceedings article' },
    href: 'https://naukaip.ru/wp-content/uploads/2025/07/K-803.pdf#page=13',
    description: { ru: 'Конвейер Filebeat, Kafka, Flink и ClickHouse; развёртывание в Kubernetes с Helm и Argo CD.', en: 'A Filebeat, Kafka, Flink and ClickHouse pipeline, deployed to Kubernetes with Helm and Argo CD.' }
  },
  { id: 'stolypin-reforms', date: '2022-05-26', year: '2022',
    authors: { ru: 'Р. Р. Исламов, В. В. Наточий', en: 'R. R. Islamov, V. V. Natochiy' },
    title: { ru: 'Анализ столыпинских реформ', en: 'An analysis of Stolypin’s reforms' },
    originalTitle: 'Анализ столыпинских реформ',
    venue: { ru: '«Социально-гуманитарные инновации: стратегии фундаментальных и прикладных научных исследований» · ОГУ · с. 53–58', en: '“Social and Humanities Innovations: Strategies for Fundamental and Applied Research” · Orenburg State University · pp. 53–58' },
    type: { ru: 'Статья в материалах конференции', en: 'Conference proceedings article' },
    href: 'https://sci-conference.osu.ru/assets/files/conf_info/conf4/s1.pdf#page=53',
    description: { ru: 'Ранняя студенческая работа о реформах Петра Столыпина и их историческом контексте.', en: 'An early student paper on Pyotr Stolypin’s reforms and their historical context.' }
  }
];
export const talks = [
  { id: 'miet-2025', year: '2025',
    title: { ru: 'Разработка программного модуля для мониторинга и анализа серверных логов Nginx', en: 'Developing a software module for monitoring and analysing Nginx server logs' },
    venue: { ru: 'XXXII конференция «Микроэлектроника и информатика — 2025», МИЭТ', en: '32nd “Microelectronics and Informatics — 2025” conference, MIET' },
    detail: { ru: 'Тезисы и включение в программу секции «Информационные системы и технологии в цифровой экономике».', en: 'A conference abstract and a programme entry in the Information Systems and Technologies in the Digital Economy section.' },
    href: undefined
  },
  { id: 'labour-migration-2024', year: '2024',
    title: { ru: 'Внутренняя трудовая миграция населения на территории России', en: 'Internal labour migration in Russia' },
    venue: { ru: 'X конкурс НИР «Экономическое развитие страны: современные вызовы и пути их решения», Мининский университет', en: '10th student research competition “Economic Development: Current Challenges and Solutions”, Minin University' },
    detail: { ru: 'Конкурсное эссе. Участие в секции «Роль трудовых ресурсов в развитии промышленных предприятий».', en: 'A competition essay in the section on the role of labour resources in industrial development.' },
    href: 'https://mininuniver.ru/images/docs/kalendar-meropriyatij/2024/Протокол_конкурса_НИР_07.11.2024.pdf'
  },
  { id: 'photomath-2022', year: '2022',
    title: { ru: 'Анализ возможностей приложения Photomath', en: 'An analysis of the capabilities of Photomath' },
    venue: { ru: 'XLIV Международная студенческая научная конференция, ОГУ', en: '44th International Student Research Conference, Orenburg State University' },
    detail: { ru: 'Доклад, указанный в программе совместно с Т. Н. Тарасовой. За доклад получено благодарственное письмо факультета математики и информационных технологий ОГУ.', en: 'A presentation listed in the programme with T. N. Tarasova. The Faculty of Mathematics and Information Technology issued a letter of appreciation for the presentation.' },
    href: 'https://konf.osu.ru/student/assets/files/conf_info/conf1/d1.pdf#page=22'
  }
];
export const furtherEducation = [
  { label: {ru:'Т-Академия',en:'T-Academy'}, period:'2026', text:{ru:'Бэкенд: «Разработка на Java» и «Надёжность ПО»',en:'Backend programme: Java Development and Software Reliability'} },
  { label: {ru:'ФКН НИУ ВШЭ',en:'HSE Faculty of Computer Science'}, period:'19–20.08.2023', text:{ru:'Участник летней школы по аналитике и Data Science',en:'Participant in the Summer School in Analytics and Data Science'} },
  { label: {ru:'МИЭТ',en:'MIET'}, period:'2023', text:{ru:'Повышение квалификации «Цифровой инструментарий и методология анализа научных текстов», 36 часов',en:'Continuing education in Digital Tools and Methods for Analysing Scholarly Texts, 36 hours'} }
];
export const awards = [
  { year:'2025', title:{ru:'Конкурс портфолио ИТМО',en:'ITMO portfolio competition'},
    text:{ru:'Победитель по трём магистерским программам: «Распределённые веб-сервисы», «DevOps-инженер облачных сервисов» и «Управление высокотехнологичным бизнесом».',en:'Winner for three master’s programmes: Distributed Web Services, Cloud Services DevOps Engineer and High-Tech Business Management.'} },
  { year:'2025', title:{ru:'«Лучшая научная работа — 2025»',en:'“Best Scientific Work — 2025”'},
    text:{ru:'II место в секции «Технические науки» XX Международного научно-исследовательского конкурса МЦНС «Наука и Просвещение» за работу о потоковой обработке логов Nginx в Kubernetes.',en:'Second place in the Technical Sciences section of the 20th International Research Competition organised by the Science and Education International Centre for Scientific Cooperation, for a paper on streaming Nginx logs in Kubernetes.'} }
];
export const education = [
  { label: {ru:'МИЭТ',en:'MIET'}, period:'2021–2025', text:{ru:'Бакалавриат · Программная инженерия',en:'Bachelor’s degree · Software Engineering'} },
  { label: {ru:'НИУ ВШЭ',en:'HSE University'}, period:'2025', text:{ru:'Магистерская программа «Исследования и предпринимательство в ИИ»',en:'Graduate programme · AI Research and Entrepreneurship'} },
  { label: {ru:'МФТИ',en:'MIPT'}, period:'2026', text:{ru:'Магистерская программа «Машинный интеллект в финансах»',en:'Graduate programme · Machine Intelligence in Finance'} }
];
export const books = [
  {author:{ru:'Уильям Шекспир',en:'William Shakespeare'},title:{ru:'Макбет',en:'Macbeth'},note:{ru:'Больше всего люблю у Шекспира именно «Макбета». Интересно, насколько пророчество определяет его поступки, а насколько он сам превращает его в оправдание.',en:'My favourite Shakespeare play. I’m interested in how much the prophecy shapes Macbeth’s actions, and how much he turns it into an excuse.'},roman:'I'},
  {author:{ru:'Гомер',en:'Homer'},title:{ru:'Одиссея',en:'The Odyssey'},note:{ru:'Мне ближе «Илиады»: прежде всего историей возвращения домой. А эпизод с «Никто» и циклопом — один из любимых.',en:'I prefer it to the Iliad, especially for the story of returning home. The episode with “Nobody” and the Cyclops is a favourite.'},roman:'II'},
  {author:{ru:'Г. Ф. Лавкрафт',en:'H. P. Lovecraft'},title:{ru:'Тень над Иннсмутом',en:'The Shadow over Innsmouth'},note:{ru:'Любимый текст Лавкрафта. Особенно цепляет попытка героя убежать от собственного происхождения и то, чем она заканчивается.',en:'My favourite Lovecraft story. What stays with me is the narrator’s attempt to escape his own origins, and where it leads.'},roman:'III'}
];
