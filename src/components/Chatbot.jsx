import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Phone } from 'lucide-react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Intake State
    const [isIdentified, setIsIdentified] = useState(false);
    const [userName, setUserName] = useState('');
    const [userMobile, setUserMobile] = useState('');
    const [showIntakeForm, setShowIntakeForm] = useState(false);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const storedSession = localStorage.getItem('bp_chat_session');
        if (storedSession) {
            setSessionId(storedSession);
            const history = localStorage.getItem(`bp_chat_history_${storedSession}`);
            if (history) {
                setMessages(JSON.parse(history));
            } else {
                setMessages([{ type: 'bot', text: 'Hello 👋\nMain Bharat Properties se baat kar raha hoon. Bataiye, main aapko kis type ki property me help kar sakta hoon?', timestamp: new Date() }]);
            }
        } else {
            const newSession = 'sess_' + Math.random().toString(36).substring(2, 15);
            setSessionId(newSession);
            localStorage.setItem('bp_chat_session', newSession);
            setMessages([{ type: 'bot', text: 'Hello 👋\nMain Bharat Properties se baat kar raha hoon. Bataiye, main aapko kis type ki property me help kar sakta hoon?', timestamp: new Date() }]);
        }

        const storedMobile = localStorage.getItem('bp_chat_mobile');
        if (storedMobile) {
            setIsIdentified(true);
            setUserMobile(storedMobile);
            setUserName(localStorage.getItem('bp_chat_name') || '');
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
        if (messages.length > 0 && sessionId) {
            localStorage.setItem(`bp_chat_history_${sessionId}`, JSON.stringify(messages));
        }
    }, [messages, isOpen, sessionId]);

    const handleSend = async (overrideText = null) => {
        const text = (overrideText || inputText).trim();
        if (!text) return;

        setMessages(prev => [...prev, { type: 'user', text, timestamp: new Date() }]);
        setInputText('');
        setIsLoading(true);

        try {
            const userMsgCount = messages.filter(m => m.type === 'user').length;
            if (userMsgCount === 1 && !isIdentified && !showIntakeForm) {
                setTimeout(() => {
                    setShowIntakeForm(true);
                    setMessages(prev => [...prev, { 
                        type: 'bot', 
                        text: 'Aage badhne se pehle, kya aap apna Naam aur Mobile Number share kar sakte hain taki hum aapko behtar options bhej sakein?',
                        timestamp: new Date()
                    }]);
                    setIsLoading(false);
                }, 1000);
                return;
            }

            const payload = {
                sessionId,
                message: text,
                name: userName,
                mobile: userMobile
            };

            // Use relative path to leverage Vercel rewrites, fallback to hardcoded only if necessary
            const apiUrl = '/api/webhooks/website-chat';
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            
            if (data.success && data.reply) {
                setMessages(prev => [...prev, { type: 'bot', text: data.reply, timestamp: new Date() }]);
            } else {
                setMessages(prev => [...prev, { type: 'bot', text: "Mafi chahunga, abhi system se connect nahi ho pa raha. Kripya thodi der me try karein.", timestamp: new Date() }]);
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { type: 'bot', text: "Network error. Please try again.", timestamp: new Date() }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleIntakeSubmit = (e) => {
        e.preventDefault();
        if (userMobile.length >= 10) {
            setIsIdentified(true);
            setShowIntakeForm(false);
            localStorage.setItem('bp_chat_mobile', userMobile);
            localStorage.setItem('bp_chat_name', userName);
            
            handleSendHiddenMsg(`User provided contact info: Name=${userName}, Mobile=${userMobile}. Please acknowledge and ask how you can help.`);
        }
    };

    const handleSendHiddenMsg = async (hiddenMsg) => {
        setIsLoading(true);
        try {
            const apiUrl = '/api/webhooks/website-chat';
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId, message: hiddenMsg, name: userName, mobile: userMobile })
            });
            const data = await response.json();
            if (data.success && data.reply) {
                setMessages(prev => [...prev, { type: 'bot', text: data.reply, timestamp: new Date() }]);
            }
        } catch (error) { 
            console.error("Hidden message error:", error); 
        }
        setIsLoading(false);
    };

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        position: 'fixed', bottom: '2rem', right: '2rem',
                        width: '60px', height: '60px', borderRadius: '50%',
                        backgroundColor: '#25D366', color: 'white',
                        border: 'none', cursor: 'pointer',
                        boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
                        zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
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
                    position: 'fixed', bottom: '2rem', right: '2rem',
                    width: 'min(360px, 90vw)', height: 'min(550px, 80vh)',
                    backgroundColor: '#E5DDD5', borderRadius: '16px',
                    boxShadow: '0 12px 48px rgba(0,0,0,0.2)',
                    zIndex: 10001, display: 'flex', flexDirection: 'column', overflow: 'hidden'
                }}>
                    <div style={{ padding: '12px 16px', backgroundColor: '#075E54', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Bot size={22} color="#075E54" />
                            </div>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Bharat Properties</div>
                                <div style={{ fontSize: '0.7rem', opacity: 0.9 }}>AI Agent Online</div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                            <X size={20} />
                        </button>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} style={{ alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%', minWidth: '60px' }}>
                                <div style={{
                                    padding: '8px 12px', borderRadius: msg.type === 'user' ? '12px 0 12px 12px' : '0 12px 12px 12px',
                                    backgroundColor: msg.type === 'user' ? '#DCF8C6' : 'white', color: '#333',
                                    boxShadow: '0 1px 1px rgba(0,0,0,0.1)', fontSize: '0.9rem', lineHeight: '1.4', whiteSpace: 'pre-line', position: 'relative'
                                }}>
                                    {msg.text}
                                    <div style={{ fontSize: '0.65rem', color: '#999', textAlign: 'right', marginTop: '4px' }}>
                                        {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {showIntakeForm && !isIdentified && (
                            <div style={{ background: 'white', padding: '16px', borderRadius: '0 12px 12px 12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 1px rgba(0,0,0,0.1)', marginTop: '4px', maxWidth: '85%', alignSelf: 'flex-start' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '12px' }}>Please provide your details:</div>
                                <form onSubmit={handleIntakeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', borderRadius: '8px', padding: '0 10px' }}>
                                        <User size={14} color="#64748b" />
                                        <input type="text" placeholder="Your Name" required value={userName} onChange={e => setUserName(e.target.value)} style={{ border: 'none', background: 'transparent', padding: '10px', width: '100%', outline: 'none', fontSize: '0.9rem' }} />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', borderRadius: '8px', padding: '0 10px' }}>
                                        <Phone size={14} color="#64748b" />
                                        <input type="tel" placeholder="Mobile Number" required value={userMobile} onChange={e => setUserMobile(e.target.value)} style={{ border: 'none', background: 'transparent', padding: '10px', width: '100%', outline: 'none', fontSize: '0.9rem' }} />
                                    </div>
                                    <button type="submit" style={{ background: '#25D366', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', marginTop: '4px' }}>
                                        Continue Chat
                                    </button>
                                </form>
                            </div>
                        )}

                        {isLoading && (
                            <div style={{ alignSelf: 'flex-start', backgroundColor: 'white', padding: '12px 16px', borderRadius: '0 12px 12px 12px' }}>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    <span style={{ width: '6px', height: '6px', background: '#cbd5e1', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both' }}></span>
                                    <span style={{ width: '6px', height: '6px', background: '#cbd5e1', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.2s' }}></span>
                                    <span style={{ width: '6px', height: '6px', background: '#cbd5e1', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.4s' }}></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div style={{ padding: '10px 12px', backgroundColor: '#F0F0F0', display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type a message..."
                            disabled={showIntakeForm && !isIdentified}
                            style={{ flex: 1, padding: '10px 16px', border: 'none', borderRadius: '24px', outline: 'none', fontSize: '0.9rem', backgroundColor: (showIntakeForm && !isIdentified) ? '#e2e8f0' : 'white' }}
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={!inputText.trim() || isLoading || (showIntakeForm && !isIdentified)}
                            style={{ backgroundColor: (!inputText.trim() || (showIntakeForm && !isIdentified)) ? '#cbd5e1' : '#075E54', color: 'white', width: '40px', height: '40px', borderRadius: '50%', border: 'none', cursor: (!inputText.trim() || (showIntakeForm && !isIdentified)) ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}
            <style>{`
                @keyframes bounce {
                    0%, 80%, 100% { transform: scale(0); }
                    40% { transform: scale(1); }
                }
            `}</style>
        </>
    );
};

export default Chatbot;
