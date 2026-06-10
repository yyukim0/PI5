import { Link } from "react-router-dom";
import { FeatureCard } from "../components/FeatureCard";
import { TeamMember } from "../components/TeamMember";

export function HomePage() {
    return (
        <div>
            {/* Seção Hero */}
            <div className="hero-section">
                <h1 className="hero-title">PI5: Inteligência Artificial</h1>
                <p className="hero-subtitle">
                    Batalha de algoritmos em um tabuleiro estratégico autônomo.
                </p>
            </div>

            {/* Cards de Funcionalidades
            <div className="features-container">
                <FeatureCard
                    icon="🌐"
                    title="A API Web"
                    description="Integração de backend que recebe e valida as jogadas do tabuleiro em tempo real."
                    typeClass="card-api"
                />
                <FeatureCard
                    icon="🧠"
                    title="IA Heurística"
                    description="Decisões autônomas tomadas por algoritmos baseados em pontuação e bloqueios estratégicos."
                    typeClass="card-ia"
                />
                <FeatureCard
                    icon="⚛️"
                    title="O Tabuleiro React"
                    description="Interface frontend dinâmica que renderiza os níveis, os professores e o histórico de turnos."
                    typeClass="card-react"
                />
            </div> */}

            {/* Seção da Equipe
            <section className="team-section">
                <h2>Equipe de Desenvolvimento</h2>

                <div className="team-grid">
                    <TeamMember name="Danilo Hideo Yamamoto"/>
                    <TeamMember name="Kauê de Sousa Ibiapino"/>
                </div>

                <div className="team-grid advisor-grid">
                    <TeamMember
                        name="Prof. Guilherme Rey"
                        linkedinUrl="https://www.linkedin.com/in/guirey/"
                        isAdvisor={true}
                    />
                </div>
            </section> */}

            {/* Chamada para Ação - Empilhada Verticalmente */}
            <div className="cta-container" style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", marginTop: "30px" }}>
                <Link to="/watch" className="cta-button">
                    Assistir
                </Link>

                {/* Botão com a classe btn-danger */}
                <Link to="/battle" className="cta-button btn-danger">
                    Batalhar
                </Link>
            </div>
        </div>
    );
}