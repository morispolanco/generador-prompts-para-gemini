import React from 'react';
import { FormData, TemplateLevel, TechnicalLevel } from '../types';
import Tabs from './Tabs';

interface PromptFormProps {
  formData: FormData;
  onFormChange: (field: keyof FormData, value: string | TemplateLevel | TechnicalLevel) => void;
  onGenerate: () => void;
}

const Label: React.FC<{ htmlFor: string; children: React.ReactNode }> = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-300 mb-2">
    {children}
  </label>
);

const TextInput: React.FC<{ id: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string }> = ({ id, value, onChange, placeholder }) => (
  <input
    type="text"
    id={id}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full bg-slate-800 border border-slate-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
  />
);

const TextArea: React.FC<{ id: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; rows: number; placeholder?: string }> = ({ id, value, onChange, rows, placeholder }) => (
  <textarea
    id={id}
    value={value}
    onChange={onChange}
    rows={rows}
    placeholder={placeholder}
    className="w-full bg-slate-800 border border-slate-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
  />
);

const PromptForm: React.FC<PromptFormProps> = ({ formData, onFormChange, onGenerate }) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-850 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">1. Describe tu Necesidad</h2>
        <Label htmlFor="problem">Problema o idea principal de la aplicación</Label>
        <TextArea
          id="problem"
          value={formData.problem}
          onChange={(e) => onFormChange('problem', e.target.value)}
          rows={6}
          placeholder="Ej: Una app para registrar mis hábitos diarios y ver mi progreso en un calendario."
        />
      </div>

      <div className="bg-slate-850 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">2. Define el Contexto</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="audience">Audiencia Objetivo</Label>
            <TextInput id="audience" value={formData.audience} onChange={(e) => onFormChange('audience', e.target.value)} placeholder="Ej: Atletas de alto rendimiento" />
          </div>
          <div>
            <Label htmlFor="platform">Plataforma</Label>
            <TextInput id="platform" value={formData.platform} onChange={(e) => onFormChange('platform', e.target.value)} placeholder="Ej: Aplicación Web (SPA)" />
          </div>
          <div>
            <Label htmlFor="language">Lenguaje / Stack Principal</Label>
            <TextInput id="language" value={formData.language} onChange={(e) => onFormChange('language', e.target.value)} placeholder="Ej: TypeScript con React" />
          </div>
          <div>
            <Label htmlFor="constraints">Restricciones o Requisitos Adicionales</Label>
            <TextInput id="constraints" value={formData.constraints} onChange={(e) => onFormChange('constraints', e.target.value)} placeholder="Ej: Debe funcionar offline" />
          </div>
        </div>
      </div>

      <div className="bg-slate-850 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">3. Ajusta la Complejidad del Prompt</h2>
        <div>
          <Label htmlFor="templateLevel">Nivel de Detalle de la Plantilla</Label>
          <Tabs
            options={Object.values(TemplateLevel)}
            selected={formData.templateLevel}
            onSelect={(option) => onFormChange('templateLevel', option as TemplateLevel)}
          />
        </div>
        <div className="mt-4">
          <Label htmlFor="technicalLevel">Nivel Técnico del Código Solicitado</Label>
          <div className="flex flex-wrap gap-4">
            {Object.values(TechnicalLevel).map(level => (
              <label key={level} className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="technicalLevel"
                  value={level}
                  checked={formData.technicalLevel === level}
                  onChange={() => onFormChange('technicalLevel', level)}
                  className="form-radio h-4 w-4 text-sky-600 bg-slate-700 border-slate-600 focus:ring-sky-500"
                />
                <span>{level}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={onGenerate}
          className="w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-md hover:bg-sky-700 transition-colors duration-200 text-lg shadow-lg hover:shadow-sky-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500"
        >
          Generar Prompt
        </button>
      </div>
    </div>
  );
};

export default PromptForm;
