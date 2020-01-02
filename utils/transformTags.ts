import { Game, GameWithTags } from "../src/interfaces/game";
import { ITags } from "../src/types/tags";

type TagMap = Game["labelingStrategy"]["tagMap"];

export const tagsToArray = (tags: TagMap): ITags => {
  const result: ITags = {};

  Object.keys(tags).map((tag, index) => {
    result[index] = {
      categoryCode: tag,
      categoryValue: tags[tag]
    };
  });

  return result;
};

export const getGameWithTags = (game: Game): GameWithTags => {
  const result: ITags = {};
  const tags = game.labelingStrategy.tagMap;

  Object.keys(tags).map((tag, index) => {
    result[index] = {
      categoryCode: tag,
      categoryValue: tags[tag]
    };
  });

  return { ...game, tags: result };
};

export const getGameWithoutTags = (game: GameWithTags): Game => {
  const { tags, ...gameWithoutTags } = game;
  const result: TagMap = {};

  Object.keys(tags).map(tag => {
    const { categoryCode, categoryValue } = tags[tag];
    if (categoryCode && categoryValue) {
      result[categoryCode] = categoryValue;
    }
  });

  gameWithoutTags.labelingStrategy = { ...gameWithoutTags.labelingStrategy, tagMap: result };

  return gameWithoutTags;
};
