/** Independent peer-reviewed publications cited on the Clinical Studies page. */
export interface StudySource { authors: string; title: string; journal: string; year: string; doi: string }

export const STUDY_SOURCES: StudySource[] = [
  { authors: 'Gold MH, Weiss E, Biron J.', title: 'Novel laser hair removal in all skin types.', journal: 'Journal of Cosmetic Dermatology', year: '2023', doi: '10.1111/jocd.15674' },
  { authors: 'Naranjo García P, López Andrino R, Gómez González C, Pinto H.', title: 'Three wavelengths integrated: Efficacy and safety of a novel combination for hair removal.', journal: 'Journal of Cosmetic Dermatology', year: '2022', doi: '10.1111/jocd.14371' },
  { authors: 'Lehavit A, Galili E, Lapidoth M, Levi A.', title: 'A Combined Triple-Wavelength (755nm, 810nm, and 1064nm) Laser Device for Hair Removal: Efficacy and Safety Study.', journal: 'Journal of Drugs in Dermatology', year: '2020', doi: '10.36849/JDD.2020.4735' },
];

export const doiUrl = (doi: string) => `https://doi.org/${doi}`;
