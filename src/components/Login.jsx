import { useState } from 'react';
import { Plane, AlertCircle, User, HardHat, Settings } from 'lucide-react';

export default function Login({ onLogin, t }) {
    const [loginMode, setLoginMode] = useState('passenger'); // 'passenger' or 'admin'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('passenger');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        let success;
        if (loginMode === 'passenger') {
            // Passenger login mock logic
            success = onLogin(email || 'passenger@guest.com', 'passenger123', 'passenger');
        } else {
            success = onLogin(email, password, role);
        }

        if (!success) {
            setError('Invalid credentials or PNR.');
        }
    };

    const handleModeSwitch = (mode) => {
        setLoginMode(mode);
        setError('');
        if (mode === 'passenger') {
            setEmail('');
            setPassword('');
            setRole('passenger');
        } else {
            setEmail('');
            setPassword('');
            setRole('ops_admin');
        }
    };

    return (
        <div className="login-page">
            <div className="login-plane-animation"><Plane size={48} color="var(--accent-color)" /></div>
            <div className="login-container">
                <div className="login-card">
                    <div className="login-logo">
                        <div className="login-logo-icon"><Plane size={32} color="#fff" /></div>
                        <h1>Air Bharat</h1>
                        <p>Udaan Platform • AI Assistant</p>
                    </div>

                    {error && (
                        <div className="hallucination-flag" style={{ marginBottom: 16, textAlign: 'center' }}>
                            <AlertCircle size={14} className="mr-1" style={{ display: 'inline' }} /> {error}
                        </div>
                    )}

                    <div className="login-tabs">
                        <button className={`login-tab ${loginMode === 'passenger' ? 'active' : ''}`} onClick={() => handleModeSwitch('passenger')} type="button">
                            Passenger
                        </button>
                        <button className={`login-tab ${loginMode === 'admin' ? 'active' : ''}`} onClick={() => handleModeSwitch('admin')} type="button">
                            Staff / Admin
                        </button>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        {loginMode === 'passenger' ? (
                            <>
                                <div className="form-group">
                                    <label>Email or PNR</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="e.g. AB1234 or you@email.com"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="form-group">
                                    <label>{t.email}</label>
                                    <input
                                        type="email"
                                        className="form-input"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="you@airbharat.in"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>{t.password}</label>
                                    <input
                                        type="password"
                                        className="form-input"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>{t.role}</label>
                                    <select
                                        className="form-select"
                                        value={role}
                                        onChange={e => setRole(e.target.value)}
                                    >
                                        <option value="ground_staff">🏗️ {t.groundStaff}</option>
                                        <option value="cabin_crew">👔 {t.cabinCrew}</option>
                                        <option value="ops_admin">⚙️ {t.opsAdmin}</option>
                                    </select>
                                </div>
                            </>
                        )}
                        <button type="submit" className="btn-primary" style={{ marginTop: 8 }}>
                            {loginMode === 'passenger' ? 'Continue' : t.login} →
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
