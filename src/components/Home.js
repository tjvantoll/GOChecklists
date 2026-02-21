import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BookOpen, Sparkles, Clover, Puzzle, Zap } from "lucide-react";

import Header from "./Header";

const HomeContainer = styled.div`
  min-height: 100vh;
  padding: 0;
  margin: 0;
`;

const Content = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const NavigationGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 20px;
`;

const NavigationCard = styled(Link)`
  display: block;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 24px;
  text-decoration: none;
  color: #333;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    border-color: rgba(59, 130, 246, 0.3);
  }

  &:active {
    background: rgba(248, 250, 252, 1);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  color: white;
  flex-shrink: 0;
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
  color: #2d3748;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #718096;
  margin: 0;
  line-height: 1.5;
`;

function Home() {
  React.useEffect(() => {
    document.title = "GOChecklists: Up-to-date checklists for Pokémon GO";
  }, []);

  const navigationItems = [
    {
      path: "/dex",
      title: "Dex",
      description: "Track your main Pokédex completion in Pokémon GO",
      icon: BookOpen,
    },
    {
      path: "/shiny",
      title: "ShinyDex",
      description: "Track which of the available shinies you've caught",
      icon: Sparkles,
    },
    {
      path: "/lucky",
      title: "LuckyDex",
      description: "Track how many lucky Pokémon you've acquired",
      icon: Clover,
    },
    {
      path: "/unown",
      title: "UnownDex",
      description: "Track how many Unown you own",
      icon: Puzzle,
    },
    {
      path: "/shadow",
      title: "ShadowDex",
      description: "Track how many shadow Pokémon you have",
      icon: Zap,
    },
  ];

  return (
    <HomeContainer>
      <Header title="GO Checklists" />

      <Content>
        <NavigationGrid>
          {navigationItems.map((item, index) => (
            <NavigationCard key={index} to={item.path}>
              <CardHeader>
                <CardIcon><item.icon size={24} /></CardIcon>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardDescription>{item.description}</CardDescription>
            </NavigationCard>
          ))}
        </NavigationGrid>
      </Content>
    </HomeContainer>
  );
}

export default Home;
