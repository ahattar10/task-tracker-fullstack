import { FormEvent, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = useMemo(() => {
    return email.trim().length >= 3 && password.length >= 8;
  }, [email, password]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid) {
      setError("Enter a valid email and password (minimum 8 characters).");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await loginUser({
        email: email.trim().toLowerCase(),
        password,
      });
      navigate("/tasks");
    } catch (submitError: unknown) {
      setError("Login failed. Verify credentials and try again.");
      console.error(submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-wrap">
      <div className="auth-brand">
        <h1>Task Tracker</h1>
        <p>Sign in to continue building your workflow dashboard.</p>
      </div>

      <form className="auth-card" onSubmit={onSubmit}>
        <h2>Welcome Back</h2>

        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          required
        />

        {error ? <p className="form-error">{error}</p> : null}

        <button className="solid-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>

        <p className="small-copy">
          Need an account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </section>
  );
}
