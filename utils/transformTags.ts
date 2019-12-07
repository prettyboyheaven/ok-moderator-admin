import { Game } from "../src/interfaces/game";
import { ITags } from "../src/types/tags";

export const tagsToArray = (tags: Game["labelingStrategy"]["tagMap"]): ITags => {
  const result: ITags = {};

  Object.keys(tags).map((tag, index) => {
    result[index] = {
      categoryCode: tag,
      categoryValue: tags[tag]
    };
  });

  return result;
};

export const tagsFromArray = (tagsArray: ITags[]) => {
  return tagsArray.reduce((result: Record<string, string>, { categoryCode, categoryValue }) => {
    result[categoryCode] = categoryValue;
    return result;
  }, {});
};
