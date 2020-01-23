import { Game } from "../src/interfaces/game";
import { ITags } from "../src/types/tags";

type TagMap = Game["labelingStrategy"]["tagMap"];

export const getGameWithTags = (game: Game): Game => {
  const result: ITags = {};
  const tags = game.labelingStrategy.tagMap;

  if (!tags) {
    return game;
  }

  Object.keys(tags).map((tag, index) => {
    result[index] = {
      categoryCode: tag,
      categoryValue: tags[tag]
    };
  });

  return { ...game, tags: result };
};

export const getGameWithoutTags = (game: Game): Game => {
  const { tags, ...gameWithoutTags } = game;

  if (!tags) {
    return gameWithoutTags;
  }

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
