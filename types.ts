
export enum TemplateLevel {
  Basica = 'Básica',
  Estandar = 'Estándar',
  Avanzada = 'Avanzada',
}

export enum TechnicalLevel {
  Principiante = 'Principiante',
  Intermedio = 'Intermedio',
  Experto = 'Experto',
}

export interface FormData {
  problem: string;
  audience: string;
  platform: string;
  language: string;
  constraints: string;
  templateLevel: TemplateLevel;
  technicalLevel: TechnicalLevel;
  knowledgeBase: string;
}
