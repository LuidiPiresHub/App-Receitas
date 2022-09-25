// DEIXAR O LOGIN COMO JS

import React from 'react';

export default function Login() {
  return (
    <form>
      <input
        type="email"
        name="email"
        id="email"
        data-testid="email-input"
      />
      <input
        type="password"
        name="password"
        id="password"
        data-testid="password-input"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </form>
  );
}
