import React, { useState, useCallback } from 'react';
import { FormData, TemplateLevel, TechnicalLevel } from './types';
import { PROMPT_TEMPLATES } from './constants';
import Header from './components/Header';
import PromptForm from './components/PromptForm';
import PromptOutput from './components/PromptOutput';

const generatePromptFromData = (formData: FormData): string => {
    let template = PROMPT_TEMPLATES[formData.templateLevel]?.[formData.technicalLevel] || 'Plantilla no encontrada.';
    template = template.replace('{problema}', formData.problem || '[describir problema]');
    template = template.replace('{audiencia}', formData.audience || '[describir audiencia]');
    template = template.replace('{plataforma}', formData.platform || '[describir plataforma]');
    template = template.replace('{lenguaje}', formData.language || '[describir lenguaje]');
    template = template.replace('{restricciones}', formData.constraints || '[ninguna]');
    return template.trim();
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    problem: 'Crear una aplicación web para gestionar reservas de aulas en una universidad pequeña. Los usuarios (estudiantes y profesores) deben poder ver la disponibilidad de las aulas, solicitar una reserva para un horario específico y ver sus reservas existentes. Los administradores deben poder aprobar o rechazar solicitudes.',
    audience: 'Estudiantes, profesores y personal administrativo de la universidad',
    platform: 'Aplicación Web (SPA)',
    language: 'TypeScript con React',
    constraints: 'Debe ser responsive. Usar recharts para un dashboard de estadísticas de uso de aulas. No requiere backend real, simular las llamadas a API con datos de ejemplo.',
    templateLevel: TemplateLevel.Avanzada,
    technicalLevel: TechnicalLevel.Experto,
  });

  const [displayedPrompt, setDisplayedPrompt] = useState(() => generatePromptFromData(formData));

  const handleFormChange = useCallback((field: keyof FormData, value: string | TemplateLevel | TechnicalLevel) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleGenerate = useCallback(() => {
    setDisplayedPrompt(generatePromptFromData(formData));
  }, [formData]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
          <div className="lg:pr-4">
             <PromptForm 
                formData={formData} 
                onFormChange={handleFormChange}
                onGenerate={handleGenerate}
              />
          </div>
          <div className="mt-8 lg:mt-0 lg:pl-4">
            <div className="sticky top-8">
              <PromptOutput prompt={displayedPrompt} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
