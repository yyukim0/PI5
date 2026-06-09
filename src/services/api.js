const BASE_URL = "https://pi5-api-production.up.railway.app/api/v1";
let currentToken = "_WHSKy9hZjru9MsJ3UIV21lFJXoFBQZPTXXc7y0a_x8";

// Função que pega o token atualizado toda vez que for chamada
const getHeaders = () => ({
    "accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${currentToken}`
});

export const api = {
    // Função para trocar de jogador!
    setToken: (newToken) => {
        currentToken = newToken;
    },

    get: async (endpoint) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "GET",
            headers: getHeaders(), // Usa os cabeçalhos atualizados
        });
        if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
        return response.json();
    },

    post: async (endpoint, payload) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            headers: getHeaders(), // Usa os cabeçalhos atualizados
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData;
        }

        const text = await response.text();
        return text ? JSON.parse(text) : {};
    }
};