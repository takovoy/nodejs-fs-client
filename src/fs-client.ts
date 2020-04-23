import {FSClientNamespace as Models} from "./fs-client.namespace";
const fs = require("fs");

export class FSClient implements Models.IFSClient {
    constructor(public basePath: string) {}

    private _openFile(
        filePath: string,
        flags: string | number,
    ): Promise<number> {
        return new Promise((resolve, reject) => fs.open(
            this.basePath + filePath.replace(/^\/+/, ""),
            flags,
            (openError: NodeJS.ErrnoException | null, fileDescriptor: number) => {
                if (openError || !fileDescriptor) {
                    reject(openError);
                    return;
                }
                resolve(fileDescriptor);
            }
        ));
    }

    private _writeFile(
        fileDescriptor: number,
        data: string,
    ): Promise<number> {
        return new Promise((resolve, reject) => fs.writeFile(fileDescriptor, data, writeError => {
            if (writeError) {
                reject(writeError);
                return;
            }
            resolve(fileDescriptor);
        }));
    }

    private _closeFile(fileDescriptor: number): Promise<number> {
        return new Promise((resolve, reject) => fs.close(fileDescriptor, closeError => {
            if (closeError) {
                reject(closeError);
                return;
            }
            resolve(fileDescriptor);
        }));
    }

    public createFile(
        filePath: string,
        data: string
    ): Promise<number> {
        return this._openFile(filePath, "wx")
            .then(fileDescriptor => this._writeFile(<number>fileDescriptor, data))
            .then(fileDescriptor => this._closeFile(<number>fileDescriptor));
    }

    public updateFile(
        filePath: string,
        data: string
    ): Promise<number> {
        return this._openFile(filePath, "r+")
            .then(fileDescriptor => this._writeFile(<number>fileDescriptor, data))
            .then(fileDescriptor => this._closeFile(<number>fileDescriptor));
    }

    public readFile(filePath: string): Promise<string> {
        return new Promise((resolve,  reject) => fs.readFile(
            this.basePath + filePath.replace(/^\/+/, ""),
            "utf8",
            (readError: NodeJS.ErrnoException, data: string) => {
                if (readError) {
                    reject(readError);
                    return;
                }
                resolve(data);
            }
        ));
    }
}
