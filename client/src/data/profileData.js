export const userData = {
  username: "LeCheval",
  email: "cheval@Polytech.angers",
  bio: "Coucou",
  avatar: "/assets/profil/cheval.jpg",
  joinDate: "mars 2022",
  favoritesCount: 12,
  reviewsCount: 8,
  contributionPoints: 345
};

export const userDestinations = [
  {
    id: 1,
    name: "Jardin des Plantes",
    category: "Nature",
    rating: 4.7,
    image: "/assets/destinations/jardin-plantes.jpg"
  },
  {
    id: 2,
    name: "La Table de la Bergerie",
    category: "Restaurant",
    rating: 4.6,
    image: "/assets/destinations/table-bergerie.jpg"
  },
  {
    id: 3,
    name: "Château d'Angers",
    category: "Culture",
    rating: 4.8,
    image: "/assets/destinations/chateau-angers.jpg"
  },
  {
    id: 4,
    name: "Le Verre Tige",
    category: "Bar",
    rating: 4.4,
    image: "/assets/destinations/verre-tige.jpg"
  }
];

export const userReviews = [
  {
    id: 1,
    destinationName: "Terra Botanica",
    destinationImage: "/assets/destinations/terra-botanica.jpg",
    rating: 5,
    text: "Un parc absolument magnifique, idéal pour une journée en famille. Les serres tropicales sont impressionnantes et les animations très bien faites.",
    date: "15 avril 2023"
  },
  {
    id: 2,
    destinationName: "La Réserve",
    destinationImage: "/assets/destinations/la-reserve.jpg",
    rating: 4,
    text: "Excellent restaurant avec un service impeccable. Le menu dégustation vaut vraiment le détour, les produits sont frais et bien préparés.",
    date: "2 mars 2023"
  }
];