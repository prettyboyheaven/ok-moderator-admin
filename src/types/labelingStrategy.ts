export interface LabelingStrategy {
    type: string;
    tagMap: {
        [key: string]: string;
    }
}
