export const loginByAuth = async (email: string, password: string) => {
    // const token = await Gatekeeper.loginByAuth(email, password);
    const token = 'bisgroup@system';
    localStorage.setItem('token', token);
    // removeWindowClass('login-page');
    // removeWindowClass('hold-transition');
    return token;
  };