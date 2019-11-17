export interface Game {
  coverPhotoUrl: string;
  name: string;
  taskDescription: string;
  priority: string;
  id: string;
  labelingStrategy: {
    type?: string;
  };
  totalRecords: string;
  processedRecords: string;
  state: string;
  playerIds: string[];
  premiumTag: number;
  premiumAltTag: number;
  penaltyTag: number;
  quorumPercent: number;
  penaltyAltTag: number;
  minimalNumVotes: number;
}
