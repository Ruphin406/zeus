export const StateManager = {
    // Génère un nom comme "Panthère-A482"
    generateAnonymousName: (uid) => {
        // On prend les 4 derniers caractères de l'UID pour plus de variété
        const shortId = uid.substring(uid.length - 2).toUpperCase();
        return `Panthère-${shortId}`;
    },

    getCurrentProfile: (user) => {
        return {
            email: user.email,
            uid: user.uid,
            alias: StateManager.generateAnonymousName(user.uid)
        };
    }
};