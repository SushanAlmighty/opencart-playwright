import fs from 'fs';
import { parse } from 'csv-parse/sync';

export class DataProvider
{
    static getTestDataFromJson(filePath: string): any
    {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }

    static getTestDataFromCsv(filePath: string): any
    {
        return parse(fs.readFileSync(filePath, 'utf-8'), {columns:true, skip_empty_lines: true});
    }
}