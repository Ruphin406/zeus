export const DashUI = {
    render: (profile) => `
    <div class="flex flex-col h-screen bg-[#F8FAFB] animate-in">
      
        <header class="p-6 bg-white border-b shadow-sm flex justify-between items-center">
        <div>
        <h1 class="text-2xl font-black text-slate-800 italic">Zéus <span class="text-[#2ecc71]"></span></h1>
        <p class="text-xs text-slate-400 font-bold uppercase tracking-widest">Tableau de Bord</p>
    </div>
    <button id="btn-logout" class="p-2 text-slate-400 hover:text-red-500 transition-colors">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
    </button>
    </header>

        <main class="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
            <!-- CARTE 1 : AGENT ZÉUS -->
            <button id="go-ai-chat" class="w-full bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:scale-[1.01] transition-all">
                <div class="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg class="w-8 h-8 text-[#2ecc71]" fill="none" viewBox="0 0 24 24" stroke="currentColor font-bold"><path stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div class="text-left">
                    <h3 class="font-black text-slate-800">Tuteur Zéus</h3>
                    <p class="text-[10px] text-green-600 font-bold uppercase">Questions de cours privées</p>
                </div>
            </button>

            <!-- CARTE 2 : EXERCICES IA -->
            <button id="go-quiz" class="w-full bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:scale-[1.01] transition-all">
                <div class="w-14 h-14 bg-[#2ecc71] rounded-2xl flex items-center justify-center shadow-lg">
                    <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                </div>
                <div class="text-left">
                    <h3 class="font-black text-slate-800">Exercices IA</h3>
                    <p class="text-[10px] text-slate-400 font-bold uppercase">L'IA vous interroge</p>
                </div>
            </button>

            <!-- CARTE 3 : SALON GLOBAL -->
            <button id="go-chat" class="w-full bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:scale-[1.01] transition-all">
                <div class="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.8-.553L3 21l1.457-5.459C3.582 14.115 3 12.121 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>
                <div class="text-left">
                    <h3 class="font-black text-slate-800">Salon Global</h3>
                    <p class="text-[10px] text-slate-400 font-bold uppercase">Entraide étudiante</p>
                </div>
            </button>
        </main>
    </div>`
};