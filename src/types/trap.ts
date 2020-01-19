export type Trap = {
    id: string;
    record: {
        id: number;
        datasetId: string;
        url: string;
        selectedTags: string[];
        description: string;
    }
}
