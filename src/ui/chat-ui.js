export const ChatUI = {
    render: (profile) => `
    <div class="flex flex-col h-screen bg-white animate-in">
        <header class="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-10">
            <div class="flex items-center gap-4">
                <button id="chat-back" class="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <svg class="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div>
                    <h2 class="font-black text-slate-800 text-lg italic tracking-tight">Salon Global</h2>
                    <div class="flex items-center gap-1.5">
                        <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <p class="text-[10px] font-bold text-green-600 uppercase tracking-widest">Zéus Cloud</p>
                    </div>
                </div>
            </div>
        </header>

        <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAFB]"></div>

        <div id="reply-preview" class="hidden px-4 py-2 bg-slate-50 border-t flex items-center justify-between">
            <div class="border-l-4 border-[#2ecc71] pl-3 overflow-hidden">
                <p id="reply-user" class="text-[10px] font-black text-[#2ecc71] uppercase"></p>
                <p id="reply-text" class="text-xs text-slate-500 truncate"></p>
            </div>
            <button id="cancel-reply" class="p-1 text-slate-400 hover:text-red-500 transition-colors">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>

        <div class="p-4 bg-white border-t pb-8">
            <div class="flex items-center gap-2 bg-slate-100 p-2 rounded-[24px] focus-within:ring-2 focus-within:ring-[#2ecc71] transition-all">
                <input type="file" id="file-input" accept="image/*,video/*" class="hidden">
                <button id="btn-media" class="p-2 text-slate-400 hover:text-[#2ecc71] transition-colors">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                </button>
                <input id="chat-input" type="text" placeholder="Écrire..." class="flex-1 bg-transparent border-none outline-none p-2 text-sm">
                <button id="chat-send" class="bg-[#2ecc71] text-white p-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-green-200">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
            </div>
        </div>
    </div>`
};