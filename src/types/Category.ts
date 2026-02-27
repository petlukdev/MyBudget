export const Category = {
  FOOD: 'Food',
  TRANSPORT: 'Transport',
  ENTERTAINMENT: 'Entertainment',
  CLOTHING: 'Clothing',
  HEALTH: 'Health',
  EDUCATION: 'Education',
  SHOPPING: 'Shopping',
  TRAVEL: 'Travel',
  OTHER: 'Other'
} as const;

export type Category = typeof Category[keyof typeof Category];