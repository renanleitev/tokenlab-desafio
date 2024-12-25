// Função para validar o formato de um e-mail
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Função para validar a força de uma senha
export const isValidPassword = (password: string): boolean => {
  // A senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula, uma minúscula e um número
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

// Função para validar se uma string está vazia
export const isNotEmpty = (str: string): boolean => {
  return str.trim().length > 0;
};
