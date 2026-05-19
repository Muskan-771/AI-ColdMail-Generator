import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import api from '../utils/api';
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';

const History = () => {
    const [historyList, setHistoryList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState('');
    
    // 🔔 NAYI STATE: Pata rakhne ke liye ki kaunsa prompt open hai
    const [selectedHistoryId, setSelectedHistoryId] = useState(null);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/ai/history');
            setHistoryList(data);
        } catch (error) {
            toast.error('Failed to load history');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        toast.success('Copied to clipboard');
        setTimeout(() => setCopied(''), 2000);
    };

    // Toggle logic: click karne par card open ya close hoga
    const toggleHistoryCard = (id) => {
        setSelectedHistoryId(selectedHistoryId === id ? null : id);
    };

    const ResultCard = ({ title, content, type }) => {
        return (
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-4">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-700 text-sm">{title}</h4>
                    <button 
                        onClick={() => copyToClipboard(content, type)} 
                        className="text-gray-400 hover:text-primary-600 transition-colors"
                    >
                        {copied === type ? <CheckIcon className="w-4 h-4 text-green-500" /> : <ClipboardDocumentIcon className="w-4 h-4" />}
                    </button>
                </div>
                <p className="text-xs text-gray-600 whitespace-pre-wrap">{content}</p>
            </div>
        );
    };

    return (
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl border border-gray-200 shadow-sm min-h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Generation History</h2>

            {loading ? (
                <div className="text-center text-gray-500 text-sm py-10">Loading saved campaigns...</div>
            ) : historyList.length === 0 ? (
                <div className="text-center text-gray-400 text-sm py-10">No history found yet. Start generating on the dashboard!</div>
            ) : (
                <div className="space-y-3">
                    {historyList.map((item) => {
                        const isExpanded = selectedHistoryId === item._id;
                        return (
                            <div key={item._id} className="border border-gray-200 rounded-xl overflow-hidden transition-all shadow-sm">
                                
                                {/* 🎯 CLICKABLE PROMPT HEADER */}
                                <button 
                                    onClick={() => toggleHistoryCard(item._id)}
                                    className={`w-full flex justify-between items-center p-4 text-left transition-colors ${isExpanded ? 'bg-primary-50 text-primary-700' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <span className="text-xs font-bold uppercase tracking-wider bg-gray-200 text-gray-700 px-2 py-0.5 rounded shrink-0">Prompt</span>
                                        <p className="text-sm font-semibold truncate max-w-xl">"{item.prompt}"</p>
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 shrink-0 ml-2">
                                        {isExpanded ? '🔼 CLOSE' : '🔽 VIEW ALL DETAILS'}
                                    </span>
                                </button>

                                {/* 📦 ACCORDION EXPANDED CONTENT */}
                                {isExpanded && (
                                    <div className="p-5 bg-white border-t border-gray-100 flex flex-col gap-4">
                                        {/* Card 1: Subject Line & Body */}
                                        <ResultCard title={`Subject Line: ${item.subject}`} content={item.emailBody} type={`hist-email-${item._id}`} />
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Card 2: LinkedIn DM */}
                                            <ResultCard title="LinkedIn DM" content={item.linkedInDM} type={`hist-li-${item._id}`} />
                                            
                                            {/* Card 3: Follow-up Email */}
                                            <ResultCard title="Follow-up Email" content={item.followUpEmail || 'No follow-up generated.'} type={`hist-fu-${item._id}`} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default History;