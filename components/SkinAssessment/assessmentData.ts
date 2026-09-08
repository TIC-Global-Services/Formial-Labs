export type Option = {
  value: string;
  label: string;
  icon?: string;
};

export type YesNo = "yes" | "no" | null;

export type AssessmentAnswers = {
  concerns: string[];
  otherConcerns: string[];
  skinType: string;
  duration: string;
  sensitivity: number | "not-sure" | null;
  productsUsed: string[];
  onMedication: YesNo;
  hasAllergy: YesNo;
  pregnantOrBreastfeeding: YesNo;
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  countryDial: string;
  phone: string;
  email: string;
  hearAboutUs: string;
};

export const emptyAnswers: AssessmentAnswers = {
  concerns: [],
  otherConcerns: [],
  skinType: "",
  duration: "",
  sensitivity: null,
  productsUsed: [],
  onMedication: null,
  hasAllergy: null,
  pregnantOrBreastfeeding: null,
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  countryDial: "+91",
  phone: "",
  email: "",
  hearAboutUs: "",
};

export const CONCERN_OPTIONS: Option[] = [
  { value: "acne-marks", label: "Acne Marks", icon: "/assets/skin-test/acne.png" },
  { value: "hyperpigmentation", label: "Hyperpigmentation", icon: "/assets/skin-test/hyperpigmentation.png" },
  { value: "melasma", label: "Melasma", icon: "/assets/skin-test/melasma.png" },
  { value: "fine-lines-ageing", label: "Fine Lines / Ageing", icon: "/assets/skin-test/ageing.png" },
  { value: "scarring", label: "Scarring", icon: "/assets/skin-test/scarring.png" },
  { value: "skincare-routine", label: "Skincare Routine / Skin Concerns", icon: "/assets/skin-test/skin-concerns.png" },
];

export const OTHER_CONCERN_OPTIONS: Option[] = [
  { value: "uneven-skintone", label: "Uneven Skintone", icon: "/assets/skin-test/uneven-skintone.png" },
  { value: "post-inflammatory-marks", label: "Post Inflammatory Marks", icon: "/assets/skin-test/post-inflammatory.png" },
  { value: "pustules", label: "Pustules", icon: "/assets/skin-test/pustules.png" },
  { value: "fine-lines-ageing", label: "Fine Lines / Ageing", icon: "/assets/skin-test/ageing2.png" },
  { value: "closed-comedones", label: "Closed Comedones", icon: "/assets/skin-test/closed-comedones.png" },
];

export const SKIN_TYPE_OPTIONS: Option[] = [
  { value: "deeply-dry", label: "Deeply Dry", icon: "/assets/skin-test/deeply-dry.png" },
  { value: "dry-skin", label: "Dry Skin", icon: "/assets/skin-test/dry-skin.png" },
  { value: "oily-skin", label: "Oily Skin", icon: "/assets/skin-test/oily-skin.png" },
  { value: "combination-skin", label: "Combination Skin", icon: "/assets/skin-test/combined-skin.png" },
  { value: "excessively-oily", label: "Excessively Oily", icon: "/assets/skin-test/excessively-oil.png" },
  { value: "not-sure", label: "Not Sure Yet", icon: "/assets/skin-test/not-sure.png" },
];

export const DURATION_OPTIONS: Option[] = [
  { value: "less-than-month", label: "Less than a month" },
  { value: "1-2-months", label: "1 - 2 months" },
  { value: "2-6-months", label: "2 - 6 months" },
  { value: "6-12-months", label: "6 - 12 months" },
  { value: "more-than-year", label: "More than a year" },
  { value: "not-sure", label: "Not sure yet" },
];

export const PRODUCTS_USED_OPTIONS: Option[] = [
  { value: "cleanser", label: "Cleanser" },
  { value: "moisturiser", label: "Moisturiser" },
  { value: "sunscreen", label: "Sunscreen" },
  { value: "makeup", label: "Makeup" },
  { value: "serum", label: "Serum" },
  { value: "none", label: "None of the above" },
];

export const GENDER_OPTIONS: Option[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export const HEAR_ABOUT_OPTIONS: Option[] = [
  { value: "instagram", label: "Instagram", icon: "/assets/skin-test/instagram.png" },
  { value: "reddit", label: "Reddit", icon: "/assets/skin-test/reddit.png" },
  { value: "ads", label: "Ads", icon: "/assets/skin-test/ads.png" },
  { value: "media-coverage", label: "Media Coverage", icon: "/assets/skin-test/media.png" },
  { value: "blogs-medium", label: "Blogs & Medium", icon: "/assets/skin-test/blogs.png" },
  { value: "friends-family", label: "Friends & Family", icon: "/assets/skin-test/friends.png" },
];

export const labelFor = (options: Option[], value: string) =>
  options.find((o) => o.value === value)?.label ?? value;

export const joinWithAnd = (items: string[]) => {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
};

/** Keeps dynamic, user-driven lists from blowing up a heading — shows the first
 * `max` items and folds the rest into a "+N more" tail. */
export const summarizeList = (items: string[], max = 2) => {
  if (items.length <= max) return joinWithAnd(items);
  const shown = items.slice(0, max).join(", ");
  const remaining = items.length - max;
  return `${shown} +${remaining} more`;
};

// There is exactly one product: a 2-month formula + plan that a dermatologist
// curates by hand from each customer's assessment answers. It isn't picked
// from a catalog of preset formulas — pricing and package details are fixed,
// only the compounded formula itself varies per customer (handled off-app).
export const PLAN = {
  name: "2 Month Formula + Plan",
  tagline: "Custom-made formula & expert guidance for 60 days",
  price: 1999,
  originalPrice: 2998,
  image: "/assets/home/formial-bottle.png",
};

export const PLAN_SAVINGS = PLAN.originalPrice - PLAN.price;

/** All the concern labels from an assessment, for personalizing copy — e.g.
 * "your Acne Marks and Hyperpigmentation formula". */
export const getConcernLabels = (answers: AssessmentAnswers): string[] =>
  [...answers.concerns, ...answers.otherConcerns].map((v) =>
    labelFor([...CONCERN_OPTIONS, ...OTHER_CONCERN_OPTIONS], v)
  );

export const needsDermReview = (answers: AssessmentAnswers) =>
  answers.onMedication === "yes" ||
  answers.hasAllergy === "yes" ||
  answers.pregnantOrBreastfeeding === "yes";
