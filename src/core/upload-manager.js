export const UploadManager = {
    upload: async (file) => {
        const isImage = file.type.startsWith('image');
        
        // --- REMPLACE CES INFOS PAR LES TIENNES ---
        const SB_URL = "https://kjkkkefivlnydpfedqpl.supabase.co"; 
        const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtqa2trZWZpdmxueWRwZmVkcXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0NDc3MjcsImV4cCI6MjA5MzAyMzcyN30.E-GyV1R0yeJrrV1TR25XcG_Rwc8TVnNfkrQIjO41kJ4";
        const BUCKET = "video";
        // ------------------------------------------
        if (isImage) {
            const apiKey = "fe2773f432aff739fec638aaf51d023c";
            const formData = new FormData();
            formData.append("image", file);
            try {
                const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, { method: "POST", body: formData });
                const data = await res.json();
                return { url: data.data.url, type: 'image' };
            } catch (e) { return null; }
        } else {
            // ENVOI VIDÉO VERS SUPABASE
            const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
            // IMPORTANT : L'URL pour le POST ne doit pas contenir "public/"
            const uploadUrl = `${SB_URL}/storage/v1/object/${BUCKET}/${fileName}`;

            try {
                const response = await fetch(uploadUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${SB_KEY}`,
                        'apikey': SB_KEY,
                        // On laisse le navigateur gérer le Content-Type pour éviter les erreurs 400
                    },
                    body: file // On envoie le fichier directement, pas dans un FormData
                });

                if (response.ok) {
                    // L'URL de lecture, elle, contient "public/"
                    const publicUrl = `${SB_URL}/storage/v1/object/public/${BUCKET}/${fileName}`;
                    return { url: publicUrl, type: 'video' };
                } else {
                    const errorData = await response.json();
                    console.error("Détails de l'erreur Supabase:", errorData);
                    return null;
                }
            } catch (error) {
                console.error("Erreur réseau:", error);
                return null;
            }
        }
    }
};