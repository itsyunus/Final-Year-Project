import { useState } from 'react';
import { Search, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { pnrData } from '../data/knowledgeBase.js';

export default function PNRLookup({ t }) {
    const [pnrInput, setPnrInput] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleLookup = () => {
        const code = pnrInput.trim().toUpperCase();
        if (pnrData[code]) {
            setResult(pnrData[code]);
            setError('');
        } else {
            setResult(null);
            setError(`PNR "${code}" not found. Try: ABC123, XYZ789, or LMN456`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleLookup();
    };

    return (
        <div className="pnr-lookup">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24 }}>
                <Search size={24} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} /> {t.pnrLookup}
            </h2>

            <div className="pnr-search-box">
                <input
                    value={pnrInput}
                    onChange={e => setPnrInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t.searchPnr}
                />
                <button className="btn-primary" onClick={handleLookup} style={{ padding: '14px 28px' }}>
                    {t.lookup}
                </button>
            </div>

            {error && (
                <div className="hallucination-flag" style={{ marginBottom: 20 }}>
                    <AlertCircle size={14} className="mr-1" style={{ display: 'inline' }} /> {error}
                </div>
            )}

            {result && (
                <div className="pnr-result">
                    <div className="pnr-card">
                        <div className="pnr-card-header">
                            <h3>PNR: {result.pnr}</h3>
                            <span className="pnr-flight-badge">{result.flight}</span>
                        </div>
                        <div className="pnr-card-body">
                            <div className="pnr-route">
                                <div className="pnr-airport">
                                    <div className="pnr-airport-code">{result.from}</div>
                                    <div className="pnr-airport-name">{result.fromCity}</div>
                                </div>
                                <div className="pnr-route-line" />
                                <div className="pnr-airport">
                                    <div className="pnr-airport-code">{result.to}</div>
                                    <div className="pnr-airport-name">{result.toCity}</div>
                                </div>
                            </div>

                            <div className="pnr-details-grid">
                                <div className="pnr-detail-item">
                                    <div className="pnr-detail-label">Passenger</div>
                                    <div className="pnr-detail-value">{result.passenger}</div>
                                </div>
                                <div className="pnr-detail-item">
                                    <div className="pnr-detail-label">Date</div>
                                    <div className="pnr-detail-value">{result.date}</div>
                                </div>
                                <div className="pnr-detail-item">
                                    <div className="pnr-detail-label">Departure</div>
                                    <div className="pnr-detail-value">{result.dep}</div>
                                </div>
                                <div className="pnr-detail-item">
                                    <div className="pnr-detail-label">Arrival</div>
                                    <div className="pnr-detail-value">{result.arr}</div>
                                </div>
                                <div className="pnr-detail-item">
                                    <div className="pnr-detail-label">Seat</div>
                                    <div className="pnr-detail-value">{result.seat}</div>
                                </div>
                                <div className="pnr-detail-item">
                                    <div className="pnr-detail-label">Class</div>
                                    <div className="pnr-detail-value">{result.class}</div>
                                </div>
                                <div className="pnr-detail-item">
                                    <div className="pnr-detail-label">Aircraft</div>
                                    <div className="pnr-detail-value">{result.aircraft}</div>
                                </div>
                                <div className="pnr-detail-item">
                                    <div className="pnr-detail-label">Status</div>
                                    <div className="pnr-detail-value">
                                        <span className={`pnr-status-badge ${result.status.toLowerCase()}`}>
                                            {result.status === 'Confirmed' ? <CheckCircle size={14} className="mr-1" style={{ display: 'inline' }} /> : <AlertCircle size={14} className="mr-1" style={{ display: 'inline' }} />} {result.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="pnr-detail-item">
                                    <div className="pnr-detail-label">Baggage</div>
                                    <div className="pnr-detail-value">{result.baggage}</div>
                                </div>
                                <div className="pnr-detail-item">
                                    <div className="pnr-detail-label">Meal</div>
                                    <div className="pnr-detail-value">{result.meal}</div>
                                </div>
                                <div className="pnr-detail-item">
                                    <div className="pnr-detail-label">Web Check-in</div>
                                    <div className="pnr-detail-value">{result.checkedIn ? <><CheckCircle size={14} className="mr-1" style={{ display: 'inline' }} /> Done</> : <><XCircle size={14} className="mr-1" style={{ display: 'inline' }} /> Pending</>}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
