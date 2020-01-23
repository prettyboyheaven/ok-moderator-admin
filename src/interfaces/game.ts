import { ITags } from "../types/tags";
import { LabelingStrategy } from "../types/labelingStrategy";

export interface Game {
  coverPhotoUrl: string;
  name: string;
  taskDescription: string;
  priority: string;
  id: string;
  labelingStrategy: LabelingStrategy;
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
  streaming: boolean;
  checkExternalImageAvailability: boolean;
  checkPrivacyEnabled: boolean;
  trainingEnabled: boolean;
  amountOfTrainTasks: number;
  percentToPass: number;
  multiSelectEnabled: boolean;
  createdMillis: string;
  lastUpdatedMillis: string;
  tags?: ITags
}
