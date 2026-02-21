import { useState } from 'react';
import { Save, AlertCircle, Cloud, Zap, Cpu, Key, Globe, Layers } from 'lucide-react';

export default function ApiSettings({ apiKeys, saveApiKeys }) {
    const [keys, setKeys] = useState(apiKeys);
    const [saved, setSaved] = useState(false);
    const [persist, setPersist] = useState(() => !!localStorage.getItem('ab_api_keys'));

    const handleChange = (e) => {
        setKeys(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        setSaved(false);
    };

    const handleSave = () => {
        saveApiKeys(keys, persist);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div className="api-settings-page glass-panel">
            <div className="settings-header">
                <h2>Platform AI Configuration</h2>
                <p>Manage connection parameters and cryptographic keys for the Air Bharat AI engine. These credentials are stored securely in your local browser environment.</p>

                <div className="alert-box info-alert">
                    <AlertCircle size={18} />
                    <span>The RAG Chatbot will dynamically route requests to these providers. Leave an input blank to fall back to the project's build-time environment variables (if any).</span>
                </div>
            </div>

            <div className="settings-grid">

                {/* Groq Configuration Card */}
                <div className="settings-card provider-card">
                    <div className="card-header">
                        <div className="provider-icon groq-icon"><Zap size={20} /></div>
                        <div>
                            <h3>Groq Llama 3</h3>
                            <span className="subtitle">High-speed conversational inference</span>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="form-group row">
                            <label><Key size={14} /> API Key</label>
                            <input
                                type="password"
                                name="groqKey"
                                value={keys.groqKey || ''}
                                onChange={handleChange}
                                placeholder="gsk_..."
                                autoComplete="off"
                            />
                            <span className="input-hint">The active Llama 3 70B Versatile cluster requires a valid Groq API authentication token.</span>
                        </div>
                    </div>
                </div>

                {/* AWS Bedrock Configuration Card */}
                <div className="settings-card provider-card">
                    <div className="card-header">
                        <div className="provider-icon aws-icon"><Cloud size={20} /></div>
                        <div>
                            <h3>Amazon Bedrock</h3>
                            <span className="subtitle">Enterprise foundation models</span>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="form-group row">
                            <label><Key size={14} /> Access Key ID</label>
                            <input
                                type="text"
                                name="awsAccess"
                                value={keys.awsAccess || ''}
                                onChange={handleChange}
                                placeholder="AKIA..."
                                autoComplete="off"
                            />
                        </div>

                        <div className="form-group row">
                            <label><Key size={14} /> Secret Access Key</label>
                            <input
                                type="password"
                                name="awsSecret"
                                value={keys.awsSecret || ''}
                                onChange={handleChange}
                                placeholder="Enter AWS Secret"
                                autoComplete="off"
                            />
                        </div>

                        <div className="form-group-grid">
                            <div className="form-group row">
                                <label><Globe size={14} /> AWS Region</label>
                                <select name="awsRegion" value={keys.awsRegion || 'us-east-1'} onChange={handleChange}>
                                    <option value="us-east-1">US East (N. Virginia)</option>
                                    <option value="us-east-2">US East (Ohio)</option>
                                    <option value="us-west-2">US West (Oregon)</option>
                                    <option value="ap-south-1">Asia Pacific (Mumbai)</option>
                                    <option value="eu-central-1">Europe (Frankfurt)</option>
                                </select>
                            </div>

                            <div className="form-group row">
                                <label><Layers size={14} /> Model ID</label>
                                <input
                                    type="text"
                                    name="awsModelId"
                                    value={keys.awsModelId || ''}
                                    onChange={handleChange}
                                    placeholder="e.g. meta.llama3-3-70b-instruct-v1:0"
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <span className="input-hint">Ensure your IAM user carries `bedrock:InvokeModelWithResponseStream` permissions for the target Model ID.</span>
                    </div>
                </div>

            </div>

            <div className="settings-footer" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gray-300)', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input
                        type="checkbox"
                        checked={persist}
                        onChange={(e) => { setPersist(e.target.checked); setSaved(false); }}
                        style={{ width: 'auto', accentColor: 'var(--sky-500)' }}
                    />
                    Remember keys on this device (Save to Local Storage)
                </label>
                <button className={`btn-save-large ${saved ? 'saved' : ''}`} onClick={handleSave}>
                    <Save size={18} />
                    {saved ? 'Configuration Applied!' : 'Apply Configuration'}
                </button>
            </div>
        </div>
    );
}
