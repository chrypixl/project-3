import LoginForm from '../components/LoginForm';

function LoginPage() {
  const handleFormSubmit = (formData) => {
    alert('Form submitted.');
  };

  return (
    <div>
      <LoginForm onSubmit={handleFormSubmit} />
    </div>
  );
}

export default LoginPage;