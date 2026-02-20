import { useState } from 'react';
import { Plane, AlertCircle, CheckCircle } from 'lucide-react';
import { flights } from '../data/knowledgeBase.js';

export default function FlightBoard({ t }) {
    return (
        <div className="dashboard" style={{ gap: 20 }}>
            <div className="view-header">
                <h2><Plane size={24} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} /> {t.flights} — Today</h2>
            </div>

            <div className="dash-card" style={{ overflow: 'auto' }}>
                <table className="docs-table">
                    <thead>
                        <tr>
                            <th>Flight</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Departure</th>
                            <th>Arrival</th>
                            <th>Aircraft</th>
                            <th>Gate</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flights.map((f, i) => {
                            const isDelayed = f.status.includes('Delayed');
                            return (
                                <tr key={i} style={{ animationDelay: `${i * 0.05}s` }} className="fade-in">
                                    <td>
                                        <div className="doc-icon-wrapper">
                                            <span className="doc-icon"><Plane size={24} color="var(--accent-color)" /></span>
                                            {f.flight}
                                        </div>
                                    </td>
                                    <td>
                                        <strong style={{ color: 'var(--text-primary)' }}>{f.from}</strong>
                                        <br />
                                        <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>{f.fromCity}</span>
                                    </td>
                                    <td>
                                        <strong style={{ color: 'var(--text-primary)' }}>{f.to}</strong>
                                        <br />
                                        <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>{f.toCity}</span>
                                    </td>
                                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{f.dep}</td>
                                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{f.arr}</td>
                                    <td>{f.aircraft}</td>
                                    <td style={{ fontWeight: 600 }}>{f.gate}</td>
                                    <td>
                                        <span className={`doc-status ${isDelayed ? 'processing' : 'active'}`}>
                                            {isDelayed ? <AlertCircle size={14} className="mr-1" style={{ display: 'inline' }} /> : <CheckCircle size={14} className="mr-1" style={{ display: 'inline' }} />} {f.status}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
