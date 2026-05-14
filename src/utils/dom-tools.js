export const DOM = {
    // Permet d'injecter du HTML avec une petite animation
    render: (id, html) => {
        const el = document.getElementById(id);
        if (el) {
            el.innerHTML = html;
            el.classList.add('animate-in');
            setTimeout(() => el.classList.remove('animate-in'), 300);
        }
    },
    scrollToBottom: (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollTop = el.scrollHeight;
    }
};