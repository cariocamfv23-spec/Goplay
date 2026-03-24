export const foodCategories = [
  'Todos',
  'Pré treino',
  'Pós treino',
  'Receita',
  'Saudável',
  'Fitness',
  'Proteína',
  'Energia',
  'Hipertrofia',
  'Emagrecimento',
  'Nutrição esportiva',
  'Vegano',
  'Low carb',
  'Alimentação saudável',
]

export const foodHighlights = [
  {
    id: 1,
    title: 'Receita da semana',
    image:
      'https://img.usecurling.com/p/400/300?q=healthy%20recipe&color=green',
    label: 'Panqueca Proteica',
  },
  {
    id: 2,
    title: 'Destaque do dia',
    image: 'https://img.usecurling.com/p/400/300?q=salad%20bowl&color=orange',
    label: 'Salada de Quinoa',
  },
  {
    id: 3,
    title: 'Top Food Sport',
    image: 'https://img.usecurling.com/p/400/300?q=smoothie&color=purple',
    label: 'Smoothie Energético',
  },
  {
    id: 4,
    title: 'Atleta Chef da semana',
    image: 'https://img.usecurling.com/ppl/medium?gender=female&seed=22',
    label: '@mariachef',
  },
  {
    id: 5,
    title: 'Post mais curtido',
    image: 'https://img.usecurling.com/p/400/300?q=chicken%20rice&color=yellow',
    label: 'Frango com Batata Doce',
  },
  {
    id: 6,
    title: 'Receita mais salva',
    image: 'https://img.usecurling.com/p/400/300?q=avocado%20toast&color=green',
    label: 'Avocado Toast',
  },
]

export const mockFoodPosts = [
  {
    id: 201,
    type: 'image',
    user: {
      id: 'u5',
      name: 'Beatriz Lima',
      type: 'Nutricionista',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=23',
    },
    template: 'Receita',
    content:
      'Mingau de aveia super cremoso para começar o dia com muita energia! 💪✨\n\n- 3 colheres de aveia\n- 1 scoop de whey de baunilha\n- Canela a gosto\n- Frutas vermelhas para decorar\n\nRápido, prático e focado na hipertrofia.',
    image:
      'https://img.usecurling.com/p/800/800?q=oatmeal%20bowl&color=pink&dpr=2',
    hashtags: ['#Receita', '#PreTreino', '#Saudavel'],
    likes: 1250,
    comments: 89,
    shares: 45,
    saves: 320,
    favorites: 150,
    time: '2h',
    liked: true,
    saved: true,
  },
  {
    id: 202,
    type: 'image',
    user: {
      id: 'u1',
      name: 'Alex Silva',
      type: 'Atleta',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=1',
    },
    template: 'Pós treino',
    content:
      'Recuperação é tudo! O clássico frango, arroz e brócolis depois de 2 horas de treino intenso. Nutrição é a base da performance. 🥦🍗',
    image:
      'https://img.usecurling.com/p/800/800?q=chicken%20broccoli%20rice&color=green&dpr=2',
    hashtags: ['#PosTreino', '#Foco', '#NutricaoEsportiva'],
    likes: 856,
    comments: 22,
    shares: 10,
    saves: 45,
    favorites: 80,
    time: '4h',
    liked: false,
    saved: false,
  },
  {
    id: 203,
    type: 'video',
    user: {
      id: 'u9',
      name: 'Juliana Costa',
      type: 'Atleta',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=56',
    },
    template: 'Rotina alimentar',
    content:
      'Preparando as marmitas da semana. Organização é o segredo para não furar a dieta! 🥗🍱',
    image:
      'https://img.usecurling.com/p/800/800?q=meal%20prep%20containers&color=orange&dpr=2',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    hashtags: ['#MealPrep', '#Rotina', '#LowCarb'],
    likes: 3400,
    comments: 150,
    shares: 500,
    saves: 1200,
    favorites: 400,
    time: 'Ontem',
    liked: true,
    saved: true,
  },
]
