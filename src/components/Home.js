import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #f8fafc;
  min-height: calc(100vh - 4rem);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const Card = styled(Link)`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-decoration: none;
  color: #333;
  transition: all 0.2s ease;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-color: #2196f3;
  }

  .icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f1f5f9;
    border-radius: 12px;
    padding: 0.75rem;
  }

  .content {
    flex: 1;
  }

  h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    color: #2196f3;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
    line-height: 1.4;
  }
`;

function Home() {
  React.useEffect(() => {
    document.title = "GOChecklists: Up-to-date checklists for Pokémon GO";
  }, []);

  const dexTypes = [
    {
      path: "/dex",
      title: "Pokédex",
      description: "Track your main Pokédex completion in Pokémon GO.",
      icon: "🌟",
    },
    {
      path: "/shiny",
      title: "ShinyDex",
      description: "Track which of the available shinies you've caught.",
      icon: "✨",
    },
    {
      path: "/lucky",
      title: "LuckyDex",
      description: "Track how many lucky Pokémon you've acquired.",
      icon: "🍀",
    },
    {
      path: "/unown",
      title: "UnownDex",
      description: "Track how many Unown you own.",
      icon: "❓",
    },
    {
      path: "/shadow",
      title: "ShadowDex",
      description: "Track how many shadow Pokémon you have.",
      icon: "👾",
    },
  ];

  return (
    <React.Fragment>
      <Header title="GO Checklists" />
      <Container>
        <Grid>
          {dexTypes.map((dex) => (
            <Card to={dex.path} key={dex.path}>
              <div className="icon">{dex.icon}</div>
              <div className="content">
                <h2>{dex.title}</h2>
                <p>{dex.description}</p>
              </div>
            </Card>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Home;
