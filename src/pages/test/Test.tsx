import "./Test.css";
import { useState } from "react";
import {
  FaRunning,
  FaAppleAlt,
  FaHeartbeat,
  FaHome,
  FaClipboardCheck,
} from "react-icons/fa";
import { GiMuscleUp, GiWeightLiftingUp } from "react-icons/gi";
import { IoBody } from "react-icons/io5";

// Definición de tipos
type FormData = {
  edad: string;
  estatura: string;
  peso: string;
  experiencia: string;
  diasEntrenamiento: string;
  tiempoSesion: string;
  lesiones: string;
  limitaciones: string;
  lugarEntrenamiento: string;
  equipos: string;
  objetivo: string;
  nutricion: string;
};

type FieldOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type FormField = {
  name: keyof FormData;
  label?: string;
  type: string;
  placeholder?: string;
  options?: FieldOption[];
};

type Question = {
  id: number;
  title: string;
  question: string;
  icon?: React.ReactNode;
  fields: FormField[];
};

const Test = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    edad: "",
    estatura: "",
    peso: "",
    experiencia: "",
    diasEntrenamiento: "",
    tiempoSesion: "",
    lesiones: "",
    limitaciones: "",
    lugarEntrenamiento: "",
    equipos: "",
    objetivo: "",
    nutricion: "",
  });

  const questions: Question[] = [
    {
      id: 1,
      title: "Datos Básicos",
      question:
        "Por favor ingresa tu edad, estatura (en cm) y peso actual (en kg):",
      icon: <IoBody size={60} className="question-icon" />,
      fields: [
        { name: "edad", label: "Edad", type: "number", placeholder: "Ej: 28" },
        {
          name: "estatura",
          label: "Estatura (cm)",
          type: "number",
          placeholder: "Ej: 170",
        },
        {
          name: "peso",
          label: "Peso (kg)",
          type: "number",
          placeholder: "Ej: 75",
        },
      ],
    },
    {
      id: 2,
      title: "Experiencia",
      question: "¿Cuál es tu nivel de experiencia en entrenamiento con pesas?",
      icon: <GiWeightLiftingUp size={60} className="question-icon" />,
      fields: [
        {
          name: "experiencia",
          type: "radio",
          options: [
            { value: "principiante", label: "Principiante (menos de 6 meses)" },
            { value: "intermedio", label: "Intermedio (6 meses - 2 años)" },
            { value: "avanzado", label: "Avanzado (más de 2 años)" },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Disponibilidad",
      question:
        "¿Cuántos días a la semana puedes entrenar y cuánto tiempo por sesión?",
      icon: <FaRunning size={60} className="question-icon" />,
      fields: [
        {
          name: "diasEntrenamiento",
          label: "Días por semana",
          type: "number",
          placeholder: "Ej: 4",
        },
        {
          name: "tiempoSesion",
          label: "Minutos por sesión",
          type: "number",
          placeholder: "Ej: 60",
        },
      ],
    },
    {
      id: 4,
      title: "Salud",
      question:
        "¿Tienes alguna lesión o limitación física que debamos considerar?",
      icon: <FaHeartbeat size={60} className="question-icon" />,
      fields: [
        {
          name: "lesiones",
          label: "Lesiones (describe)",
          type: "text",
          placeholder: "Ej: Lesión en rodilla derecha",
        },
        {
          name: "limitaciones",
          label: "Limitaciones",
          type: "text",
          placeholder: "Ej: No puedo hacer sentadillas profundas",
        },
      ],
    },
    {
      id: 5,
      title: "Entorno",
      question: "¿Dónde prefieres entrenar y con qué equipos cuentas?",
      icon: <FaHome size={60} className="question-icon" />,
      fields: [
        {
          name: "lugarEntrenamiento",
          type: "radio",
          options: [
            { value: "gimnasio", label: "Gimnasio" },
            { value: "casa", label: "En casa" },
            { value: "ambos", label: "Ambos" },
          ],
        },
        {
          name: "equipos",
          label: "Equipos disponibles",
          type: "text",
          placeholder: "Ej: Mancuernas, banda de resistencia...",
        },
      ],
    },
    {
      id: 6,
      title: "Objetivo",
      question: "¿Cuál es tu objetivo estético principal?",
      icon: <GiMuscleUp size={60} className="question-icon" />,
      fields: [
        {
          name: "objetivo",
          type: "select",
          options: [
            { value: "", label: "Selecciona tu objetivo", disabled: true },
            { value: "perder_grasa", label: "Perder grasa corporal" },
            { value: "marcar_abdomen", label: "Marcar abdomen" },
            { value: "aumentar_gluteos", label: "Aumentar glúteos" },
            { value: "ganar_masa", label: "Ganar masa muscular general" },
            { value: "tonificar", label: "Tonificar todo el cuerpo" },
            { value: "otro", label: "Otro objetivo" },
          ],
        },
      ],
    },
    {
      id: 7,
      title: "Nutrición",
      question: "Describe brevemente tus hábitos alimenticios actuales:",
      icon: <FaAppleAlt size={60} className="question-icon" />,
      fields: [
        {
          name: "nutricion",
          label: "Hábitos alimenticios",
          type: "textarea",
          placeholder: "Ej: Como 3 veces al día, pocas verduras...",
        },
      ],
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message =
      `*Nuevo Test de Evaluación Completo*%0A%0A` +
      `*Datos Básicos:*%0A` +
      `Edad: ${formData.edad}%0A` +
      `Estatura: ${formData.estatura} cm%0A` +
      `Peso: ${formData.peso} kg%0A%0A` +
      `*Experiencia:* ${formData.experiencia}%0A%0A` +
      `*Disponibilidad:*%0A` +
      `Días/semana: ${formData.diasEntrenamiento}%0A` +
      `Tiempo/sesión: ${formData.tiempoSesion} min%0A%0A` +
      `*Salud:*%0A` +
      `Lesiones: ${formData.lesiones || "Ninguna"}%0A` +
      `Limitaciones: ${formData.limitaciones || "Ninguna"}%0A%0A` +
      `*Entorno:*%0A` +
      `Lugar: ${formData.lugarEntrenamiento}%0A` +
      `Equipos: ${formData.equipos || "No especificado"}%0A%0A` +
      `*Objetivo:* ${formData.objetivo}%0A%0A` +
      `*Nutrición:*%0A${formData.nutricion}`;

    window.open(`https://wa.me/528124493708?text=${message}`, "_blank");
    setCurrentStep(8);
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case "radio":
        return (
          <div className="radio-group">
            {field.options?.map((option) => (
              <label key={option.value} className="radio-option">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={formData[field.name] === option.value}
                  onChange={handleChange}
                  required
                />
                <span className="radio-custom"></span>
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );
      case "select":
        return (
          <select
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            className="form-select"
            required
          >
            {field.options?.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="form-textarea"
            required
          />
        );
      default:
        return (
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="form-input"
            required
          />
        );
    }
  };

  if (currentStep === 8) {
    return (
      <div className="test-container">
        <div className="test-complete">
          <h2>¡Test Completado!</h2>
          <p>Tus respuestas han sido enviadas a nuestro profesional.</p>
          <p>
            Gracias por tu tiempo, nos pondremos en contacto contigo pronto.
          </p>
          <div className="test-icon">
            <FaClipboardCheck size={80} />
          </div>
        </div>
      </div>
    );
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Always prevent default form submission

    if (currentStep === questions.length) {
      handleSubmit(e); // Final submission
    } else {
      nextStep(); // Navigation to next step
    }
  };

  const currentQuestion = questions.find((q) => q.id === currentStep);

  return (
    <div className="test-container">
      <div className="test-progress">
        <div
          className="progress-bar"
          style={{
            width: `${((currentStep - 1) / (questions.length - 1)) * 100}%`,
          }}
        ></div>
      </div>

      <form onSubmit={handleFormSubmit} className="test-form">
        <div className="test-card">
          <div className="test-header">
            <h3>
              Paso {currentStep} de {questions.length}
            </h3>
            <h2>{currentQuestion?.title}</h2>
            <p>{currentQuestion?.question}</p>
            {currentQuestion?.icon}
          </div>

          <div className="test-fields">
            {currentQuestion?.fields.map((field) => (
              <div key={field.name} className="form-group">
                {field.label && <label>{field.label}</label>}
                {renderField(field)}
              </div>
            ))}
          </div>

          <div className="test-navigation">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="nav-button prev-button"
              >
                Anterior
              </button>
            )}

            <button type="submit" className="nav-button next-button">
              {currentStep === questions.length ? "Enviar Test" : "Siguiente"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Test;
