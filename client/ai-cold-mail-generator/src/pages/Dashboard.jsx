import React, { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
import api from "../utils/api";
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";

const Dashboard = () => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [copied, setCopied] = useState('');
    
    // History states
    const [activeTab, setActiveTab] = useState('generate'); // 'generate' ya 'history'
    const [historyList, setHistoryList] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [selectedHistoryId, setSelectedHistoryId] = useState(null);

    // Fetch history from backend
    const fetchHistory = async () => {
        setHistoryLoading(true);
        try {
            const { data } = await api.get('/ai/history');
            setHistoryList(data);
        } catch (error) {
            toast.error('Failed to fetch history');
        } finally {
            setHistoryLoading(false);
        }
    };

    // Load history when tab changes
    useEffect(() => {
        if (activeTab === 'history') {
            fetchHistory();
        }
    }, [activeTab]);

    const handleGenerate = async (e) => {
        e.preventDefault();
        if(!prompt.trim()) return;

        setLoading(true);
        try {
            const {data} = await api.post('/ai/generate-email', {prompt});
            setResult(data);
            toast.success('Successfully generated');
        } catch (error) {
            toast.error('Failed to generate. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        toast.success('Copied to clipboard');
        setTimeout(() => {
            setCopied('');
        }, 2000);
    };

    const toggleHistoryCard = (id) => {
        if (selectedHistoryId === id) {
            setSelectedHistoryId(null);
        } else {
            setSelectedHistoryId(id);
        }
    };

    // ✅ SHORT-CUT METHOD: Bracket '(' use kiya hai taaki implicit return ho aur koi 'Illegal return' na aaye
    const ResultCard = ({title, content, type}) => (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-4 ">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-800">{title}</h3>
                <button 
                    onClick={() => copyToClipboard(content, type)}
                    className="text-gray-400 hover:text-primary-600 transition-colors "
                    title="Copy"
                >
                    {copied === type ? (
                        <CheckIcon className="w-5 h-5 text-green-500" />
                    ) : (
                        <ClipboardDocumentIcon className="w-5 h-5" />
                    )}
                </button>
            </div>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{content}</p>
        </div>
    );

    // ✅ MAIN RETURN STATEMENT (Ab yeh Dashboard function ke bilkul andar hai)
    return (
        <div className="max-w-7xl mx-auto flex flex-col gap-6 h-[calc(100vh-8rem)]">
            
            {/* 🔔 TOP SUB-BAR */}
            <div className="flex gap-4 border-b border-gray-200 pb-2">
                <button 
                    onClick={() => setActiveTab('generate')}
                    className={`pb-2 px-4 text-sm font-semibold transition-all ${activeTab === 'generate' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    🚀 New Campaign
                </button>
                <button 
                    onClick={() => setActiveTab('history')}
                    className={`pb-2 px-4 text-sm font-semibold transition-all ${activeTab === 'history' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    📜 History & Saved Outputs
                </button>
            </div>

            {/* 📺 MAIN CONTENT CONTAINER */}
            <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
                
                {/* CASE 1: GENERATE SCREEN */}
                {activeTab === 'generate' && (
                    <>
                        {/* Input Area */}
                        <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Create Email</h2>
                            <form onSubmit={handleGenerate} className="flex-1 flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-2">Context / Prompt</label>
                                <textarea 
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    className="flex-1 w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow resize-none "
                                    placeholder="e.g. Write a cold email to a marketing director..."
                                />
                                <button type="submit" disabled={loading || !prompt.trim()} className="mt-4 w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center disabled:opacity-50">
                                    {loading ? 'Generating...' : 'Generate Output'}
                                </button>
                            </form>
                        </div>

                        {/* Output Cards Area */}
                        <div className="w-full lg:w-2/3 flex flex-col overflow-y-auto">
                            {result ? (
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 mb-4">AI Results</h2>
                                    <ResultCard title="Subject Line" content={result.subject} type="subject" />
                                    <ResultCard title="Cold Email" content={result.emailBody} type="email" />
                                    <ResultCard title="LinkedIn DM" content={result.linkedInDM} type="linkedin" />
                                    <ResultCard title="Follow-up Email" content={result.followUpEmail} type="followup" />
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-white border border-gray-200 rounded-xl min-h-[300px]">
                                    <p className="text-sm">Submit a prompt to generate AI outputs</p>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* CASE 2: HISTORY SCREEN */}
                {activeTab === 'history' && (
                    <div className="w-full bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col h-full overflow-y-auto">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Generation History</h2>
                        
                        {historyLoading ? (
                            <p className="text-gray-500 text-sm">Loading history...</p>
                        ) : historyList.length === 0 ? (
                            <p className="text-gray-400 text-sm text-center my-10">No history found. Start generating emails!</p>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {historyList.map((item) => {
                                    const isExpanded = selectedHistoryId === item._id;
                                    return (
                                        <div key={item._id} className="border border-gray-200 rounded-xl overflow-hidden transition-all shadow-sm">
                                            
                                            <button 
                                                type="button"
                                                onClick={() => toggleHistoryCard(item._id)}
                                                className={`w-full flex justify-between items-center p-4 text-left transition-colors ${isExpanded ? 'bg-primary-50 text-primary-700' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs font-bold uppercase tracking-wider bg-gray-200 text-gray-700 px-2 py-0.5 rounded">Prompt</span>
                                                    <p className="text-sm font-semibold truncate max-w-md md:max-w-xl">"{item.prompt}"</p>
                                                </div>
                                                <span className="text-xs font-bold text-gray-400">
                                                    {isExpanded ? '🔼 CLOSE' : '🔽 VIEW DETAILS'}
                                                </span>
                                            </button>

                                            {isExpanded && (
                                                <div className="p-6 bg-white border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="md:col-span-2">
                                                        <ResultCard title={`Subject Line: ${item.subject}`} content={item.emailBody} type={`hist-email-${item._id}`} />
                                                    </div>
                                                    <div>
                                                        <ResultCard title="LinkedIn DM" content={item.linkedInDM} type={`hist-li-${item._id}`} />
                                                    </div>
                                                    <div>
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
                )}

            </div>
        </div>
    );
};

export default Dashboard;