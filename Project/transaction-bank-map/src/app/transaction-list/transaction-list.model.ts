import { GisMap } from "../gis-map/gis-map.model";

export interface TransactionInfo {
  maintainCode: string,
  maintainName: string,
  description: string,
  cost: number,
  latestUpdate: string,
  createdDate: string,
  createdBy: string,
  updatedDate: string,
  updatedBy: string,
  status: GisMap.Status,
}
