// RAG Engine - Simulated Retrieval-Augmented Generation
import { knowledgeBase, flights, pnrData, airportCodes } from '../data/knowledgeBase.js';

// Simple BM25-like keyword scoring
function bm25Score(query, document) {
    const queryTerms = query.toLowerCase().split(/\s+/);
    const docText = (document.title + ' ' + document.content + ' ' + document.category).toLowerCase();
    let score = 0;

    queryTerms.forEach(term => {
        if (term.length < 2) return;
        const regex = new RegExp(term, 'gi');
        const matches = docText.match(regex);
        if (matches) {
            score += matches.length * (1 + Math.log(1 + matches.length));
        }
    });

    return score;
}

// Simulated vector similarity (cosine-like based on shared terms)
function vectorSimilarity(query, document) {
    const queryTerms = new Set(query.toLowerCase().split(/\s+/).filter(t => t.length > 2));
    const docTerms = new Set((document.title + ' ' + document.content).toLowerCase().split(/\s+/).filter(t => t.length > 2));

    let intersection = 0;
    queryTerms.forEach(term => {
        if (docTerms.has(term)) intersection++;
    });

    const union = queryTerms.size + docTerms.size - intersection;
    return union > 0 ? intersection / union : 0;
}

// Hybrid search combining BM25 + Vector
function hybridSearch(query, topK = 3) {
    const results = knowledgeBase.map(doc => {
        const bm25 = bm25Score(query, doc);
        const vector = vectorSimilarity(query, doc);
        const hybridScore = 0.4 * bm25 + 0.6 * (vector * 100);

        return { ...doc, score: hybridScore, bm25Score: bm25, vectorScore: vector };
    });

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, topK).filter(r => r.score > 0);
}

// Intent classification
function classifyIntent(query) {
    const q = query.toLowerCase();

    const intents = [
        { intent: 'flight_status', keywords: ['flight', 'status', 'delay', 'schedule', 'departure', 'arrival', 'time', 'gate', 'delayed', 'on time', 'ab-'] },
        { intent: 'pnr_lookup', keywords: ['pnr', 'booking', 'reservation', 'ticket', 'abc', 'xyz', 'lmn'] },
        { intent: 'baggage', keywords: ['baggage', 'luggage', 'bag', 'carry', 'check-in', 'weight', 'excess', 'cabin baggage', 'sports equipment'] },
        { intent: 'refund', keywords: ['refund', 'cancel', 'cancellation', 'money back', 'reschedule', 'change date', 'no-show'] },
        { intent: 'compliance', keywords: ['dgca', 'regulation', 'rule', 'compliance', 'safety', 'car', 'civil aviation', 'requirement'] },
        { intent: 'maintenance', keywords: ['maintenance', 'aircraft', 'a320', 'b737', 'boeing', 'airbus', 'engine', 'check', 'overhaul', 'c-check'] },
        { intent: 'crew', keywords: ['crew', 'pilot', 'cabin', 'duty', 'rest', 'briefing', 'pre-flight', 'turnaround'] },
        { intent: 'airport', keywords: ['airport', 'terminal', 'runway', 'del', 'bom', 'blr', 'hyd', 'ccu', 'gate', 'check-in counter'] },
        { intent: 'weather', keywords: ['weather', 'fog', 'rain', 'storm', 'cyclone', 'disruption', 'visibility', 'turbulence', 'monsoon'] },
        { intent: 'checkin', keywords: ['check-in', 'checkin', 'boarding', 'seat', 'boarding pass', 'web check', 'online check', 'kiosk'] },
    ];

    let bestIntent = { intent: 'general', score: 0 };

    intents.forEach(({ intent, keywords }) => {
        let score = 0;
        keywords.forEach(kw => {
            if (q.includes(kw)) score += 2;
        });
        if (score > bestIntent.score) {
            bestIntent = { intent, score };
        }
    });

    return bestIntent.intent;
}

// Check for PNR in query
function extractPNR(query) {
    const q = query.toUpperCase();
    for (const pnr of Object.keys(pnrData)) {
        if (q.includes(pnr)) return pnrData[pnr];
    }
    return null;
}

