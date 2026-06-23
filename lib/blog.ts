export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readingTime: string;
  tone: string; // couleur du bloc visuel (pas d'image externe)
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "reduire-no-shows-restaurant",
    title: "5 façons concrètes de réduire les no-shows",
    excerpt: "Des tactiques éprouvées par les restaurateurs romands pour remplir leur salle, sans braquer les clients.",
    date: "12 mai 2026",
    category: "Stratégie",
    readingTime: "6 min",
    tone: "#fcf376",
    content: [
      "Le no-show n'est pas une fatalité. Les restaurants qui le maîtrisent appliquent quelques principes simples et constants.",
      "1. Rappeler au bon moment. Un SMS la veille puis deux heures avant l'arrivée suffit à diviser les oublis par trois.",
      "2. Responsabiliser les grandes tables avec un acompte symbolique. Personne n'oublie une réservation pour laquelle il a engagé 30 francs.",
      "3. Faciliter l'annulation. Paradoxalement, plus il est simple d'annuler, plus les clients préviennent — et vous libérez la table à temps.",
      "4. Mesurer. Sans chiffres, impossible de progresser. Suivez votre taux de no-show semaine après semaine.",
      "5. Soigner la relation. Un message chaleureux vaut mieux qu'un rappel administratif.",
    ],
  },
  {
    slug: "acompte-reservation-bonne-pratique",
    title: "Demander un acompte sans faire fuir les clients",
    excerpt: "Comment introduire un acompte de réservation perçu comme normal, voire rassurant.",
    date: "28 avril 2026",
    category: "Acomptes",
    readingTime: "5 min",
    tone: "#d8542a",
    content: [
      "L'acompte fait peur aux restaurateurs : et si les clients fuyaient ? En pratique, bien présenté, il rassure.",
      "La clé : le rendre déductible de l'addition et le réserver aux tables à risque (groupes, week-ends, événements).",
      "Annoncez-le clairement au moment de la réservation. La transparence évite toute mauvaise surprise.",
    ],
  },
  {
    slug: "sms-rappel-restaurant",
    title: "Le SMS, l'arme la plus sous-estimée du restaurateur",
    excerpt: "98% des SMS sont lus dans les 3 minutes. Voici comment en faire un atout.",
    date: "15 avril 2026",
    category: "SMS",
    readingTime: "4 min",
    tone: "#1f6f4a",
    content: [
      "L'email se perd, l'appel dérange. Le SMS, lui, est lu — presque toujours, presque tout de suite.",
      "Un bon rappel est court, chaleureux et actionnable : date, heure, nombre de couverts, et un moyen simple de confirmer.",
      "Évitez le ton robotique. Un SMS qui ressemble à un mot du chef fonctionne mieux qu'une notification système.",
    ],
  },
  {
    slug: "remplir-salle-soir-semaine",
    title: "Remplir sa salle les soirs de semaine",
    excerpt: "Le mardi soir vide n'est pas une fatalité. Quelques leviers concrets.",
    date: "2 avril 2026",
    category: "Stratégie",
    readingTime: "7 min",
    tone: "#7a1f2b",
    content: [
      "Les soirs creux pèsent sur la rentabilité. Pourtant, quelques leviers les transforment.",
      "Offres ciblées, communication locale, fidélisation des habitués : tout commence par connaître ses clients.",
      "Une base de données clients bien tenue vaut de l'or pour réactiver les soirs calmes.",
    ],
  },
  {
    slug: "experience-client-reservation",
    title: "L'expérience commence avant l'assiette",
    excerpt: "La réservation est le premier contact. Soignez-la comme un plat signature.",
    date: "20 mars 2026",
    category: "Expérience",
    readingTime: "5 min",
    tone: "#1e3a8a",
    content: [
      "Avant même de goûter votre cuisine, le client juge votre restaurant à la facilité de réserver.",
      "Une page de réservation claire, à votre image, inspire confiance et donne le ton de la soirée.",
      "Chaque friction évitée est une réservation gagnée.",
    ],
  },
  {
    slug: "data-restaurant-decisions",
    title: "Piloter son restaurant avec ses données",
    excerpt: "Taux de no-show, créneaux forts, panier moyen : ce que vos chiffres racontent.",
    date: "8 mars 2026",
    category: "Data",
    readingTime: "6 min",
    tone: "#555553",
    content: [
      "Intuition et expérience restent précieuses, mais les chiffres tranchent les débats.",
      "Identifiez vos créneaux les plus demandés, vos sources de no-show, vos clients les plus fidèles.",
      "Décider sur la base de données, c'est arrêter de subir et commencer à piloter.",
    ],
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
