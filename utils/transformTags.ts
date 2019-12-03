import { Game } from "../src/interfaces/game";

interface ITagsAsArray {
  categoryCode: string;
  categoryValue: string;
  id: number;
}

export const tagsToArray = (tags: Game["labelingStrategy"]["tagMap"]): ITagsAsArray[] => {
  console.log(tags);
  return Object.keys(tags).map((tag, index) => ({
    categoryCode: tag,
    categoryValue: tags[tag],
    id: index
  }));
};

export const tagsFromArray = (tagsArray: ITagsAsArray[]) => {
  return tagsArray.reduce((result: Record<string, string>, { categoryCode, categoryValue }) => {
    result[categoryCode] = categoryValue;
    return result;
  }, {});
};