// Check for flight number in query
function extractFlight(query) {
    const q = query.toUpperCase().replace(/\s+/g, '');
    for (const flight of flights) {
        if (q.includes(flight.flight.replace('-', ''))) return flight;
    }
    // more relaxed search
    const match = query.match(/AB[-\s]?(\d{3})/i);
    if (match) {
        const flightNum = `AB-${match[1]}`;
        return flights.find(f => f.flight === flightNum) || null;
    }
    return null;
}

// Check for airport code
function extractAirport(query) {
    const q = query.toUpperCase();
    for (const [code, name] of Object.entries(airportCodes)) {
        if (q.includes(code) || q.toLowerCase().includes(name.split(',')[1]?.trim().toLowerCase())) {
            return { code, name };
        }
    }
    return null;
}

// Generate confidence score
function calculateConfidence(retrievedDocs, intent) {
    if (retrievedDocs.length === 0) return 35 + Math.random() * 15;
    const topScore = retrievedDocs[0].score;
    const intentBonus = intent !== 'general' ? 15 : 0;
    const confidence = Math.min(98, 55 + topScore * 3 + intentBonus + Math.random() * 10);
    return Math.round(confidence * 10) / 10;
}

import { fetchGroqChatStream } from './groqService.js';
import { fetchBedrockChatStream } from './bedrockService.js';

// Generate response with streaming simulation
export async function generateResponseStream(query, history, aiProvider, onChunk) {
    const intent = classifyIntent(query);
    const retrievedDocs = hybridSearch(query);
    const pnrResult = extractPNR(query);
    const flightResult = extractFlight(query);
    const airportResult = extractAirport(query);
    const confidence = calculateConfidence(retrievedDocs, intent);

    let systemPrompt = `You are the Air Bharat Udaan AI Assistant. You help passengers and staff with aviation queries.
    Be extremely concise, polite, and format your responses with markdown (bolding key terms).
    Answer conversational interactions (greetings, follow-ups) naturally based on the chat history.
    If the user asks a VERY specific policy, flight, or PNR question that is NOT covered by the context below or history, politely say "I don't have that specific information in my knowledge base. Please contact Air Bharat support."
    Do NOT fabricate aviation data. Use ONLY the provided context for facts.
    
    ---- KNOWLEDGE BASE CONTEXT ----\n`;

    let sources = [];

    if (pnrResult) {
        systemPrompt += `User is asking about PNR: ${pnrResult.pnr}. Details: Passenger ${pnrResult.passenger}, Flight ${pnrResult.flight}, Route ${pnrResult.from}-${pnrResult.to}, Status: ${pnrResult.status}.\n`;
        sources = [{ name: 'PNR Database', detail: `Record: ${pnrResult.pnr}`, type: 'database' }];
    } else if (flightResult) {
        systemPrompt += `User is asking about Flight: ${flightResult.flight}. It is flying from ${flightResult.from} to ${flightResult.to}. Status: ${flightResult.status}. Gate: ${flightResult.gate}.\n`;
        sources = [{ name: 'Flight Operations System', detail: `Real-time: ${flightResult.flight}`, type: 'system' }];
    } else if (intent === 'flight_status') {
        systemPrompt += `User is asking about the general flight schedule. Here is today's schedule for Air Bharat:\n`;
        flights.forEach(f => {
            systemPrompt += `- Flight ${f.flight}: ${f.fromCity} (${f.from}) to ${f.toCity} (${f.to}) | Departure: ${f.dep} Arrival: ${f.arr} | Status: ${f.status} | Gate: ${f.gate}\n`;
        });
        sources = [{ name: 'Flight Schedule System', detail: 'Today\'s Timetable', type: 'system' }];
    } else if (retrievedDocs.length > 0) {
        retrievedDocs.forEach(doc => {
            systemPrompt += `DOCUMENT [${doc.title}]:\n${doc.content}\n\n`;
            sources.push({
                name: doc.metadata.source,
                detail: `${doc.metadata.docType} • Updated: ${doc.metadata.lastUpdated}`,
                type: doc.metadata.docType.toLowerCase()
            });
        });
    }

    // Map history to Groq format, filtering out errors or unfinished streams
    const previousMessages = (history || [])
        .filter(m => !m.streaming && m.text && !m.text.includes('*Error generating response'))
        .slice(-10) // Keep reasonable context window (last 10 messages)
        .map(m => ({
            role: m.role,
            content: m.text
        }));

    // Prepare message array for AI
    const messages = [
        { role: "system", content: systemPrompt },
        ...previousMessages,
        { role: "user", content: query }
    ];

    try {
        if (aiProvider === 'bedrock') {
            await fetchBedrockChatStream(messages, onChunk);
        } else {
            await fetchGroqChatStream(messages, onChunk);
        }
    } catch (e) {
        onChunk(`\n\n*Error: Failed to connect to AI service. Displaying standard fallback...*`);
    }

    return {
        sources,
        confidence,
        intent,
        isHallucination: confidence < 50,
        retrievalCount: retrievedDocs.length,
        latency: (0.4 + Math.random() * 0.8).toFixed(1) + 's'
    };
}

