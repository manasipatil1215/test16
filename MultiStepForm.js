import React, { useState } from 'react';
import './MultiStepForm.css';
const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    step1: { name: '', email: '' },
    step2: { address: '', city: '', zip: '' },
    step3: { username: '', password: '' }
  });

  const handleChange = (e, stepName) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [stepName]: {
        ...prevFormData[stepName],
        [name]: value
      }
    }));
  };

  const handleNext = () => {
    const currentStepData = formData[`step${step}`];
    // Example validation, you can implement your own validation logic here
    if (step === 1 && (!currentStepData.name || !currentStepData.email)) {
      alert('Please fill in all fields.');
      return;
    }
    if (step === 2 && (!currentStepData.address || !currentStepData.city || !currentStepData.zip)) {
      alert('Please fill in all fields.');
      return;
    }
    if (step === 3 && (!currentStepData.username || !currentStepData.password)) {
      alert('Please fill in all fields.');
      return;
    }

    if (step < 3) {
      setStep(prevStep => prevStep + 1);
    } else {
      console.log('Form data:', formData);
      // Here you can submit the form data or perform any further action
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(prevStep => prevStep - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <input type="text" name="name" placeholder="Name" value={formData.step1.name} onChange={(e) => handleChange(e, 'step1')} />
            <input type="email" name="email" placeholder="Email" value={formData.step1.email} onChange={(e) => handleChange(e, 'step1')} />
          </div>
        );
      case 2:
        return (
          <div>
            <input type="text" name="address" placeholder="Address" value={formData.step2.address} onChange={(e) => handleChange(e, 'step2')} />
            <input type="text" name="city" placeholder="City" value={formData.step2.city} onChange={(e) => handleChange(e, 'step2')} />
            <input type="text" name="zip" placeholder="ZIP Code" value={formData.step2.zip} onChange={(e) => handleChange(e, 'step2')} />
          </div>
        );
      case 3:
        return (
          <div>
            <input type="text" name="username" placeholder="Username" value={formData.step3.username} onChange={(e) => handleChange(e, 'step3')} />
            <input type="password" name="password" placeholder="Password" value={formData.step3.password} onChange={(e) => handleChange(e, 'step3')} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>Step {step}</h2>
      {renderStep()}
      <div>
        {step > 1 && <button onClick={handlePrev}>Previous</button>}
        <button onClick={handleNext}>{step === 3 ? 'Submit' : 'Next'}</button>
      </div>
    </div>
  );
};

export default MultiStepForm;
