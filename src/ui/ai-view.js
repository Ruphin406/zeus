import { AIService } from '../core/ai-service.js';

export const AIView = {
    init: (profile, onBack) => {
        const root = document.getElementById('app') || document.getElementById('app-root');
        
        root.innerHTML = `
            <div class="flex flex-col h-screen bg-slate-50 font-sans">
                <div class="p-4 bg-white border-b flex items-center gap-3 shadow-sm">
                    <button id="ai-back" class="p-2 hover:bg-slate-100 rounded-full transition-colors">←</button>
                    <div>
                        <h2 class="font-bold text-slate-800 text-sm">Tuteur IA Personnel</h2>
                        <p class="text-[10px] text-green-500 font-medium">En ligne</p>
                    </div>
                </div>
                <div id="ai-messages" class="flex-1 overflow-y-auto p-4 space-y-4"></div>
                <div class="p-4 bg-white border-t flex gap-2">
                    <input id="ai-input" type="text" placeholder="Posez votre question..." 
                           class="flex-1 p-3 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50">
                    <button id="ai-send" class="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-2xl transition-all font-bold text-sm">Envoyer</button>
                </div>
            </div>
        `;

        const msgContainer = document.getElementById('ai-messages');
        const input = document.getElementById('ai-input');

        const unsubscribe = AIService.listenMyMessages(profile.uid, (messages) => {
            // Rendu chirurgical des messages avec alias et bulles stylisées
            msgContainer.innerHTML = messages.map(msg => {
                const isUser = msg.role === 'user';
                return `
                    <div class="flex flex-col ${isUser ? 'items-end' : 'items-start'} mb-2">
                        <span class="text-[9px] text-slate-400 px-2 mb-1 uppercase font-bold">${msg.alias}</span>
                        <div class="${isUser 
                            ? 'bg-blue-600 text-white rounded-l-2xl rounded-tr-2xl shadow-blue-100' 
                            : 'bg-white border border-slate-200 text-slate-800 rounded-r-2xl rounded-tl-2xl shadow-sm'} 
                            p-3 max-w-[85%] text-sm shadow-md">
                            ${msg.content}
                        </div>
                    </div>
                `;
            }).join('');
            msgContainer.scrollTop = msgContainer.scrollHeight;
        });

        const handleSend = () => {
            const text = input.value.trim();
            if (text) {
                AIService.sendMessage(profile.uid, profile.alias, text);
                input.value = "";
            }
        };

        document.getElementById('ai-send').onclick = handleSend;
        input.onkeypress = (e) => { if(e.key === 'Enter') handleSend(); };
        document.getElementById('ai-back').onclick = () => { unsubscribe(); onBack(); };
    }
};