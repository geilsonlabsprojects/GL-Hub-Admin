export interface FirebaseError {
  code: string;
  message: string;
}

export const handleFirebaseError = (error: any): string => {
  console.error("Firebase Error:", error);

  const firebaseError = error as FirebaseError;

  switch (firebaseError.code) {
    case "auth/user-not-found":
      return "Usuário não encontrado.";
    case "auth/wrong-password":
      return "Senha incorreta.";
    case "auth/email-already-in-use":
      return "Este e-mail já está em uso.";
    case "auth/weak-password":
      return "A senha é muito fraca.";
    case "auth/invalid-email":
      return "E-mail inválido.";
    case "auth/network-request-failed":
      return "Falha na rede. Verifique sua conexão.";
    case "permission-denied":
      return "Você não tem permissão para realizar esta ação.";
    default:
      return firebaseError.message || "Ocorreu um erro inesperado.";
  }
};
