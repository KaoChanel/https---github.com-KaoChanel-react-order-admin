// To parse this data:
//
//   import { Convert } from "./file";
//
//   const orderView = Convert.toOrderView(json);

import { isStringLiteral } from "typescript";
import { string } from "yup";


export interface OrderView {
    rowKey:            number;
    soid:              number;
    promoHeaderId:     number;
    custId:            number;
    custName:          string;
    empId:             number;
    empName:           string;
    docuNo?:           string;
    docuDate?:         Date;
    shipDate?:         Date;
    shipToAddr1?:      string;
    shipToAddr2?:      string;
    province?:         string;
    remarkHeader?:     string;
    isTransfer?:       string;
    createTime?:       Date;
    approveTime?:      Date;

    custPodate?:       Date | null;
    custPono?:         string;
    refNo?:            string;
    sumGoodAmnt?:      number;
    baseDiscAmnt?:     number;
    billDiscFormula?:  null;
    billDiscAmnt?:     number;
    billAftrDiscAmnt?: number;
    totaExcludeAmnt?:  number;
    totaBaseAmnt?:     number;
    vatamnt?:          number;
    netAmnt?:          number;
    attachment?:       string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toOrderView(json: string): OrderView[] {
        return JSON.parse(json);
    }

    public static orderViewToJson(value: OrderView[]): string {
        return JSON.stringify(value);
    }
}
