import SignupForm from '../components/SignupForm';

function SignupPage() {
  const handleFormSubmit = (formData) => {
    alert('Form submitted.');
  };

  return (
    <div>
      <SignupForm onSubmit={handleFormSubmit} />
    </div>
  );
}

export default SignupPage;