import React, { useState } from 'react';

const RegistrationWithDesign = ({ onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    companyName: '',
    industry: '',
    phone: '',
    website: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Vorname ist erforderlich';
    if (!formData.lastName.trim()) newErrors.lastName = 'Nachname ist erforderlich';
    if (!formData.email.trim()) newErrors.email = 'E-Mail ist erforderlich';
    if (!formData.password) newErrors.password = 'Passwort ist erforderlich';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwörter stimmen nicht überein';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'Sie müssen den AGB zustimmen';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.companyName.trim()) newErrors.companyName = 'Firmenname ist erforderlich';
    if (!formData.industry) newErrors.industry = 'Branche ist erforderlich';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      // Save user data to localStorage
      const userData = {
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        companyName: formData.companyName,
        industry: formData.industry,
        phone: formData.phone,
        website: formData.website,
        registrationDate: new Date().toISOString()
      };
      
      // Get existing users or initialize empty array
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      const userExists = existingUsers.some(user => user.email === userData.email);
      if (userExists) {
        setErrors({ email: 'Ein Benutzer mit dieser E-Mail-Adresse existiert bereits.' });
        setStep(1);
        return;
      }
      
      // Add new user
      existingUsers.push(userData);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      // Show success and redirect to login
      alert('Registrierung erfolgreich abgeschlossen! Sie werden zum Login weitergeleitet.');
      onComplete();
    }
  };

  const industries = [
    'Technologie & Software',
    'E-Commerce & Handel',
    'Gesundheitswesen',
    'Bildung & Training',
    'Finanzdienstleistungen',
    'Immobilien',
    'Gastronomie & Tourismus',
    'Automotive',
    'Mode & Beauty',
    'Sport & Fitness',
    'Beratung & Services',
    'Handwerk & Produktion',
    'Non-Profit',
    'Sonstiges'
  ];

  return (
    <div className="min-h-screen hero-section flex items-center justify-center px-4 py-8">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full mx-4 border border-white/20 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Konto erstellen</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white text-2xl transition-colors"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
              step >= 1 ? 'bg-white text-purple-600' : 'bg-white/30 text-white/70'
            }`}>
              1
            </div>
            <div className={`h-1 w-16 transition-all ${step >= 2 ? 'bg-white' : 'bg-white/30'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
              step >= 2 ? 'bg-white text-purple-600' : 'bg-white/30 text-white/70'
            }`}>
              2
            </div>
          </div>
          <p className="text-center text-sm text-white/80 mt-2">
            Schritt {step} von 2: {step === 1 ? 'Grundlegende Informationen' : 'Unternehmensangaben'}
          </p>
        </div>

        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Vorname *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60 ${
                    errors.firstName ? 'border-red-400' : ''
                  }`}
                  placeholder="Max"
                />
                {errors.firstName && <p className="text-red-300 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Nachname *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60 ${
                    errors.lastName ? 'border-red-400' : ''
                  }`}
                  placeholder="Mustermann"
                />
                {errors.lastName && <p className="text-red-300 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                E-Mail-Adresse *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60 ${
                  errors.email ? 'border-red-400' : ''
                }`}
                placeholder="max@unternehmen.de"
              />
              {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Passwort *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60 ${
                  errors.password ? 'border-red-400' : ''
                }`}
                placeholder="Mindestens 6 Zeichen"
              />
              {errors.password && <p className="text-red-300 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Passwort bestätigen *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60 ${
                  errors.confirmPassword ? 'border-red-400' : ''
                }`}
                placeholder="Passwort wiederholen"
              />
              {errors.confirmPassword && <p className="text-red-300 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className="mt-1 accent-white"
              />
              <label className="text-sm text-white/90">
                Ich akzeptiere die{' '}
                <a href="#" className="text-yellow-300 hover:underline">AGB</a>
                {' '}und{' '}
                <a href="#" className="text-yellow-300 hover:underline">Datenschutzerklärung</a> *
              </label>
            </div>
            {errors.acceptTerms && <p className="text-red-300 text-xs">{errors.acceptTerms}</p>}

            <button
              type="submit"
              className="w-full bg-white text-purple-600 py-3 px-4 rounded-md hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 font-semibold transition-all"
            >
              Weiter zu Unternehmensangaben
            </button>

            <p className="text-center text-sm text-white/80">
              Bereits ein Account?{' '}
              <button
                type="button"
                onClick={onClose}
                className="text-yellow-300 hover:underline"
              >
                Jetzt anmelden
              </button>
            </p>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Firmenname *
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60 ${
                  errors.companyName ? 'border-red-400' : ''
                }`}
                placeholder="Ihr Unternehmen"
              />
              {errors.companyName && <p className="text-red-300 text-xs mt-1">{errors.companyName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Branche *
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 text-white ${
                  errors.industry ? 'border-red-400' : ''
                }`}
              >
                <option value="" className="text-gray-900">Branche auswählen</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry} className="text-gray-900">
                    {industry}
                  </option>
                ))}
              </select>
              {errors.industry && <p className="text-red-300 text-xs mt-1">{errors.industry}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Telefon
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60"
                placeholder="+49 123 456789"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60"
                placeholder="https://www.ihr-unternehmen.de"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-white/20 text-white py-3 px-4 rounded-md hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 font-semibold transition-all"
              >
                Zurück
              </button>
              <button
                type="submit"
                className="flex-1 bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 font-semibold transition-all"
              >
                Registrierung abschließen
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationWithDesign;
