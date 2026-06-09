import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { PlayerSelect, PLAYERS } from "../components/PlayerSelect";

export function BattlePage() {
    const navigate = useNavigate();

    const [selectedPlayerId, setSelectedPlayerId] = useState("");
    const [opponentId, setOpponentId] = useState("");
    const [gameIdToJoin, setGameIdToJoin] = useState(""); // Novo: para guardar o ID do jogo ao entrar
    const [loading, setLoading] = useState(false);

    // ==========================================
    // 1. FUNÇÃO PARA CRIAR UMA NOVA BATALHA
    // ==========================================
    async function handleChallenge(e) {
        e.preventDefault();
        setLoading(true);

        try {
            if (!selectedPlayerId) {
                alert("Erro: Selecione o seu lutador na lista primeiro!");
                setLoading(false);
                return;
            }

            const playerEncontrado = PLAYERS.find(p => String(p.id) === String(selectedPlayerId));

            if (!playerEncontrado) {
                alert("Erro: Jogador não encontrado no sistema!");
                setLoading(false);
                return;
            }

            const payload = {
                player_id: playerEncontrado.id,
                team_slot: 1,
                vs_random_bot: [21, 78].includes(parseInt(opponentId)) ? true : false,
                auto_start: true
            };

            const response = await api.post("/games", payload);
            const responseData = response.data || response;

            if (responseData && responseData.id) {
                navigate(`/watch/${responseData.id}`);
            } else {
                navigate("/watch");
            }

        } catch (err) {
            console.error("Erro ao desafiar:", err);
            let errorMessage = "Erro ao criar a batalha.";
            if (err?.detail) {
                errorMessage = typeof err.detail === "string" ? err.detail : JSON.stringify(err.detail);
            }
            alert(`Falha no combate:\n${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }

    // ==========================================
    // 2. NOVA FUNÇÃO PARA ENTRAR EM UM COMBATE
    // ==========================================
    async function handleJoinMatch(e) {
        e.preventDefault();
        setLoading(false); // Evita travar se esquecer campos
        
        if (!selectedPlayerId) {
            alert("Erro: Selecione quem vai entrar na partida (ex: torstic)!");
            return;
        }

        if (!gameIdToJoin) {
            alert("Erro: Insira o ID da partida gerada!");
            return;
        }

        const playerEncontrado = PLAYERS.find(p => String(p.id) === String(selectedPlayerId));
        if (!playerEncontrado) return;

        setLoading(true);

        try {
            const payload = {
                player_id: playerEncontrado.id,
                team_slot: 2 // Entra no Slot 2 contra o Criador
            };

            // Faz a chamada exatamente como fazíamos no Swagger para a rota de JOIN
            await api.post(`/games/${gameIdToJoin}/join`, payload);

            // Redireciona o site direto para a tela de assistir o quebra-pau
            navigate(`/watch/${gameIdToJoin}`);

        } catch (err) {
            console.error("Erro ao entrar na partida:", err);
            let errorMessage = "Erro ao entrar na partida.";
            if (err?.detail) {
                errorMessage = typeof err.detail === "string" ? err.detail : JSON.stringify(err.detail);
            }
            alert(`Falha ao entrar:\n${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", textAlign: "center" }}>
            <h1 style={{ color: "#ff4757", fontSize: "2.5rem", margin: "0 0 10px 0" }}>⚔️ Arena de Batalha</h1>
            <p className="hero-subtitle" style={{ marginBottom: "40px" }}>
                Prepare seu bot para o torneio. Selecione seu jogador acima e escolha uma das opções abaixo.
            </p>

            {/* SELETOR GLOBAL DE JOGADOR (Serve para as duas ações abaixo) */}
            <div className="battle-form-container" style={{ marginBottom: "30px", paddingBottom: "20px", borderBottom: "2px dashed #444" }}>
                <PlayerSelect
                    value={selectedPlayerId}
                    onChange={setSelectedPlayerId}
                    label="1. Quem está jogando agora?"
                />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                
                {/* FORMULÁRIO 1: CRIAR JOGO */}
                <form onSubmit={handleChallenge} className="battle-form-container" style={{ textAlign: "left" }}>
                    <h3 style={{ margin: "0 0 15px 0", color: "#fff" }}>Opção A: Criar Partida</h3>
                    <label className="player-select-label" style={{ display: "block", marginBottom: "10px", fontSize: "0.9rem" }}>
                        ID do Bot Alvo (Ex: 21):
                    </label>
                    <input
                        type="number"
                        placeholder="Deixe em branco ou use 21"
                        className="player-select-dropdown"
                        value={opponentId}
                        onChange={(e) => setOpponentId(e.target.value)}
                        style={{ width: "100%", boxSizing: "border-box", marginBottom: "20px" }}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="cta-button btn-danger"
                        style={{ width: "100%", padding: "12px", fontSize: "0.9rem" }}
                    >
                        {loading ? "PROCESSANDO..." : "CRIAR NOVA SALA"}
                    </button>
                </form>

                {/* FORMULÁRIO 2: ENTRAR EM JOGO EXISTENTE */}
                <form onSubmit={handleJoinMatch} className="battle-form-container" style={{ textAlign: "left" }}>
                    <h3 style={{ margin: "0 0 15px 0", color: "#fff" }}>Opção B: Entrar em Sala</h3>
                    <label className="player-select-label" style={{ display: "block", marginBottom: "10px", fontSize: "0.9rem" }}>
                        ID do Jogo (UUID da sala):
                    </label>
                    <input
                        type="text"
                        placeholder="Cole o ID da partida aqui"
                        className="player-select-dropdown"
                        value={gameIdToJoin}
                        onChange={(e) => setGameIdToJoin(e.target.value)}
                        style={{ width: "100%", boxSizing: "border-box", marginBottom: "20px", fontSize: "0.8rem" }}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="cta-button"
                        style={{ width: "100%", padding: "12px", backgroundColor: "#2ed573", color: "#fff", fontSize: "0.9rem" }}
                    >
                        {loading ? "PROCESSANDO..." : "ENTRAR NA PARTIDA"}
                    </button>
                </form>

            </div>
        </div>
    );
}