export namespace FSClientNamespace {
    export interface IFSClient {
        basePath: string;
        createFile(filePath: string, data: string): Promise<number>;
        updateFile(filePath: string, data: string): Promise<number>;
        readFile(filePath: string): Promise<string>;
    }
}
