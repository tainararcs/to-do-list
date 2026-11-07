export function getLocation(): Promise<string> {
    return new Promise((resolve) => {
        if (!navigator.geolocation)  {
            console.error("Geolocation não é suportada pelo navegador");
            return resolve("--");
        }
    
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude: number = position.coords.latitude;
                const longitude: number = position.coords.longitude;
                return resolve(`${latitude}-${longitude}`);
            },
            (error) => {
                console.error("Erro ao obter localização:", error);
                return resolve("--");
            }
        );
    });
}

export async function copyText(text: string): Promise<string> {
    try {
        await navigator.clipboard.writeText(text);
        return "Copiado para o clipboard!";
    } catch (error) {
        console.error(error);
        return "Erro ao copiar para o clipboard";
    }
}

export async function shareText(text: string): Promise<string> {
    try {
        await navigator.share({text});
        return "Compartilhando...";

    } catch (error) {
        console.error(error);
        return "Erro ao compartilhar";
    }
}