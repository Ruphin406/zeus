import { ChatService } from '../core/chat-service.js';
import { ChatUI } from './chat-ui.js';
import { UploadManager } from '../core/upload-manager.js'; // Import crucial pour l'upload

export const ChatView = {
    replyTo: null, 

    init: (profile, onBack) => {
        const root = document.getElementById('app') || document.getElementById('app-root');
        root.innerHTML = ChatUI.render(profile);

        const msgContainer = document.getElementById('chat-messages');
        const input = document.getElementById('chat-input');
        const btnSend = document.getElementById('chat-send');
        const replyPreview = document.getElementById('reply-preview');
        const replyUser = document.getElementById('reply-user');
        const replyText = document.getElementById('reply-text');
        const cancelReply = document.getElementById('cancel-reply');
        
        // Sélecteurs pour les médias
        const btnMedia = document.getElementById('btn-media');
        const fileInput = document.getElementById('file-input');

        const unsubscribe = ChatService.listenMessages((messages) => {
            ChatView.renderMessages(messages, profile.alias, msgContainer);
        });

        // Activation du mode réponse[cite: 21]
        window.setReply = (alias, text) => {
            ChatView.replyTo = { alias, text };
            replyUser.innerText = alias;
            replyText.innerText = text;
            replyPreview.classList.remove('hidden');
            input.focus();
        };

        // Annulation de la réponse[cite: 21]
        cancelReply.onclick = () => {
            ChatView.replyTo = null;
            replyPreview.classList.add('hidden');
        };

        // Gestion de l'envoi des messages texte[cite: 21]
        const handleSend = async () => {
            const val = input.value.trim();
            if (val) {
                await ChatService.sendMessage(profile.alias, val, "text", ChatView.replyTo);
                input.value = "";
                cancelReply.onclick(); 
            }
        };

        // --- GESTION DES MÉDIAS (PRÉCISION CHIRURGICALE) ---
        
        // Déclenche le sélecteur de fichier au clic sur le bouton "+"
        btnMedia.onclick = () => fileInput.click();

        // Traitement automatique après sélection du fichier
        fileInput.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                // Upload vers le service de stockage
                const res = await UploadManager.upload(file); 
                if (res) {
                    // Envoi immédiat du lien avec le type (image/video)
                    await ChatService.sendMessage(profile.alias, res.url, res.type, ChatView.replyTo);
                    if (ChatView.replyTo) cancelReply.onclick();
                }
                fileInput.value = ""; // Reset pour permettre une nouvelle sélection
            }
        };

        // Listeners standard
        btnSend.onclick = handleSend;
        input.onkeypress = (e) => { if(e.key === 'Enter') handleSend(); };
        document.getElementById('chat-back').onclick = () => { unsubscribe(); onBack(); };
    },

    renderMessages: (messages, myAlias, container) => {
        if (!container) return;
        container.innerHTML = messages.map(msg => {
            const isMe = msg.alias === myAlias;
            
            // Texte de prévisualisation sécurisé pour le système de réponse[cite: 21]
            let previewForReply = msg.content;
            if (msg.type === "image") previewForReply = "📷 Image";
            if (msg.type === "video") previewForReply = "🎥 Vidéo";

            // Rendu dynamique selon le type de message[cite: 21]
            let contentHTML = `<p class="text-sm">${msg.content}</p>`;
            if (msg.type === "image") {
                contentHTML = `<img src="${msg.content}" class="rounded-xl max-h-40 w-full object-cover shadow-sm">`;
            } else if (msg.type === "video") {
                contentHTML = `<video src="${msg.content}" controls class="rounded-xl max-h-40 w-full shadow-sm"></video>`;
            }

            // Bloc de citation si le message est une réponse[cite: 21]
            const replyHTML = msg.replyTo ? `
                <div class="bg-slate-100/50 border-l-2 border-[#2ecc71] p-1.5 mb-2 rounded text-[10px] text-slate-500 italic">
                    <strong class="text-[#2ecc71]">@${msg.replyTo.alias}</strong>: ${msg.replyTo.text}
                </div>` : '';

            return `
                <div class="flex flex-col ${isMe ? 'items-end' : 'items-start'} mb-4 animate-in" 
                     onclick="setReply('${msg.alias}', '${previewForReply.replace(/'/g, "\\'")}')">
                    <span class="text-[10px] text-slate-400 font-black px-2 uppercase tracking-tighter">${msg.alias}</span>
                    <div class="${isMe ? 'bg-slate-900 text-white rounded-l-2xl rounded-tr-2xl' : 'bg-white border rounded-r-2xl rounded-tl-2xl'} p-3 shadow-sm max-w-[85%] cursor-pointer hover:ring-2 hover:ring-[#2ecc71]/20 transition-all">
                        ${replyHTML}
                        ${contentHTML}
                    </div>
                </div>`;
        }).join('');
        container.scrollTop = container.scrollHeight;
    }
};