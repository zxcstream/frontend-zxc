export interface ReusableSwiperTypes {
  id: string; // slug used for routing + lookup
  endpoint: string;
  params: Record<string, string | number>;
  label?: string; // optional UI badge (year, etc.)
  displayName: string; // purely for UI text
  isVisible?: boolean;
  type: string;
}
export const movie_endpoints: ReusableSwiperTypes[] = [
  {
    id: "popular-movie",
    displayName: "Popular",
    endpoint: "discover",
    type: "movie",
    params: { sort_by: "popularity.desc" },
  },

  {
    id: "zombie",
    displayName: "Zombie",
    endpoint: "discover",
    type: "movie",
    params: { with_keywords: 186565, sort_by: "popularity.desc" },
  },
  {
    id: "found-footage",
    displayName: "Found Footage Horror",
    endpoint: "discover",
    type: "movie",
    params: { with_keywords: 163053, sort_by: "popularity.desc" },
  },
  {
    id: "psychological-thriller",
    displayName: "Psychological Thrillers",
    endpoint: "discover",
    type: "movie",
    params: { with_keywords: 12565, sort_by: "popularity.desc" },
  },
  {
    id: "slasher-horror",
    displayName: "Slasher Horror",
    endpoint: "discover",
    type: "movie",
    params: { with_keywords: 12339, sort_by: "popularity.desc" },
  },
  {
    id: "time-loop",
    displayName: "Time-Loop",
    endpoint: "discover",
    type: "movie",
    params: { with_keywords: 10854, sort_by: "popularity.desc" },
  },

  {
    id: "time-travel",
    displayName: "Time Travel",
    endpoint: "discover",
    type: "movie",
    params: { with_keywords: 4379, sort_by: "popularity.desc" },
  },
];