// Translations (English/Hindi)
export const translations = {
    en: {
        welcome: 'Welcome to Air Bharat Udaan',
        welcomeSub: 'Your AI-powered aviation assistant. Ask me anything about flights, policies, or operations.',
        typeMessage: 'Type your message...',
        send: 'Send',
        sources: 'Sources',
        confidence: 'Confidence',
        copy: 'Copy',
        regenerate: 'Regenerate',
        chat: 'Chat',
        dashboard: 'Dashboard',
        pnrLookup: 'PNR Lookup',
        flights: 'Flights',
        documents: 'Documents',
        analytics: 'Analytics',
        auditLog: 'Audit Log',
        settings: 'Settings',
        logout: 'Logout',
        login: 'Sign In',
        email: 'Email',
        password: 'Password',
        role: 'Role',
        passenger: 'Passenger',
        groundStaff: 'Ground Staff',
        cabinCrew: 'Cabin Crew',
        opsAdmin: 'Operations Admin',
        searchPnr: 'Enter PNR (try: ABC123, XYZ789, LMN456)',
        lookup: 'Lookup',
        totalQueries: 'Total Queries',
        resolvedRate: 'Resolution Rate',
        activeUsers: 'Active Users',
        docsIndexed: 'Docs Indexed',
        recentQueries: 'Recent Queries',
        queryAnalytics: 'Query Analytics',
        documentControl: 'Document Control',
        aiPowered: 'AI-powered responses may not always be accurate. Please verify critical information.',
        online: 'Online',
        language: 'Language',
    },
    hi: {
        welcome: 'एयर भारत उड़ान में आपका स्वागत है',
        welcomeSub: 'आपका AI-संचालित विमानन सहायक। उड़ानों, नीतियों या संचालन के बारे में कुछ भी पूछें।',
        typeMessage: 'अपना संदेश लिखें...',
        send: 'भेजें',
        sources: 'स्रोत',
        confidence: 'विश्वसनीयता',
        copy: 'कॉपी',
        regenerate: 'पुनः उत्पन्न',
        chat: 'चैट',
        dashboard: 'डैशबोर्ड',
        pnrLookup: 'PNR खोजें',
        flights: 'उड़ानें',
        documents: 'दस्तावेज़',
        analytics: 'विश्लेषण',
        auditLog: 'ऑडिट लॉग',
        settings: 'सेटिंग्स',
        logout: 'लॉगआउट',
        login: 'साइन इन',
        email: 'ईमेल',
        password: 'पासवर्ड',
        role: 'भूमिका',
        passenger: 'यात्री',
        groundStaff: 'ग्राउंड स्टाफ',
        cabinCrew: 'केबिन क्रू',
        opsAdmin: 'ऑपरेशन एडमिन',
        searchPnr: 'PNR दर्ज करें (कोशिश करें: ABC123, XYZ789, LMN456)',
        lookup: 'खोजें',
        totalQueries: 'कुल प्रश्न',
        resolvedRate: 'समाधान दर',
        activeUsers: 'सक्रिय उपयोगकर्ता',
        docsIndexed: 'अनुक्रमित दस्तावेज़',
        recentQueries: 'हाल के प्रश्न',
        queryAnalytics: 'क्वेरी विश्लेषण',
        documentControl: 'दस्तावेज़ नियंत्रण',
        aiPowered: 'AI-संचालित प्रतिक्रियाएं हमेशा सटीक नहीं हो सकतीं। कृपया महत्वपूर्ण जानकारी सत्यापित करें।',
        online: 'ऑनलाइन',
        language: 'भाषा',
    }
};
