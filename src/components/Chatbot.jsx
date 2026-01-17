import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, User, CheckCircle, MapPin, IndianRupee } from 'lucide-react';
import { PROPERTY_DATA } from '../data/propertyData';
import { SAMPLE_PROJECTS } from '../data/sampleProjects';

// 60+ MESSAGES LIBRARY
const LIB = {
    GREETINGS: [
        "Hello 👋\nMain Bharat Properties se baat kar raha hoon.",
        "Welcome 😊\nAap property buy, sell ya rent ke liye dekh rahe hain?",
        "Hi!\nBataiye, main aapko kis type ki property me help kar sakta hoon?",
        "Namaste 🙏\nBharat Properties me aapka swagat hai.",
        "Aap buyer hain ya seller?",
        "Property se related koi requirement hai? Bataiye 👍"
    ],
    BUY_QUESTIONS: {
        TYPE: "Residential ya Commercial property chahiye?",
        SUBTYPE: "Plot dekh rahe hain ya House/Flat?",
        LOCATION: "Kis city / area me property chahiye?",
        LOCALITY: "Sector ya locality ka naam pata hai?",
        BUDGET: "Approx budget range bata denge?",
        BUDGET_SOFT: "Budget rough ho to bhi chalega 👍",
        INTENT: "End-use ke liye chahiye ya investment ke liye?",
        STATUS: "Ready property chahiye ya under-construction?",
        PREFERENCE: "Facing ya road width ki koi preference?",
        TIMELINE: "Immediate purchase plan hai ya future me?"
    },
    SELL_QUESTIONS: {
        START: "Aap kaunsi property sell karna chahte hain?",
        TYPE: "Plot, House ya Commercial property?",
        LOCATION: "Property kis area / sector / city me hai?",
        LEGAL: "Ownership clear hai na?",
        INTENT: "Immediate sell plan hai ya thoda time hai?",
        PRICE: "Price expectation approx kya hai?",
        BUYER_TYPE: "Aap direct buyer chahte hain ya investor bhi?",
        OFFICE: "Kya aap office visit ke liye comfortable hain?"
    },
    RENT_QUESTIONS: {
        START: "Rent ya Lease ke liye property chahiye?",
        TYPE: "Residential ya Commercial?",
        LOCATION: "Kis area me chahiye?",
        BUDGET: "Monthly budget range kya rahega?",
        USE: "Family ke liye ya office use ke liye?",
        POSSESSION: "Immediate possession chahiye?"
    },
    WEBSITE_MATCH: [
        "Is requirement ke hisaab se\nwebsite par kuch verified options available hain 👍",
        "Main aapko live property details dikha raha hoon 👇",
        "Ye property hamare Projects section me listed hai.",
        "Is range me 2–3 genuine options hain.",
        "Ye details directly hamari website se aa rahi hain.",
        "Aap chahein to main similar options bhi dikha sakta hoon.",
        "Is time website par ye option available nahi hai.",
        "Main check karke aapko confirm karta hoon 👍"
    ],
    CTA: [
        "Kya main details share kar doon?",
        "Site visit plan karna chahenge?",
        "Aap hamare Kurukshetra office bhi aa sakte hain 😊",
        "Aaj nahi to weekend par visit possible hai?",
        "Call ya WhatsApp par details bhej doon?",
        "Aapka convenient time kya rahega?",
        "Main aapki requirement note kar raha hoon 👍"
    ],
    TRUST: [
        "Hum sirf verified properties deal karte hain.",
        "No fake listings, no false commitment.",
        "Deals direct owners & developers ke sath hoti hain.",
        "Transparency aur trust hamari priority hai.",
        "Aap bilkul tension-free enquiry kar sakte hain 😊"
    ],
    FALLBACK: [
        "Main sirf property-related help kar sakta hoon 👍",
        "Loan ya legal advice ke liye team guide karegi.",
        "Ye information confirm karke hi share ki jaati hai.",
        "Is point par thoda verification required hai.",
        "Main galat information share nahi karta.",
        "Aap chahein to office visit best rahega."
    ],
    CLOSING: [
        "Perfect 😊\nAapki requirement clear ho gayi hai.",
        "Main details CRM me note kar raha hoon.",
        "Hamari team aapse short time me connect karegi.",
        "Thank you for contacting Bharat Properties 🙏",
        "Koi aur query ho to bataiye.",
        "Hum aapki property journey me help karenge 👍"
    ]
};

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            text: LIB.GREETINGS[0],
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [flow, setFlow] = useState(null); // 'BUY', 'SELL', 'RENT'
    const [step, setStep] = useState(1);
    const [userRequirement, setUserRequirement] = useState({});
    const [leadScore, setLeadScore] = useState(0);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const addMessage = useCallback((type, text, data = null) => {
        setMessages(prev => [...prev, { type, text, data, timestamp: new Date() }]);
    }, []);

    useEffect(() => {
        if (isOpen && messages.length === 1) {
            setTimeout(() => {
                addMessage('bot', LIB.GREETINGS[1]);
            }, 800);
        }
    }, [isOpen, messages.length, addMessage]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);



    const updateLeadScore = (points) => {
        setLeadScore(prev => prev + points);
    };

    const logLead = (score, data) => {
        console.log("--- CRM LEAD CAPTURED ---");
        console.log("Score:", score);
        console.log("Data:", data);
        console.log("-------------------------");
    };

    const handleSend = (overrideText = null) => {
        const text = (overrideText || inputText).trim();
        if (!text) return;

        addMessage('user', text);
        setInputText('');

        setTimeout(() => {
            processResponse(text);
        }, 600);
    };

    const processResponse = (userInput) => {
        const input = userInput.toLowerCase();

        if (!flow) {
            if (input.includes('buy') || input.includes('khareedna') || input.includes('buyer')) {
                setFlow('BUY');
                setStep(2);
                addMessage('bot', LIB.BUY_QUESTIONS.TYPE);
                return;
            } else if (input.includes('sell') || input.includes('bechna') || input.includes('seller')) {
                setFlow('SELL');
                setStep(2);
                addMessage('bot', LIB.SELL_QUESTIONS.START);
                return;
            } else if (input.includes('rent') || input.includes('kiraya')) {
                setFlow('RENT');
                setStep(2);
                addMessage('bot', LIB.RENT_QUESTIONS.START);
                return;
            } else {
                addMessage('bot', LIB.GREETINGS[2]);
                return;
            }
        }

        if (flow === 'BUY') handleBuyFlow(input);
        else if (flow === 'SELL') handleSellFlow(input);
        else if (flow === 'RENT') handleRentFlow(input);
    };

    const handleBuyFlow = (input) => {
        switch (step) {
            case 2: // Type
                setUserRequirement(prev => ({ ...prev, type: input.includes('comm') ? 'Commercial' : 'Residential' }));
                setStep(3);
                addMessage('bot', LIB.BUY_QUESTIONS.SUBTYPE);
                break;
            case 3: // Subtype
                setUserRequirement(prev => ({ ...prev, subType: input }));
                setStep(4);
                addMessage('bot', LIB.BUY_QUESTIONS.LOCATION);
                break;
            case 4: // Location
                setUserRequirement(prev => ({ ...prev, location: input }));
                updateLeadScore(30);
                setStep(5);
                addMessage('bot', LIB.BUY_QUESTIONS.BUDGET);
                break;
            case 5: { // Budget
                setUserRequirement(prev => ({ ...prev, budget: input }));
                updateLeadScore(30);
                setStep(6);

                addMessage('bot', LIB.WEBSITE_MATCH[0]);

                const matches = [
                    ...PROPERTY_DATA.filter(p => p.location.toLowerCase().includes(userRequirement.location?.toLowerCase() || '')),
                    ...SAMPLE_PROJECTS.filter(p => p.address.city.toLowerCase().includes(userRequirement.location?.toLowerCase() || ''))
                ].slice(0, 2);

                if (matches.length > 0) {
                    setTimeout(() => addMessage('bot', LIB.WEBSITE_MATCH[1], matches), 800);
                } else {
                    setTimeout(() => addMessage('bot', LIB.WEBSITE_MATCH[6]), 800);
                }

                setTimeout(() => {
                    setStep(7);
                    addMessage('bot', LIB.CTA[1]);
                }, 2000);
                break;
            }
            case 7: // Action
                addMessage('bot', LIB.CLOSING[0]);
                setTimeout(() => addMessage('bot', LIB.CLOSING[1]), 800);
                setTimeout(() => addMessage('bot', LIB.CLOSING[2]), 1600);
                logLead(leadScore + 40, userRequirement);
                resetChat();
                break;
            default:
                break;
        }
    };

    const handleSellFlow = (input) => {
        switch (step) {
            case 2: // Type
                setUserRequirement(prev => ({ ...prev, type: input, flow: 'SELL' }));
                setStep(3);
                addMessage('bot', LIB.SELL_QUESTIONS.LOCATION);
                break;
            case 3: // Location
                setUserRequirement(prev => ({ ...prev, location: input }));
                setStep(4);
                addMessage('bot', LIB.SELL_QUESTIONS.INTENT);
                break;
            case 4: // Intent
                setUserRequirement(prev => ({ ...prev, intent: input }));
                setStep(5);
                addMessage('bot', LIB.TRUST[1]);
                setTimeout(() => {
                    setStep(6);
                    addMessage('bot', LIB.SELL_QUESTIONS.OFFICE);
                }, 1000);
                break;
            case 6: // Action
                addMessage('bot', LIB.CLOSING[3]);
                logLead(50, userRequirement);
                resetChat();
                break;
            default:
                break;
        }
    };

    const handleRentFlow = (input) => {
        switch (step) {
            case 2: // Type
                setUserRequirement(prev => ({ ...prev, type: input, flow: 'RENT' }));
                setStep(3);
                addMessage('bot', LIB.RENT_QUESTIONS.LOCATION);
                break;
            case 3: // Location
                setUserRequirement(prev => ({ ...prev, location: input }));
                updateLeadScore(30);
                setStep(4);
                addMessage('bot', LIB.RENT_QUESTIONS.BUDGET);
                break;
            case 4: { // Budget
                setUserRequirement(prev => ({ ...prev, budget: input }));
                updateLeadScore(30);
                setStep(5);
                addMessage('bot', LIB.WEBSITE_MATCH[1]);

                const matches = PROPERTY_DATA.slice(0, 1);
                setTimeout(() => addMessage('bot', "Ye check karein:", matches), 800);

                setTimeout(() => {
                    setStep(6);
                    addMessage('bot', LIB.CTA[0]);
                }, 2000);
                break;
            }
            case 6: // Action
                addMessage('bot', LIB.CLOSING[0]);
                setTimeout(() => addMessage('bot', LIB.CLOSING[2]), 800);
                logLead(leadScore + 40, userRequirement);
                resetChat();
                break;
            default:
                break;
        }
    };

    const resetChat = () => {
        setTimeout(() => {
            setFlow(null);
            setStep(1);
            setUserRequirement({});
            setLeadScore(0);
        }, 5000);
    }

    const renderDataCard = (item) => {
        const isProject = item.name !== undefined;
        return (
            <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                margin: '8px 0',
                border: '1px solid #eee'
            }}>
                <img
                    src={isProject ? item.images[0] : item.image}
                    alt={isProject ? item.name : item.title}
                    style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                />
                <div style={{ padding: '8px 12px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{isProject ? item.name : item.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '2px' }}>
                        <MapPin size={10} style={{ display: 'inline', marginRight: '4px' }} />
                        {isProject ? item.address.city : item.location}
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.9rem', marginTop: '4px' }}>
                        {item.price || (item.unitSizes?.[0]?.price)}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        position: 'fixed',
                        bottom: '2rem',
                        right: '2rem',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: '#25D366',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <MessageCircle size={30} />
                </button>
            )}

            {isOpen && (
                <div style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: 'min(360px, 90vw)',
                    height: 'min(550px, 80vh)',
                    backgroundColor: '#E5DDD5',
                    borderRadius: '16px',
                    boxShadow: '0 12px 48px rgba(0,0,0,0.2)',
                    zIndex: 10001,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        padding: '12px 16px',
                        backgroundColor: '#075E54',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Bot size={22} color="#075E54" />
                            </div>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Bharat Properties</div>
                                <div style={{ fontSize: '0.7rem', opacity: 0.9 }}>Online</div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                            <X size={20} />
                        </button>
                    </div>

                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                    }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} style={{
                                alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '85%',
                                minWidth: '60px'
                            }}>
                                <div style={{
                                    padding: '8px 12px',
                                    borderRadius: msg.type === 'user' ? '12px 0 12px 12px' : '0 12px 12px 12px',
                                    backgroundColor: msg.type === 'user' ? '#DCF8C6' : 'white',
                                    color: '#333',
                                    boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.4',
                                    whiteSpace: 'pre-line',
                                    position: 'relative'
                                }}>
                                    {msg.text}
                                    <div style={{ fontSize: '0.65rem', color: '#999', textAlign: 'right', marginTop: '4px' }}>
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                                {msg.data && Array.isArray(msg.data) && (
                                    <div style={{ marginTop: '8px' }}>
                                        {msg.data.map((item, i) => (
                                            <div key={i} onClick={() => setIsOpen(false)}>
                                                {renderDataCard(item)}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div style={{
                        padding: '10px 12px',
                        backgroundColor: '#F0F0F0',
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center'
                    }}>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type a message..."
                            style={{
                                flex: 1,
                                padding: '10px 16px',
                                border: 'none',
                                borderRadius: '24px',
                                outline: 'none',
                                fontSize: '0.9rem'
                            }}
                        />
                        <button
                            onClick={() => handleSend()}
                            style={{
                                backgroundColor: '#075E54',
                                color: 'white',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
