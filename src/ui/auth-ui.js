export const AuthUI = {
    render: (isLoginMode = true) => `
    <div class="min-h-screen flex items-center justify-center p-6 animate-in">
        <div class="w-full max-w-[400px] bg-white rounded-[40px] p-10 shadow-2xl shadow-green-900/5 border border-white">
            <div class="text-center mb-10">
                <div class="w-20 h-20 bg-gradient-to-tr from-[#2ecc71] to-[#3498db] rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-green-200">
                    <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                </div>
                <h1 class="text-3xl font-black mt-6 tracking-tight text-slate-800">Zéus</h1>
                <p class="text-slate-400 font-medium">${isLoginMode ? 'Ravi de vous revoir' : 'Rejoignez l\'aventure'}</p>
            </div>

            <div class="space-y-5">
                <div class="space-y-1">
                    <label class="text-[10px] font-bold text-slate-400 ml-2 uppercase tracking-widest">Email</label>
                    <input id="email" type="email" placeholder="insérer votre adresse mail" class="w-full p-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-[#2ecc71] outline-none transition-all">
                </div>
                <div class="space-y-1">
                    <label class="text-[10px] font-bold text-slate-400 ml-2 uppercase tracking-widest">Mot de passe</label>
                    <input id="password" type="password" placeholder="••••••••" class="w-full p-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-[#2ecc71] outline-none transition-all">
                </div>
                
                <button id="btn-auth-submit" class="w-full p-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 active:scale-95 transition-all shadow-xl shadow-slate-200">
                    ${isLoginMode ? 'Se connecter' : 'Créer mon compte'}
                </button>

                <div class="text-center mt-6">
                    <button id="btn-toggle-mode" class="text-xs font-bold text-[#2ecc71] hover:underline">
                        ${isLoginMode ? "Pas de compte ? Inscrivez-vous" : "Déjà inscrit ? Connectez-vous"}
                    </button>
                </div>

                <p id="auth-status" class="text-center text-xs font-bold mt-4"></p>
            </div>
        </div>
    </div>
    `
};