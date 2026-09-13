import React from 'react';
import { StarbucksBaristaShop } from './StarbucksBaristaShop';

interface StarbucksMasteryProps {
  onAddXp: (amount: number, reason: string) => void;
}

export const StarbucksMastery: React.FC<StarbucksMasteryProps> = ({ onAddXp }) => {
  return <StarbucksBaristaShop onAddXp={onAddXp} />;
};
